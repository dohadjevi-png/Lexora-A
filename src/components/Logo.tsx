import React from 'react';
import logoImg from '../assets/lexora-logo.png';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Lexora Logo" 
        className="h-full w-auto object-contain"
      />
    </div>
  );
};
