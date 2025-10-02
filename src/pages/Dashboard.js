import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const { t } = useTranslation();
  // Get user role from local storage (or context)
  const userRole = localStorage.getItem('role'); 
  const userName = localStorage.getItem('name') || t('dashboard_heading'); // Assuming name is stored on login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    // Force a page reload/redirect
    window.location.href = '/login'; 
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <h2>{userName}</h2>
        <p>({t(`role_${userRole}`)})</p>
        <nav className="dashboard-nav">
          <Link to="profile">{t('profile_link')}</Link>
          <Link to="inventory">{t('inventory_link')}</Link>
          <Link to="orders">{t('orders_link')}</Link>
          
          {/* Role-specific links */}
          {userRole === 'farmer' && (
            <Link to="surplus">{t('surplus_link')}</Link>
          )}
          {userRole === 'restaurant' && (
            <Link to="listings">{t('surplus_feed_heading')}</Link>
          )}

          <Link to="settings">{t('settings_link')}</Link>
        </nav>
        <button onClick={handleLogout} className="btn-logout">
          {t('logout_link')}
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {/*
          The Outlet is where nested routes (like /dashboard/inventory) will render.
          For simplicity, you can remove Outlet and just render the primary dashboard content here,
          or update App.js to use nested routes:
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="inventory" element={<InventoryManager />} />
            <Route path="listings" element={<RestaurantDashboard />} />
          </Route>
        */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default Dashboard;