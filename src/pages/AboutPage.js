import React from 'react';
import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <h1>{t('about_heading')}</h1>
      
      <section className="mission">
        <h2>{t('mission_title')}</h2>
        <p>{t('mission_paragraph')}</p>
      </section>

      <section className="vision">
        <h2>{t('vision_title')}</h2>
        <p>{t('vision_paragraph')}</p>
      </section>

      <section className="team">
        <h2>{t('team_title')}</h2>
        <p>{t('team_paragraph')}</p>
        {/* You can map over team members here using translation keys */}
      </section>
    </div>
  );
}

export default AboutPage;