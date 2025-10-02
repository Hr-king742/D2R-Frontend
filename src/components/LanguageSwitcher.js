import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('hi')}
        className={i18n.language === 'hi' ? 'active' : ''}
      >
        HI
      </button>
      <button 
        onClick={() => changeLanguage('te')}
        className={i18n.language === 'te' ? 'active' : ''}
      >
        TE
      </button>
    </div>
  );
}

export default LanguageSwitcher;