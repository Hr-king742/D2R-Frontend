import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Loads translations from the server (static public folder)
  .use(HttpBackend)
  // Detects the user's language preference (e.g., from browser or localStorage)
  .use(LanguageDetector)
  // Connects i18next to React components
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false, // Set to true for debugging
    
    // Configuration for backend loader
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Configuration for detection
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Set default namespace to 'translation'
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;