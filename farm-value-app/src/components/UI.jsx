import React, { useState } from 'react';

export function Card({ children, style, onClick, hoverable }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white', borderRadius: '12px', overflow: 'hidden',
        transition: 'all 0.3s ease', cursor: onClick ? 'pointer' : 'default',
        transform: hoverable && hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hoverable && hovered ? '0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
        ...style
      }}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'success', style }) {
  const colors = {
    success: { background: '#d1fae5', color: '#065f46' },
    warning: { background: '#fef3c7', color: '#92400e' },
    danger:  { background: '#fee2e2', color: '#991b1b' },
    info:    { background: '#dbeafe', color: '#1e40af' },
    secondary: { background: '#f3f4f6', color: '#374151' }
  };
  return (
    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
      display: 'inline-flex', alignItems: 'center', gap: '4px', ...colors[variant], ...style }}>
      {children}
    </span>
  );
}

export function Rating({ value, size = 16 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: size, color: s <= value ? '#fbbf24' : '#d1d5db' }}>★</span>
      ))}
      <span style={{ marginLeft: '6px', color: '#6b7280', fontSize: '14px' }}>{value}</span>
    </div>
  );
}
