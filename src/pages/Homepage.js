import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function HomePage() {
  const { t } = useTranslation();

  // Array of features to map over and display
  const features = [
    { title: 'feature_1_title', desc: 'feature_1_desc' },
    { title: 'feature_2_title', desc: 'feature_2_desc' },
    { title: 'feature_3_title', desc: 'feature_3_desc' },
    { title: 'feature_4_title', desc: 'feature_4_desc' },
  ];

  // Array of steps for "How It Works"
  const steps = [
    { title: 'step_1_title', desc: 'step_1_desc' },
    { title: 'step_2_title', desc: 'step_2_desc' },
    { title: 'step_3_title', desc: 'step_3_desc' },
  ];

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>{t('hero_heading')}</h1>
        <p>{t('hero_subheading')}</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-farmer">{t('btn_join_farmer')}</Link>
          <Link to="/register" className="btn btn-restaurant">{t('btn_join_restaurant')}</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>{t('features_title')}</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{t(feature.title)}</h3>
              <p>{t(feature.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>{t('how_it_works_title')}</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <span className="step-number">{index + 1}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.desc)}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="impact">
        <h2>{t('impact_title')}</h2>
        {/* Placeholder for impact data/visuals */}
      </section>
    </div>
  );
}

export default HomePage;