import React from 'react';

const StatsCard = ({ title, value, icon, color = '#9bdbf8ff' }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>{title}</p>
        <p style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#111827' }}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;