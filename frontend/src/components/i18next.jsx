import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "description": "This is an example of i18n in React."
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido",
      "description": "Este es un ejemplo de i18n en React."
    }
  }
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
