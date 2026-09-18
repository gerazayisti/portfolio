import React from 'react';

// Section Number Watermark
export const SectionWatermark: React.FC<{ 
  number: string; 
  color?: 'black' | 'blue' | 'white'; 
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' 
}> = ({
  number,
  color = 'black',
  position = 'top-right'
}) => {
  const colorStyles = {
    black: 'text-[#0A0A0A] opacity-[0.06]',
    blue: 'text-[#1E40AF] opacity-[0.08]',
    white: 'text-[#FAF9F6] opacity-[0.05]'
  };

  const posStyles = {
    'top-right': 'top-2 right-4',
    'bottom-right': 'bottom-2 right-4',
    'top-left': 'top-2 left-4',
    'bottom-left': 'bottom-2 left-4'
  };

  return (
    <div className={`absolute ${posStyles[position]} pointer-events-none select-none font-mono text-7xl sm:text-8xl md:text-9xl font-black leading-none ${colorStyles[color]}`}>
      {number}
    </div>
  );
};

// Shinobi Headband Metal Plate Accent with 4 corner rivets
export const HeadbandPlate: React.FC<{ 
  title: string; 
  kanji?: string; 
  variant?: 'light' | 'dark';
  className?: string;
}> = ({
  title,
  kanji = "忍",
  variant = 'light',
  className = ''
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`relative inline-flex items-center gap-3 px-4 py-2 border ${isDark ? 'border-[#FAF9F6] bg-[#0A0A0A] text-[#FAF9F6]' : 'border-[#0A0A0A] bg-[#FAF9F6] text-[#0A0A0A]'} font-mono text-xs font-bold uppercase tracking-widest ${className}`}>
      {/* 4 corner rivets */}
      <span className={`absolute top-1 left-1 w-1 h-1 rounded-full ${isDark ? 'bg-[#FAF9F6]' : 'bg-[#0A0A0A]'}`} />
      <span className={`absolute top-1 right-1 w-1 h-1 rounded-full ${isDark ? 'bg-[#FAF9F6]' : 'bg-[#0A0A0A]'}`} />
      <span className={`absolute bottom-1 left-1 w-1 h-1 rounded-full ${isDark ? 'bg-[#FAF9F6]' : 'bg-[#0A0A0A]'}`} />
      <span className={`absolute bottom-1 right-1 w-1 h-1 rounded-full ${isDark ? 'bg-[#FAF9F6]' : 'bg-[#0A0A0A]'}`} />
      
      <span className="text-[#1E40AF] font-black">{kanji}</span>
      <span className="w-1 h-3 bg-[#1E40AF]"></span>
      <span>{title}</span>
    </div>
  );
};

// Rasengan Geometric Concentric Rings (Pure Constructivist 1px lines)
export const RasenganRings: React.FC<{ size?: number; className?: string; stroke?: string }> = ({
  size = 120,
  className = '',
  stroke = '#1E40AF'
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="38" stroke={stroke} strokeWidth="1" />
      <circle cx="50" cy="50" r="26" stroke={stroke} strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="50" cy="50" r="14" stroke={stroke} strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill={stroke} />
      <line x1="50" y1="2" x2="50" y2="98" stroke={stroke} strokeWidth="0.5" strokeOpacity="0.4" />
      <line x1="2" y1="50" x2="98" y2="50" stroke={stroke} strokeWidth="0.5" strokeOpacity="0.4" />
    </svg>
  );
};

// Shuriken Geometric Constructivist Accent
export const ShurikenCross: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = ''
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};
