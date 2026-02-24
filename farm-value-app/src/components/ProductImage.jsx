import React, { useState } from 'react';

// This component shows the real image if it loads correctly,
// and falls back to a beautiful emoji card if the image fails
export default function ProductImage({ src, alt, emoji, height = '200px', style = {} }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div style={{
        width: '100%',
        height: height,
        background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '5rem',
        ...style
      }}>
        <span>{emoji || '🌾'}</span>
        <span style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '8px', fontWeight: '600' }}>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      style={{ width: '100%', height: height, objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
