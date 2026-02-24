import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2E7D32, #4CAF50)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package color="white" size={22} />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2E7D32' }}>FarmConnect</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600' }}>Products</Link>

          {user ? (
            <>
              {user.role === 'farmer' && <Link to="/farmer/dashboard" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600' }}>Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600' }}>Admin</Link>}
              {user.role === 'buyer' && (
                <>
                  <Link to="/orders" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '600' }}>My Orders</Link>
                  <Link to="/cart" style={{ textDecoration: 'none', color: '#4b5563', position: 'relative' }}>
                    <ShoppingCart size={24} color="#4b5563" />
                    {cartCount > 0 && (
                      <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#dc2626', color: 'white', fontSize: '11px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#2E7D32', fontSize: '1rem' }}>
                  {user.name.charAt(0)}
                </div>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{user.name}</span>
                <Button variant="ghost" size="small" onClick={() => { logout(); navigate('/'); }}>
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login"><Button variant="ghost" size="small">Login</Button></Link>
              <Link to="/register"><Button size="small">Sign Up</Button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
