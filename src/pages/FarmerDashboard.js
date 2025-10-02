import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function FarmerDashboard() {
  const { t } = useTranslation();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false); // To toggle the Add form

  // State for the new inventory item form
  const [newItem, setNewItem] = useState({
    itemName: '',
    quantity: '',
    unit: 'kg', // Default unit
    pricePerUnit: '',
    grade: 'A', // Default grade
  });

  // --- Fetch Listings Logic ---
  useEffect(() => {
    const fetchMyListings = async () => {
      // NOTE: In a real app, this requires authentication. 
      // Assuming token is available in localStorage and needs to be in headers.
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('YOUR_BACKEND_URL/api/inventory/my', {
          headers: {
            'x-auth-token': token,
          },
        });
        setMyListings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(t('fetch_listings_failed_message'));
        setLoading(false);
      }
    };
    
    fetchMyListings();
  }, [t]);

  // --- Add Listing Logic ---
  const handleItemChange = e => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const res = await axios.post('YOUR_BACKEND_URL/api/inventory', newItem, {
        headers: {
          'x-auth-token': token,
        },
      });

      // Add the new item to the local list and reset the form
      setMyListings([...myListings, res.data]);
      setNewItem({ itemName: '', quantity: '', unit: 'kg', pricePerUnit: '', grade: 'A' });
      setIsAdding(false);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setError("Failed to add listing."); // Use a translation key here
    }
  };

  if (loading) return <div>{t('loading_inventory')}</div>;
  if (error && myListings.length === 0) return <div>{t('error_message')}: {error}</div>;

  return (
    <div className="farmer-dashboard-container">
      <h1>{t('dashboard_heading')}</h1>
      
      {/* 1. Add Inventory Button/Form */}
      <button 
        onClick={() => setIsAdding(!isAdding)} 
        className="btn btn-primary"
      >
        {isAdding ? t('cancel_button') : t('add_inventory_button')}
      </button>

      {isAdding && (
        <div className="add-inventory-form-wrapper">
          <h2>{t('add_inventory_heading')}</h2>
          <form onSubmit={handleAddSubmit} className="inventory-form">
            <input
              type="text"
              name="itemName"
              placeholder={t('item_name_placeholder')}
              value={newItem.itemName}
              onChange={handleItemChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder={t('item_quantity_placeholder')}
              value={newItem.quantity}
              onChange={handleItemChange}
              required
            />
            <select name="unit" value={newItem.unit} onChange={handleItemChange}>
                <option value="kg">kg</option>
                <option value="bundle">bundle</option>
                <option value="dozen">dozen</option>
            </select>
            <input
              type="number"
              name="pricePerUnit"
              placeholder={t('item_price_placeholder')}
              value={newItem.pricePerUnit}
              onChange={handleItemChange}
              required
            />
            <select name="grade" value={newItem.grade} onChange={handleItemChange}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="Surplus">{t('category_surplus')}</option>
                <option value="Imperfect">{t('category_imperfect')}</option>
            </select>
            
            <button type="submit" className="btn btn-submit">{t('submit_button')}</button>
          </form>
        </div>
      )}

      {/* 2. My Current Listings */}
      <section className="my-listings-section">
        <h2>{t('inventory_heading')}</h2>
        
        {myListings.length === 0 ? (
          <p>{t('no_inventory_available')}</p>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>{t('item_name_placeholder')}</th>
                <th>{t('item_quantity_placeholder')}</th>
                <th>{t('item_price_placeholder')}</th>
                <th>{t('item_grade_placeholder')}</th>
                <th>{t('edit_button')} / {t('delete_button')}</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map(item => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>₹{item.pricePerUnit} / {item.unit}</td>
                  <td>{item.grade}</td>
                  <td>
                    <button className="btn btn-edit">{t('edit_button')}</button>
                    <button className="btn btn-delete">{t('delete_button')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default FarmerDashboard;