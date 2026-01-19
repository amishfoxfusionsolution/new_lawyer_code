import React from 'react';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo-image.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md', showTagline = false }) => {
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
      <div className="flex flex-col items-start">
        <span className={cn("font-display font-bold text-foreground leading-none", currentSize.text)}>
          Legal <span className="text-primary">Salahkaar</span>
        </span>
        {showTagline && (
          <p className="text-xs text-muted-foreground/80 mt-0.5 font-body tracking-wide leading-none hidden sm:block">
            Where discretion meets excellence
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;