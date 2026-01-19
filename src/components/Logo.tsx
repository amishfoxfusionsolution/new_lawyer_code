import React from 'react';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo-image.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: { img: 'h-6', text: 'text-lg' },
    md: { img: 'h-8', text: 'text-xl' },
    lg: { img: 'h-10', text: 'text-2xl' },
  };
  
  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src={logoImage} 
        alt="Legal Salahkaar Logo" 
        className={cn("w-auto", currentSize.img)} 
      />
      <span className={cn("font-display font-bold text-foreground", currentSize.text)}>
        Legal <span className="text-primary">Salahkaar</span>
      </span>
    </div>
  );
};

export default Logo;