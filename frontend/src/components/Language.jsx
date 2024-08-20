import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const Language = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
      <select onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
};

export default Language;
