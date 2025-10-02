import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// NOTE: You need an Order Model and corresponding API routes (GET /api/orders/my) 
// in the backend for this page to function.

function OrdersPage() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(t('no_orders_available'));
        setLoading(false);
        return;
      }

      try {
        // Fetch orders based on the user's role
        const res = await axios.get('YOUR_BACKEND_URL/api/orders/my', {
          headers: {
            'x-auth-token': token,
          },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(t('fetch_orders_failed_message'));
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [t]);

  if (loading) return <div className="loading-message">{t('loading_orders')}</div>;
  if (error) return <div className="error-message">{t('error_message')}: {error}</div>;

  return (
    <div className="orders-container">
      <h2>{t('orders_heading')} ({userRole === 'farmer' ? "Received" : "Placed"})</h2>
      
      {orders.length === 0 ? (
        <p>{t('no_orders_available')}</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>{t('order_id_label')}</th>
              <th>{t('order_date_label')}</th>
              <th>{t('order_total_label')}</th>
              <th>{t('order_status_label')}</th>
              <th>{t('view_button')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 8)}...</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>₹{order.totalAmount.toFixed(2)}</td>
                <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                <td><button className="btn btn-view">{t('view_button')}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;