import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Truck, Shield, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { Card, Badge } from '../components/UI';
import Button from '../components/Button';
import ProductImage from '../components/ProductImage';

export default function HomePage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const features = [
    { icon: <Users size={32} />, title: 'Connect Directly', desc: 'Farmers connect directly with buyers worldwide, no middlemen.' },
    { icon: <TrendingUp size={32} />, title: 'Increase Value', desc: 'Turn raw crops into processed products and earn more.' },
    { icon: <Truck size={32} />, title: 'Global Shipping', desc: 'Ship your products to customers anywhere in the world.' },
    { icon: <Shield size={32} />, title: 'Quality Assured', desc: 'Verified farmers and quality-checked products only.' },
  ];

  const stats = [
    { value: '2,500+', label: 'Active Farmers', emoji: '🌾' },
    { value: '15,000+', label: 'Products Listed', emoji: '📦' },
    { value: '50+', label: 'Countries Reached', emoji: '🌍' },
    { value: '98%', label: 'Buyer Satisfaction', emoji: '⭐' },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2E7D32 40%, #388E3C 70%, #43A047 100%)',
        padding: '100px 20px', textAlign: 'center', color: 'white',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-100px', left: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', bottom: '-80px', right: '-80px' }} />
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '30px', padding: '7px 18px', fontSize: '13px', fontWeight: '700', marginBottom: '25px', backdropFilter: 'blur(4px)' }}>
            🌾 Empowering Rural Entrepreneurs
          </div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
            Connect Farmers with<br />
            <span style={{ color: '#A5D6A7' }}>Global Buyers</span>
          </h1>
          <p style={{ fontSize: '1.15rem', marginBottom: '40px', opacity: 0.9, lineHeight: '1.8', maxWidth: '580px', margin: '0 auto 40px' }}>
            Turn your crops into valuable products. Sell processed foods, handmade goods, and more to customers worldwide using technology.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="large" variant="secondary" onClick={() => navigate('/products')}>🛒 Browse Products</Button>
            <Button size="large" variant="outline" style={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/register')}>🌱 Join as Farmer</Button>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ background: '#f0fdf4', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '6px' }}>{s.emoji}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#2E7D32' }}>{s.value}</div>
              <div style={{ color: '#4b5563', fontWeight: '600', fontSize: '0.9rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>Why Choose FarmConnect?</h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Everything you need to grow your farm business globally</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          {features.map((f, i) => (
            <Card key={i} style={{ padding: '30px', textAlign: 'center' }} hoverable>
              <div style={{ width: '65px', height: '65px', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#2E7D32' }}>
                {f.icon}
              </div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.15rem', fontWeight: '700' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7', fontSize: '0.95rem' }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section style={{ padding: '80px 20px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px' }}>Featured Products</h2>
              <p style={{ color: '#6b7280' }}>Fresh from verified farmers around the world</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/products')}>View All Products →</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '25px' }}>
            {mockProducts.slice(0, 4).map(product => (
              <FeaturedProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onView={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '12px' }}>How It Works</h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Simple steps to get started</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {[
            { step: '01', emoji: '📝', title: 'Sign Up', desc: 'Create your account as a farmer or buyer in minutes.' },
            { step: '02', emoji: '📦', title: 'List Products', desc: 'Farmers list their value-added products with photos and pricing.' },
            { step: '03', emoji: '🤝', title: 'Connect', desc: 'Buyers browse and discover authentic farm products.' },
            { step: '04', emoji: '📈', title: 'Grow', desc: 'Complete transactions and grow your rural business.' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#e8f5e9', WebkitTextStroke: '2px #2E7D32', marginBottom: '10px' }}>{item.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.emoji}</div>
              <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #2E7D32, #1b5e20)', padding: '80px 20px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚀</div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '15px' }}>Ready to Start Selling?</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '35px', opacity: 0.85 }}>
          Join 2,500+ farmers already growing their business with FarmConnect.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="large" onClick={() => navigate('/register')}>Create Free Account</Button>
          <Button variant="outline" size="large" style={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </section>
    </div>
  );
}

// ===== FEATURED PRODUCT CARD =====
function FeaturedProductCard({ product, onAddToCart, onView }) {
  const [hovered, setHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <div
      onClick={onView}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(46,125,50,0.18)' : '0 2px 12px rgba(0,0,0,0.08)',
        border: hovered ? '1.5px solid #a7f3d0' : '1.5px solid transparent',
      }}
    >
      {/* Image with emoji fallback */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ProductImage
          src={product.image}
          alt={product.name}
          emoji={product.emoji}
          height="210px"
        />
        {/* Emoji + category badge */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(255,255,255,0.92)',
          padding: '4px 10px', borderRadius: '20px',
          fontSize: '11px', fontWeight: '700', color: '#2E7D32',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {product.emoji} {product.category}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '18px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '4px', color: '#1f2937' }}>
          {product.name}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '8px' }}>
          🌾 by {product.farmerName}
        </p>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '14px' }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ fontSize: '14px', color: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
          ))}
          <span style={{ fontSize: '0.78rem', color: '#6b7280', marginLeft: '4px' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price + Add button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#2E7D32' }}>${product.price.toFixed(2)}</span>
            <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}> /{product.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            style={{
              height: '36px', padding: '0 14px', borderRadius: '8px', border: 'none',
              background: addedFeedback
                ? 'linear-gradient(135deg, #059669, #047857)'
                : 'linear-gradient(135deg, #2E7D32, #388E3C)',
              color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', gap: '5px',
              transition: 'all 0.2s',
              transform: addedFeedback ? 'scale(0.95)' : 'scale(1)'
            }}>
            {addedFeedback
              ? <><CheckCircle size={14} /> Added!</>
              : <><ShoppingCart size={14} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}
