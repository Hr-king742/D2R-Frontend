import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// --- Main Pages ---
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';      // <-- NEW IMPORT
import ContactPage from './pages/ContactPage';  // <-- NEW IMPORT
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// --- Dashboard Pages ---
import Dashboard from './pages/Dashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />        {/* <-- NEW ROUTE */}
          <Route path="/contact" element={<ContactPage />} />    {/* <-- NEW ROUTE */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Nested Dashboard Routes (Private) */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<ProfilePage />} /> 
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="inventory" element={<FarmerDashboard />} /> 
            <Route path="listings" element={<RestaurantDashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;