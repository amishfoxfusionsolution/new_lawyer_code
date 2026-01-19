import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("font-display text-2xl font-bold text-foreground", className)}>
      Legal <span className="text-primary">Salahkaar</span>
    </div>
  );
};

export default Logo;