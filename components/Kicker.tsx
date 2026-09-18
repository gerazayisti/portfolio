import React from 'react';

interface KickerProps {
  text: string;
  kanji?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export const Kicker: React.FC<KickerProps> = ({ 
  text, 
  kanji, 
  variant = 'light',
  className = '' 
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-[#FAF9F6]' : 'text-[#0A0A0A]'} ${className}`}>
      <span className="w-2 h-2 bg-[#1E40AF] shrink-0 inline-block" aria-hidden="true" />
      <span>{text}</span>
      {kanji && (
        <span className={`px-1.5 py-0.5 border text-[10px] font-bold ${isDark ? 'border-[#FAF9F6]/40 text-[#60A5FA]' : 'border-[#0A0A0A] text-[#1E40AF]'}`}>
          {kanji}
        </span>
      )}
    </div>
  );
};
