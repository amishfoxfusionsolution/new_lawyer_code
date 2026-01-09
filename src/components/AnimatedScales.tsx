import React from 'react';

interface AnimatedScalesProps {
  size?: number;
  className?: string;
}

const AnimatedScales: React.FC<AnimatedScalesProps> = ({ size = 120, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Center pillar */}
        <rect x="47" y="28" width="6" height="55" fill="hsl(var(--gold))" />
        
        {/* Base */}
        <rect x="25" y="80" width="50" height="8" rx="3" fill="hsl(var(--gold))" />
        
        {/* Top decoration */}
        <circle cx="50" cy="25" r="6" fill="hsl(var(--gold))" />
        
        {/* Animated balance beam group */}
        <g className="animate-scales-tilt" style={{ transformOrigin: '50px 25px' }}>
          {/* Balance beam */}
          <rect x="5" y="22" width="90" height="6" rx="3" fill="hsl(var(--gold))" />
          
          {/* Left chain */}
          <line x1="15" y1="28" x2="15" y2="48" stroke="hsl(var(--gold))" strokeWidth="3" />
          
          {/* Right chain */}
          <line x1="85" y1="28" x2="85" y2="48" stroke="hsl(var(--gold))" strokeWidth="3" />
          
          {/* Left scale pan */}
          <path
            d="M0 50 L15 46 L30 50 L27 55 Q15 65 3 55 Z"
            fill="hsl(var(--gold))"
          />
          
          {/* Right scale pan */}
          <path
            d="M70 50 L85 46 L100 50 L97 55 Q85 65 73 55 Z"
            fill="hsl(var(--gold))"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedScales;
