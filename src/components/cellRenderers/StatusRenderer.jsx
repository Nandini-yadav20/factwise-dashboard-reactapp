import React from 'react';

const StatusRenderer = (params) => {
  const isActive = params.value;
  
  return (
    <span
      style={{
        backgroundColor: isActive ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '500',
      }}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusRenderer;