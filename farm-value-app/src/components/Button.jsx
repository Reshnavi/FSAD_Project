import React from 'react';

export default function Button({ children, variant = 'primary', size = 'medium', onClick, type = 'button', disabled, style }) {
  const base = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '14px 28px' : '10px 20px',
    borderRadius: '8px', fontWeight: '600', cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', transition: 'all 0.3s ease', opacity: disabled ? 0.6 : 1,
    fontSize: size === 'small' ? '0.875rem' : '1rem',
  };
  const variants = {
    primary: { background: '#2E7D32', color: 'white' },
    secondary: { background: '#f3f4f6', color: '#1f2937' },
    outline: { background: 'transparent', color: '#2E7D32', border: '2px solid #2E7D32' },
    danger: { background: '#dc2626', color: 'white' },
    ghost: { background: 'transparent', color: '#4b5563' }
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}
