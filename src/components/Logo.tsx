import React from 'react';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo-image.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoImage} 
        alt="Legal Salahkaar Logo" 
        className={cn("w-auto", sizeClasses[size])} 
      />
    </div>
  );
};

export default Logo;