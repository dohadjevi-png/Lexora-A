import React from 'react';
import logoImg from '../assets/lexora-logo.png';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <img 
          src={logoImg} 
          alt="Lexora Logo" 
          className="h-full w-auto object-contain"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-2xl font-serif font-bold tracking-tighter">
          LEXORA<span className="text-ocre">.</span>
        </span>
      )}
    </div>
  );
};
