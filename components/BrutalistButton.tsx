import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark-primary' | 'dark-secondary';
  icon?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  showArrow = true,
  className = '',
  ...props
}) => {
  let variantStyles = '';

  if (variant === 'primary') {
    // Rectangle noir #0A0A0A plein, rayon 6px
    // Hover : fond passe à #1E40AF
    variantStyles = 'bg-[#0A0A0A] text-[#FAF9F6] border border-[#0A0A0A] hover:bg-[#1E40AF] hover:border-[#1E40AF] transition-colors duration-200';
  } else if (variant === 'secondary') {
    // Rectangle blanc #FAF9F6, bordure noir 1px, rayon 6px
    // Texte noir + flèche →, hover = bordure bleue + texte bleu
    variantStyles = 'bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A] hover:border-[#1E40AF] hover:text-[#1E40AF] transition-colors duration-200';
  } else if (variant === 'dark-primary') {
    // Sur section noire
    variantStyles = 'bg-[#FAF9F6] text-[#0A0A0A] border border-[#FAF9F6] hover:bg-[#1E40AF] hover:border-[#1E40AF] hover:text-[#FAF9F6] transition-colors duration-200';
  } else if (variant === 'dark-secondary') {
    variantStyles = 'bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] hover:border-[#60A5FA] hover:text-[#60A5FA] transition-colors duration-200';
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-3 px-6 py-3 rounded-[6px] font-sans font-semibold text-sm tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] disabled:opacity-50 active:translate-y-[1px] ${variantStyles} ${className}`}
      {...props}
    >
      <span className="w-2 h-2 bg-[#1E40AF] shrink-0 inline-block" aria-hidden="true" />
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />}
    </button>
  );
};
