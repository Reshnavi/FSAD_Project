import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Eye, Package, ShoppingCart, DollarSign, Star, Clock, Truck, CheckCircle, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProducts, mockOrders, mockUsers, categories } from '../data/mockData';
import { Card, Badge } from '../components/UI';
import Button from '../components/Button';

// ==================== FARMER DASHBOARD ====================
export function FarmerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', unit: '', category: 'Processed Foods', stock: '', description: '', image: '' });
  const [, forceUpdate] = useState(0);

  if (!user || user.role !== 'farmer') return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
      <h2 style={{ marginBottom: '10px' }}>Access Denied</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>You need to be logged in as a farmer.</p>
      <Link to="/login"><Button>Login as Farmer</Button></Link>
    </div>
  );

  const myProducts = mockProducts.filter(p => p.farmerId === user.id);
  const myOrders = mockOrders.filter(o => o.farmerId === user.id);
  const revenue = myOrders.reduce((s, o) => s + o.total, 0);

  const statusConfig = {
    pending: { color: 'warning', icon: <Clock size={12} /> },
    shipped: { color: 'info', icon: <Truck size={12} /> },
    delivered: { color: 'success', icon: <CheckCircle size={12} /> },
  };

  const stats = [
    { label: 'My Products', value: myProducts.length, icon: <Package size={22} />, color: '#2E7D32', bg: '#f0fdf4' },
    { label: 'Total Orders', value: myOrders.length, icon: <ShoppingCart size={22} />, color: '#1d4ed8', bg: '#eff6ff' },
    { label: 'Revenue', value: `$${revenue.toFixed(2)}`, icon: <DollarSign size={22} />, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'My Rating', value: user.rating || '4.8', icon: <Star size={22} />, color: '#d97706', bg: '#fffbeb' },
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      farmerId: user.id,
      farmerName: user.name,
      farmName: user.farmName || 'My Farm',
      rating: 0, reviews: 0,
      image: newProduct.image || 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400'
    };
    mockProducts.push(product);
    setShowModal(false);
    setNewProduct({ name: '', price: '', unit: '', category: 'Processed Foods', stock: '', description: '', image: '' });
    forceUpdate(n => n + 1);
    setActiveTab('products');
  };

  const handleDelete = (id) => {
    const idx = mockProducts.findIndex(p => p.id === id);
    if (idx !== -1) mockProducts.splice(idx, 1);
    forceUpdate(n => n + 1);
  };

  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', boxSizing: 'border-box', fontSize: '0.9rem' };
  const tabs = ['overview', 'products', 'orders'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '4px' }}>🌾 Farmer Dashboard</h1>
          <p style={{ color: '#6b7280' }}>{user.farmName || 'My Farm'} • {user.location || 'Location not set'}</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus size={18} /> Add New Product</Button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '30px' }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                <p style={{ fontSize: '1.8rem', fontWeight: '900', color: s.color }}>{s.value}</p>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '25px', background: '#f3f4f6', padding: '5px', borderRadius: '12px', width: 'fit-content' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', textTransform: 'capitalize', fontSize: '0.9rem',
              background: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#2E7D32' : '#6b7280',
              boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <div>
            <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>Recent Orders</h3>
            {myOrders.length === 0 ? <p style={{ color: '#6b7280' }}>No orders yet.</p> : myOrders.slice(0, 4).map(order => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              return (
                <Card key={order.id} style={{ padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Order #{order.id}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{order.buyerName}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#2E7D32', fontWeight: '800', marginBottom: '4px' }}>${order.total.toFixed(2)}</p>
                    <Badge variant={cfg.color}>{cfg.icon} {order.status}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
          <div>
            <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>My Products</h3>
            {myProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '12px' }}>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>No products listed yet.</p>
                <Button size="small" onClick={() => setShowModal(true)}>Add First Product</Button>
              </div>
            ) : myProducts.slice(0, 3).map(p => (
              <Card key={p.id} style={{ padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>{p.name}</p>
                  <p style={{ color: '#2E7D32', fontWeight: '800', fontSize: '0.9rem' }}>${p.price.toFixed(2)}</p>
                </div>
                <Badge variant="secondary">Stock: {p.stock}</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div>
          {myProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>📦</div>
              <h3 style={{ marginBottom: '10px' }}>No products listed</h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>Add your first product to start selling!</p>
              <Button onClick={() => setShowModal(true)}><Plus size={16} /> Add First Product</Button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {myProducts.map(product => (
                <Card key={product.id}>
                  <div style={{ position: 'relative' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '5px' }}>
                      <button onClick={() => navigate(`/products/${product.id}`)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                        <Eye size={14} color="#4b5563" />
                      </button>
                      <button onClick={() => handleDelete(product.id)}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                        <Trash2 size={14} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <h3 style={{ fontWeight: '700', marginBottom: '4px', fontSize: '0.95rem' }}>{product.name}</h3>
                    <p style={{ color: '#2E7D32', fontWeight: '800', marginBottom: '4px' }}>${product.price.toFixed(2)} / {product.unit}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>{product.category}</p>
                      <Badge variant={product.stock > 10 ? 'success' : 'warning'}>Stock: {product.stock}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div>
          {myOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🛒</div>
              <h3>No orders yet</h3>
              <p style={{ color: '#6b7280', marginTop: '10px' }}>Orders from buyers will appear here.</p>
            </div>
          ) : myOrders.map(order => {
            const cfg = statusConfig[order.status] || statusConfig.pending;
            return (
              <Card key={order.id} style={{ padding: '20px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <p style={{ fontWeight: '800', fontSize: '1rem', marginBottom: '4px' }}>Order #{order.id}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>👤 {order.buyerName} • 📅 {order.date}</p>
                    <p style={{ color: '#4b5563', fontSize: '0.85rem', marginTop: '4px' }}>{order.items.length} item(s)</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '900', color: '#2E7D32', fontSize: '1.2rem', marginBottom: '6px' }}>${order.total.toFixed(2)}</p>
                    <Badge variant={cfg.color}>{cfg.icon} {order.status}</Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Card style={{ padding: '30px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <h2 style={{ fontWeight: '800', fontSize: '1.3rem' }}>➕ Add New Product</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={22} color="#6b7280" />
              </button>
            </div>
            <form onSubmit={handleAddProduct}>
              {[
                { label: 'Product Name *', key: 'name', type: 'text', placeholder: 'e.g. Organic Honey' },
                { label: 'Price ($) *', key: 'price', type: 'number', placeholder: '25.99' },
                { label: 'Unit *', key: 'unit', type: 'text', placeholder: 'e.g. 500g jar' },
                { label: 'Stock Quantity *', key: 'stock', type: 'number', placeholder: '50' },
                { label: 'Image URL (optional)', key: 'image', type: 'text', placeholder: 'https://...' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={newProduct[f.key]}
                    onChange={e => setNewProduct({ ...newProduct, [f.key]: e.target.value })}
                    style={inputStyle} required={f.label.includes('*')} />
                </div>
              ))}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Category</label>
                <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} style={inputStyle}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Description</label>
                <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your product..." />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="submit" style={{ flex: 1 }}>Add Product</Button>
                <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================
export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
      <h2 style={{ marginBottom: '10px' }}>Access Denied</h2>
      <Link to="/login"><Button>Login as Admin</Button></Link>
    </div>
  );

  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);
  const statusConfig = {
    pending: { color: 'warning' },
    shipped: { color: 'info' },
    delivered: { color: 'success' },
  };

  const stats = [
    { label: 'Total Products', value: mockProducts.length, icon: <Package size={22} />, color: '#2E7D32', bg: '#f0fdf4' },
    { label: 'Total Orders', value: mockOrders.length, icon: <ShoppingCart size={22} />, color: '#1d4ed8', bg: '#eff6ff' },
    { label: 'Total Users', value: mockUsers.length, icon: <Users size={22} />, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign size={22} />, color: '#d97706', bg: '#fffbeb' },
  ];

  const tabs = ['overview', 'products', 'orders', 'users'];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '4px' }}>⚙️ Admin Dashboard</h1>
        <p style={{ color: '#6b7280' }}>Platform overview and management</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '30px' }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                <p style={{ fontSize: '1.8rem', fontWeight: '900', color: s.color }}>{s.value}</p>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '25px', background: '#f3f4f6', padding: '5px', borderRadius: '12px', width: 'fit-content' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', textTransform: 'capitalize', fontSize: '0.9rem',
              background: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#2E7D32' : '#6b7280',
              boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <div>
            <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>Recent Orders</h3>
            {mockOrders.slice(0, 5).map(order => (
              <Card key={order.id} style={{ padding: '14px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>#{order.id} — {order.buyerName}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{order.date}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: '#2E7D32', fontSize: '0.95rem' }}>${order.total.toFixed(2)}</span>
                  <Badge variant={statusConfig[order.status]?.color || 'secondary'}>{order.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
          <div>
            <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>Platform Stats</h3>
            <Card style={{ padding: '20px' }}>
              {[
                { label: 'Farmers', value: mockUsers.filter(u => u.role === 'farmer').length, icon: '🌾' },
                { label: 'Buyers', value: mockUsers.filter(u => u.role === 'buyer').length, icon: '🛒' },
                { label: 'Pending Orders', value: mockOrders.filter(o => o.status === 'pending').length, icon: '⏳' },
                { label: 'Delivered Orders', value: mockOrders.filter(o => o.status === 'delivered').length, icon: '✅' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                  <span style={{ color: '#4b5563' }}>{item.icon} {item.label}</span>
                  <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1f2937' }}>{item.value}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {activeTab === 'products' && (
        <div>
          <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>All Products ({mockProducts.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {mockProducts.map(p => (
              <Card key={p.id} style={{ padding: '14px' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '0.9rem' }}>{p.name}</p>
                <p style={{ color: '#2E7D32', fontWeight: '800', marginBottom: '4px' }}>${p.price.toFixed(2)}</p>
                <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>by {p.farmerName}</p>
                <Badge variant="secondary" style={{ marginTop: '8px' }}>{p.category}</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ORDERS */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>All Orders ({mockOrders.length})</h3>
          {mockOrders.map(order => (
            <Card key={order.id} style={{ padding: '18px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <p style={{ fontWeight: '800', marginBottom: '4px' }}>Order #{order.id} — {order.buyerName}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{order.date} • {order.items.length} items</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '900', color: '#2E7D32', fontSize: '1.1rem', marginBottom: '6px' }}>${order.total.toFixed(2)}</p>
                  <Badge variant={statusConfig[order.status]?.color || 'secondary'}>{order.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* USERS */}
      {activeTab === 'users' && (
        <div>
          <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>All Users ({mockUsers.length})</h3>
          {mockUsers.map(u => (
            <Card key={u.id} style={{ padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: u.role === 'farmer' ? '#f0fdf4' : u.role === 'admin' ? '#fef2f2' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem', color: u.role === 'farmer' ? '#2E7D32' : u.role === 'admin' ? '#dc2626' : '#1d4ed8' }}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: '700', marginBottom: '2px' }}>{u.name}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{u.email}</p>
                </div>
              </div>
              <Badge variant={u.role === 'farmer' ? 'success' : u.role === 'admin' ? 'danger' : 'info'}>
                {u.role === 'farmer' ? '🌾' : u.role === 'admin' ? '⚙️' : '🛒'} {u.role}
              </Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
