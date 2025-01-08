import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center justify-center">
      <img 
        src="/logo.png" 
        alt="Logo" 
        style={{ width }} 
        className="object-contain"
      />
    </div>
  );
}

export default Logo;
