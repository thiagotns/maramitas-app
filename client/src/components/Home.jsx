import React from "react";
import { useTranslation } from 'react-i18next';

function Home() {

  const { t } = useTranslation();
  const lng = navigator.language || navigator.userLanguage;

  return (
    <div>
      <h1>Home Page</h1>
      <p>{t('hello')}</p>
      <p>Language: { lng }</p>
    </div>
  );
}

export default Home;