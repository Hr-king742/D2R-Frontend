import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function RestaurantDashboard() {
  const { t } = useTranslation();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      // In a real app, you would add the JWT token to headers for auth
      try {
        // CRITICAL: Replace with your actual backend URL
        const res = await axios.get('YOUR_BACKEND_URL/api/inventory/listings');
        setListings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(t('fetch_listings_failed_message'));
        setLoading(false);
      }
    };
    
    fetchListings();
  }, [t]);

  if (loading) return <div>{t('loading_message')}</div>;
  if (error) return <div>{t('error_message')}: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>{t('restaurant_dashboard_heading')}</h1>
      <h2>{t('surplus_feed_heading')}</h2>

      {listings.length === 0 ? (
        <p>{t('no_surplus_available')}</p>
      ) : (
        <div className="listings-grid">
          {listings.map(item => (
            <div key={item._id} className="listing-card">
              <h3>{item.itemName}</h3>
              <p>
                <strong>{t('quantity_label')}:</strong> {item.quantity} {item.unit}
              </p>
              <p>
                <strong>{t('grade_label')}:</strong> {item.grade}
              </p>
              <p className="price">
                {t('price_label')}: ₹{item.pricePerUnit} {t('per_unit', { unit: item.unit })}
              </p>
              <p className={`status ${item.grade.toLowerCase()}`}>
                {item.grade === 'Surplus' ? t('category_surplus') : t('category_imperfect')}
              </p>
              <button className="btn btn-buy">{t('buy_now_button')}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard;