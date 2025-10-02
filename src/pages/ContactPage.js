import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API
    console.log('Form Submitted:', formData); 
    alert(t('contact_form_success')); // Use translation key for feedback
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1>{t('contact_heading')}</h1>
      
      <p>{t('contact_intro')}</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder={t('name_placeholder')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('email_placeholder')}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder={t('message_placeholder')}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-submit">
          {t('send_message_button')}
        </button>
      </form>

      <section className="contact-info">
        <h3>{t('contact_details_heading')}</h3>
        <p>Email: support@d2r.com</p>
        <p>Phone: {t('contact_phone_number')}</p>
      </section>
    </div>
  );
}

export default ContactPage;