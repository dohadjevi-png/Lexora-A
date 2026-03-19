import React from 'react';
import { TransparentImage } from './TransparentImage';
import logoImg from '../assets/lexora-logo.png';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <TransparentImage 
        src={logoImg} 
        alt="Lexora Logo" 
        className="h-full w-auto"
        threshold={30}
      />
    </div>
  );
};
