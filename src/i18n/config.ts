import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './resources/bn';
import en from './resources/en';

const resources = {
  bn: { translation: bn },
  en: { translation: en }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'bn',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnEmptyString: false
  });
}

export default i18n;
