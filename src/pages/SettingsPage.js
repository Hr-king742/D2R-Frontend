import React from 'react';
import { useTranslation } from 'react-i18next';

function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="settings-container">
      <h2>{t('settings_heading')}</h2>
      
      <section className="password-settings">
        <h3>{t('password_placeholder')}</h3>
        <p>
          {/* Placeholder for change password form */}
          {t('vision_quote')} 
        </p>
        <button className="btn btn-edit">{t('save_changes_button')}</button>
      </section>

      <section className="notification-settings">
        <h3>Notifications</h3>
        {/* Placeholder for notification toggles */}
        <label>
          <input type="checkbox" defaultChecked /> Email Notifications
        </label>
      </section>
      
    </div>
  );
}

export default SettingsPage;