import React from 'react';

const SkillsRenderer = (params) => {
  const skills = params.value || [];
  
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', padding: '4px 0' }}>
      {skills.slice(0, 2).map((skill, index) => (
        <span
          key={index}
          style={{
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            padding: '2px 8px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: '500',
          }}
        >
          {skill}
        </span>
      ))}
      {skills.length > 2 && (
        <span
          style={{
            color: '#6b7280',
            fontSize: '11px',
            padding: '2px 4px',
          }}
        >
          +{skills.length - 2} more
        </span>
      )}
    </div>
  );
};

export default SkillsRenderer;