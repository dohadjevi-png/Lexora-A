import React, { useEffect, useRef, useState } from 'react';

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  threshold?: number; // How close to white to remove (0-255)
}

export const TransparentImage: React.FC<TransparentImageProps> = ({ 
  src, 
  alt, 
  className, 
  threshold = 20 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple white background removal
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white, make it transparent
        if (r > 255 - threshold && g > 255 - threshold && b > 255 - threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setProcessedSrc(src); // Fallback to original src if processing fails
    };
  }, [src, threshold]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {processedSrc ? (
        <img src={processedSrc} alt={alt} className="w-full h-full object-contain" />
      ) : (
        <img src={src} alt={alt} className="w-full h-full object-contain opacity-50" />
      )}
    </div>
  );
};
