import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function ProfilePage() {
  const { t } = useTranslation();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // State to hold data for editing
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(t('no_profile_data'));
        setLoading(false);
        return;
      }

      try {
        // NOTE: You need to create a GET /api/auth/me route in your backend
        // to return the logged-in user's data based on the JWT token.
        const res = await axios.get('YOUR_BACKEND_URL/api/auth/me', {
          headers: {
            'x-auth-token': token,
          },
        });
        setProfileData(res.data);
        setEditFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(t('fetch_profile_failed_message'));
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [t]);

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
        // NOTE: You need to create a PUT /api/auth/me route in your backend
        await axios.put('YOUR_BACKEND_URL/api/auth/me', editFormData, {
            headers: { 'x-auth-token': token },
        });
        setProfileData(editFormData);
        setIsEditing(false);
        alert("Profile updated successfully!"); // Use a translation key here
    } catch (err) {
        console.error(err);
        setError("Failed to update profile."); // Use a translation key here
    }
  };

  if (loading) return <div className="loading-message">{t('loading_profile')}</div>;
  if (error || !profileData) return <div className="error-message">{t('error_message')}: {error || t('no_profile_data')}</div>;

  return (
    <div className="profile-container">
      <h2>{t('profile_heading')}</h2>
      
      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <label>{t('name_placeholder')}:</label>
          <input
            type="text"
            name="name"
            value={editFormData.name || ''}
            onChange={handleEditChange}
            required
          />
          <label>{t('contact_email_label')}:</label>
          <input
            type="email"
            name="email"
            value={editFormData.email || ''}
            onChange={handleEditChange}
            disabled // Email is often not editable
          />
          <label>{t('role_label')}:</label>
          <input
            type="text"
            name="role"
            value={t(`role_${editFormData.role}`)}
            disabled
          />

          <button type="submit" className="btn btn-save">{t('save_changes_button')}</button>
          <button type="button" onClick={() => setIsEditing(false)} className="btn btn-cancel">
            {t('cancel_button')}
          </button>
        </form>
      ) : (
        <div className="profile-display">
          <p><strong>{t('name_placeholder')}:</strong> {profileData.name}</p>
          <p><strong>{t('contact_email_label')}:</strong> {profileData.email}</p>
          <p><strong>{t('role_label')}:</strong> {t(`role_${profileData.role}`)}</p>
          {/* Add more profile fields here (e.g., location, phone) */}
          
          <button onClick={() => setIsEditing(true)} className="btn btn-edit">
            {t('edit_profile_button')}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;