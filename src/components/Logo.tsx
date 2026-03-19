import React from 'react';
import { TransparentImage } from './TransparentImage';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <TransparentImage 
        src="/LEXORA logo combo 2.png" 
        alt="Lexora Logo" 
        className="h-full w-auto"
        threshold={30}
      />
    </div>
  );
};
