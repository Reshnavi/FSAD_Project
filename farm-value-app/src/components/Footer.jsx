import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a2e', color: 'white', padding: '60px 20px 30px', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <h3 style={{ color: '#4CAF50', fontSize: '1.4rem', marginBottom: '15px', fontWeight: '800' }}>🌾 FarmConnect</h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.8', fontSize: '0.9rem' }}>
              Connecting farmers with global buyers. Turning crops into valuable products for rural entrepreneurship.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#e5e7eb' }}>Quick Links</h4>
            {[['/', 'Home'], ['/products', 'Browse Products'], ['/login', 'Login'], ['/register', 'Sign Up']].map(([to, label]) => (
              <div key={to} style={{ marginBottom: '8px' }}>
                <Link to={to} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#e5e7eb' }}>For Farmers</h4>
            {[['/register', 'Join as Farmer'], ['/farmer/dashboard', 'Farmer Dashboard'], ['/products', 'View Market']].map(([to, label]) => (
              <div key={to} style={{ marginBottom: '8px' }}>
                <Link to={to} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#e5e7eb' }}>Contact</h4>
            {[
              [Mail, 'support@farmconnect.com'],
              [Phone, '+91 12398765'],
              [MapPin, 'India']
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', marginBottom: '10px', fontSize: '0.9rem' }}>
                <Icon size={15} color="#4CAF50" /> {text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '20px', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} FarmConnect. All rights reserved. Built to empower rural entrepreneurs.
        </div>
      </div>
    </footer>
  );
}
