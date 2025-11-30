import React from 'react';

const PerformanceRenderer = (params) => {
  const rating = params.value;


  if (!rating || isNaN(rating)) {
    return <span style={{ fontSize: '13px', fontWeight: '600' }}>N/A</span>;
  }

  const percentage = (rating / 5) * 100;

  let color = '#ef4444'; 
  if (rating >= 4.5) color = '#10b981'; 
  else if (rating >= 4.0) color = '#3b82f6'; 
  else if (rating >= 3.5) color = '#f59e0b'; 

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '100px',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '600' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default PerformanceRenderer;
