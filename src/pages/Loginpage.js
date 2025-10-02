import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // CRITICAL: Replace with your actual backend URL
      const res = await axios.post('YOUR_BACKEND_URL/api/auth/login', {
        email,
        password,
      });

      // Assuming API returns { token, role }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Redirect based on role (for this example, both go to /dashboard)
      navigate('/dashboard'); 

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError(t('login_failed_message'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('login_heading')}</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder={t('email_placeholder')}
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder={t('password_placeholder')}
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">{t('login_button')}</button>
      </form>
      
      <p>
        {t('register_prompt')} <Link to="/register">{t('register_link')}</Link>
      </p>
    </div>
  );
}

export default LoginPage;