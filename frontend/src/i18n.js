import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationSW from './locales/sw/translation.json';
import translationZH from './locales/zh/translation.json';



const resources = {
  ar: { translation: translationAR },
  en: { translation: translationEN },
  fr: { translation: translationFR },
  es: { translation: translationES },
  sw: { translation: translationSW },
  zh: { translation: translationZH },
};

i18n
  .use(LanguageDetector) 
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: 'ar', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
