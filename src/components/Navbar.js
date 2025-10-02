import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{t('app_title')}</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">{t('home_link')}</Link>
        <Link to="/about">{t('about_link')}</Link>
        <Link to="/contact">{t('contact_link')}</Link>
        <Link to="/dashboard">{t('dashboard_heading')}</Link>
        <Link to="/login" className="btn btn-primary">{t('login_heading')}</Link>
        
        {/* Language Switcher Component */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;