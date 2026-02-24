import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import HomePage from './pages/HomePage';
import {
  ProductsPage,
  ProductDetailPage,
  CartPage,
  LoginPage,
  RegisterPage,
  OrdersPage
} from './pages/Pages';
import { FarmerDashboard, AdminDashboard } from './pages/Dashboards';
import './App.css';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '120px 20px' }}>
      <div style={{ fontSize: '6rem', marginBottom: '10px' }}>🌾</div>
      <h1 style={{ fontSize: '5rem', fontWeight: '900', color: '#e5e7eb', marginBottom: '10px' }}>404</h1>
      <h2 style={{ marginBottom: '10px', fontWeight: '700' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>The page you're looking for doesn't exist.</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/')}>Go Home</Button>
        <Button variant="outline" onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
