import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Search, Eye, ShoppingCart, ArrowLeft, CheckCircle, Trash2, Clock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { mockProducts, mockOrders, categories } from '../data/mockData';
import { Card } from '../components/UI';
import Button from '../components/Button';
import ProductImage from '../components/ProductImage';

// ==================== PRODUCT CARD COMPONENT ====================
function ProductCard({ product, onAddToCart, onView }) {
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
          height="200px"
        />
        {/* Category badge overlay */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(255,255,255,0.92)',
          padding: '4px 10px', borderRadius: '20px',
          fontSize: '11px', fontWeight: '700', color: '#2E7D32',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {product.emoji} {product.category}
        </div>
        {/* Low stock warning */}
        {product.stock <= 10 && (
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            background: '#fef3c7', color: '#92400e',
            padding: '4px 8px', borderRadius: '20px',
            fontSize: '11px', fontWeight: '700'
          }}>
            ⚠️ Low Stock
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '4px', color: '#1f2937', lineHeight: '1.3' }}>
          {product.name}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '8px' }}>
          🌾 {product.farmerName} • {product.farmName}
        </p>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ fontSize: '13px', color: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
          ))}
          <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '4px' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Description preview */}
        <p style={{
          color: '#9ca3af', fontSize: '0.78rem', lineHeight: '1.5', marginBottom: '14px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {product.description}
        </p>

        {/* Price + Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#2E7D32' }}>${product.price.toFixed(2)}</span>
            <span style={{ color: '#9ca3af', fontSize: '0.78rem' }}> /{product.unit}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={(e) => { e.stopPropagation(); onView(); }}
              style={{
                width: '36px', height: '36px', borderRadius: '8px',
                border: '1.5px solid #e5e7eb', background: 'white',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#6b7280'
              }}>
              <Eye size={15} />
            </button>
            <button
              onClick={handleAdd}
              style={{
                height: '36px', padding: '0 14px', borderRadius: '8px', border: 'none',
                background: addedFeedback
                  ? 'linear-gradient(135deg, #059669, #047857)'
                  : 'linear-gradient(135deg, #2E7D32, #388E3C)',
                color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '5px',
                transform: addedFeedback ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.2s'
              }}>
              {addedFeedback
                ? <><CheckCircle size={14} /> Added!</>
                : <><ShoppingCart size={14} /> Add</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCTS PAGE ====================
export function ProductsPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  let filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  if (sort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px' }}>All Products</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Discover authentic farm products from verified farmers</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Sidebar Filters */}
        <div style={{ width: '230px', flexShrink: 0 }}>
          <Card style={{ padding: '20px', position: 'sticky', top: '90px' }}>
            <h3 style={{ marginBottom: '20px', fontWeight: '700' }}>🔍 Filters</h3>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '7px', fontWeight: '600', fontSize: '0.88rem' }}>Search</label>
              <div style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: '#9ca3af' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                  style={{ width: '100%', padding: '10px 10px 10px 32px', border: '1.5px solid #e5e7eb', borderRadius: '8px', boxSizing: 'border-box', fontSize: '0.88rem' }} />
              </div>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '7px', fontWeight: '600', fontSize: '0.88rem' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: 'white', fontSize: '0.88rem' }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '7px', fontWeight: '600', fontSize: '0.88rem' }}>Sort By</label>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1.5px solid #e5e7eb', borderRadius: '8px', background: 'white', fontSize: '0.88rem' }}>
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            {(search || category !== 'All') && (
              <Button variant="ghost" size="small" style={{ marginTop: '10px', width: '100%' }}
                onClick={() => { setSearch(''); setCategory('All'); setSort('default'); }}>
                ✕ Clear Filters
              </Button>
            )}
          </Card>
        </div>

        {/* Products Grid */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#6b7280', marginBottom: '20px', fontWeight: '500' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(245px, 1fr))', gap: '20px' }}>
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onView={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ marginBottom: '10px' }}>No products found</h3>
              <p style={{ color: '#6b7280' }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCT DETAIL ====================
export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = mockProducts.find(p => p.id === parseInt(id));
  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '15px' }}>😕</div>
      <h2>Product not found</h2>
      <Button onClick={() => navigate('/products')} style={{ marginTop: '20px' }}>Back to Products</Button>
    </div>
  );

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <Button variant="ghost" onClick={() => navigate(-1)} style={{ marginBottom: '25px' }}>
        <ArrowLeft size={16} /> Back
      </Button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        {/* Product Image with emoji fallback */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
          <ProductImage src={product.image} alt={product.name} emoji={product.emoji} height="420px" />
        </div>

        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '15px' }}>
            {product.emoji} {product.category}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>{product.name}</h1>
          <p style={{ color: '#6b7280', marginBottom: '14px' }}>
            by <strong style={{ color: '#2E7D32' }}>{product.farmerName}</strong> • {product.farmName}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: '20px', color: s <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
            ))}
            <span style={{ color: '#6b7280', fontSize: '0.9rem', marginLeft: '6px' }}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#2E7D32', margin: '20px 0 8px' }}>
            ${product.price.toFixed(2)}
            <span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: '400' }}> / {product.unit}</span>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '15px', borderRadius: '12px', marginBottom: '22px' }}>
            <p style={{ color: '#166534', fontWeight: '700', marginBottom: '6px' }}>✅ In Stock: {product.stock} units</p>
            <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.7' }}>{product.description}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontWeight: '700' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '42px', height: '42px', border: 'none', background: '#f9fafb', cursor: 'pointer', fontSize: '1.3rem', fontWeight: '700' }}>−</button>
              <span style={{ padding: '0 22px', fontWeight: '800', fontSize: '1.1rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}
                style={{ width: '42px', height: '42px', border: 'none', background: '#f9fafb', cursor: 'pointer', fontSize: '1.3rem', fontWeight: '700' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button size="large" onClick={handleAdd} style={{ flex: 1 }}>
              {added ? <><CheckCircle size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
            </Button>
            <Button size="large" variant="outline" onClick={() => { addToCart(product, quantity); navigate('/cart'); }}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CART PAGE ====================
export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    const newOrder = {
      id: Date.now(), buyerId: user.id, buyerName: user.name,
      items: [...cart], total: cartTotal, status: 'pending',
      date: new Date().toISOString().split('T')[0], farmerId: 1
    };
    mockOrders.push(newOrder);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) return (
    <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px', color: '#2E7D32' }}>Order Placed!</h2>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Your order has been placed. The farmer will process it soon.</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/orders')}>View My Orders</Button>
        <Button variant="outline" onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🛒</div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '10px' }}>Your cart is empty</h2>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Discover amazing farm products to add to your cart.</p>
      <Button onClick={() => navigate('/products')}>Browse Products</Button>
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '30px' }}>🛒 Shopping Cart</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '30px' }}>
        <div>
          {cart.map(item => (
            <div key={item.id} style={{
              background: 'white', borderRadius: '14px', padding: '16px',
              marginBottom: '14px', display: 'flex', gap: '14px', alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #f0fdf4'
            }}>
              {/* Cart item image with emoji fallback */}
              <div style={{ width: '75px', height: '75px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                <ProductImage src={item.image} alt={item.name} emoji={item.emoji} height="75px" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: '700', marginBottom: '3px', fontSize: '0.95rem' }}>{item.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: '3px' }}>{item.unit}</p>
                <p style={{ color: '#2E7D32', fontWeight: '800' }}>${item.price.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '34px', height: '34px', border: 'none', background: '#f9fafb', cursor: 'pointer', fontWeight: '800' }}>−</button>
                <span style={{ padding: '0 14px', fontWeight: '700' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '34px', height: '34px', border: 'none', background: '#f9fafb', cursor: 'pointer', fontWeight: '800' }}>+</button>
              </div>
              <p style={{ fontWeight: '800', color: '#1f2937', minWidth: '68px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button onClick={() => removeFromCart(item.id)}
                style={{ background: '#fef2f2', border: 'none', cursor: 'pointer', color: '#dc2626', padding: '8px', borderRadius: '8px' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: 'white', borderRadius: '14px', padding: '25px', height: 'fit-content', position: 'sticky', top: '90px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '20px' }}>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
              <span style={{ color: '#4b5563' }}>{item.emoji} {item.name} ×{item.quantity}</span>
              <span style={{ fontWeight: '700' }}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '15px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.15rem', marginBottom: '20px' }}>
              <span>Total</span>
              <span style={{ color: '#2E7D32' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <Button size="large" onClick={handleCheckout} style={{ width: '100%', marginBottom: '10px' }}>
              <CheckCircle size={18} /> Checkout
            </Button>
            <Button variant="ghost" size="small" style={{ width: '100%', color: '#dc2626' }} onClick={clearCart}>
              🗑️ Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== LOGIN PAGE ====================
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb',
    borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', outline: 'none'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        if (result.user.role === 'farmer') navigate('/farmer/dashboard');
        else if (result.user.role === 'admin') navigate('/admin/dashboard');
        else navigate('/products');
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 600);
  };

  const demoAccounts = [
    { role: 'Farmer', email: 'farmer@farm.com', icon: '🌾' },
    { role: 'Buyer', email: 'buyer@email.com', icon: '🛒' },
    { role: 'Admin', email: 'admin@farm.com', icon: '⚙️' },
  ];

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f0fdf4' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌾</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937' }}>Welcome Back</h1>
          <p style={{ color: '#6b7280' }}>Sign in to your FarmConnect account</p>
        </div>
        <Card style={{ padding: '35px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px 15px', marginBottom: '25px' }}>
            <p style={{ fontWeight: '700', color: '#166534', fontSize: '0.85rem', marginBottom: '10px' }}>🔑 Demo Accounts (password: 123)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {demoAccounts.map(acc => (
                <button key={acc.role} onClick={() => setEmail(acc.email)}
                  style={{ padding: '6px 12px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700', color: '#166534' }}>
                  {acc.icon} {acc.role}
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
            </div>
            <Button type="submit" size="large" style={{ width: '100%' }} disabled={loading}>
              {loading ? '⏳ Signing in...' : '→ Sign In'}
            </Button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#2E7D32', fontWeight: '700' }}>Sign Up Free</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

// ==================== REGISTER PAGE ====================
export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer', farmName: '', location: '' });
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb',
    borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill all required fields.'); return; }
    const result = register(form);
    if (result.success) {
      if (form.role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/products');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f0fdf4' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌱</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>Create Account</h1>
          <p style={{ color: '#6b7280' }}>Join thousands of farmers and buyers on FarmConnect</p>
        </div>
        <Card style={{ padding: '35px' }}>
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '10px' }}>I want to join as:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['buyer', 'farmer'].map(role => (
                  <button key={role} type="button" onClick={() => setForm({ ...form, role })}
                    style={{ padding: '14px', borderRadius: '10px', border: `2px solid ${form.role === role ? '#2E7D32' : '#e5e7eb'}`, background: form.role === role ? '#f0fdf4' : 'white', color: form.role === role ? '#2E7D32' : '#4b5563', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize', fontSize: '1rem' }}>
                    {role === 'buyer' ? '🛒' : '🌾'} {role}
                  </button>
                ))}
              </div>
            </div>
            {[
              { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email *', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password *', key: 'password', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })} style={inputStyle} required />
              </div>
            ))}
            {form.role === 'farmer' && (
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Farm Name</label>
                <input value={form.farmName} onChange={e => setForm({ ...form, farmName: e.target.value })} style={inputStyle} placeholder="Green Valley Farm" />
              </div>
            )}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle} placeholder="California, USA" />
            </div>
            <Button type="submit" size="large" style={{ width: '100%' }}>Create My Account →</Button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#2E7D32', fontWeight: '700' }}>Sign In</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

// ==================== ORDERS PAGE ====================
export function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Please <Link to="/login" style={{ color: '#2E7D32' }}>login</Link> to view your orders.
      </p>
    </div>
  );

  const myOrders = mockOrders.filter(o => o.buyerId === user.id);
  const statusConfig = {
    pending:   { bg: '#fef3c7', text: '#92400e', icon: <Clock size={13} />,       label: 'Pending'   },
    shipped:   { bg: '#dbeafe', text: '#1e40af', icon: <Truck size={13} />,        label: 'Shipped'   },
    delivered: { bg: '#d1fae5', text: '#065f46', icon: <CheckCircle size={13} />,  label: 'Delivered' },
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>📦 My Orders</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>{myOrders.length} order{myOrders.length !== 1 ? 's' : ''} placed</p>

      {myOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '15px' }}>📦</div>
          <h3 style={{ marginBottom: '10px' }}>No orders yet</h3>
          <p style={{ color: '#6b7280', marginBottom: '25px' }}>Start shopping to see your orders here</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      ) : (
        myOrders.map(order => {
          const cfg = statusConfig[order.status] || statusConfig.pending;
          return (
            <div key={order.id} style={{
              background: 'white', borderRadius: '14px', padding: '22px',
              marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              border: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <p style={{ fontWeight: '800', fontSize: '1.05rem', marginBottom: '4px' }}>Order #{order.id}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>📅 {order.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '800', color: '#2E7D32', fontSize: '1.15rem', marginBottom: '8px' }}>${order.total.toFixed(2)}</p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '5px 12px', borderRadius: '20px', fontSize: '0.82rem',
                    fontWeight: '700', background: cfg.bg, color: cfg.text
                  }}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
              </div>
              {/* Order items with emoji fallback */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <ProductImage src={item.image} alt={item.name} emoji={item.emoji} height="38px" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.82rem', fontWeight: '700' }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>×{item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
