import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'restaurant', // Default role
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Use a key like t('password_mismatch_error')
      return;
    }

    try {
      // CRITICAL: Replace with your actual backend URL
      const res = await axios.post('YOUR_BACKEND_URL/api/auth/register', {
        name,
        email,
        password,
        role,
      });

      setSuccess(t('registration_success_message'));
      // Wait a moment and then navigate to login
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(t('registration_failed_message'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('register_heading')}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={onSubmit}>
        {/* Full Name */}
        <input
          type="text"
          placeholder={t('name_placeholder')}
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        {/* Email */}
        <input
          type="email"
          placeholder={t('email_placeholder')}
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        {/* Password */}
        <input
          type="password"
          placeholder={t('password_placeholder')}
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        {/* Confirm Password */}
        <input
          type="password"
          placeholder={t('confirm_password_placeholder')}
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          required
        />
        {/* Role Selection */}
        <div className="role-selector">
          <label>{t('role_label')}:</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="restaurant">{t('role_restaurant')}</option>
            <option value="farmer">{t('role_farmer')}</option>
          </select>
        </div>
        
        <button type="submit">{t('register_button')}</button>
      </form>
      
      <p>
        {t('already_have_account_link_prompt')} 
        <Link to="/login">{t('login_heading')}</Link>
      </p>
    </div>
  );
}

export default RegisterPage;