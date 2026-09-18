import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sliders } from 'lucide-react';
import { BrutalistButton } from './BrutalistButton';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenDashboard }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'À PROPOS', id: 'a-propos' },
    { label: 'PRIX', id: 'prix' },
    { label: 'MISSIONS // PROJETS', id: 'projets' },
    { label: 'PARCOURS // ALLIANCES', id: 'parcours' },
    { label: 'JUTSU // STACK', id: 'skills' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F6] border-b border-[#0A0A0A]">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo gauche avec carré bleu 8x8px */}
        <div 
          onClick={() => handleLinkClick('a-propos')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <span className="w-2.5 h-2.5 bg-[#1E40AF] shrink-0 inline-block transition-transform duration-200 group-hover:scale-125" />
          <div className="flex flex-col">
            <span className="font-sans font-black text-base sm:text-lg tracking-tight uppercase text-[#0A0A0A]">
              GERVAIS AZANGA
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#6B6B6B] uppercase flex items-center gap-1.5">
              <span>[ 忍 // TECH LEADER ]</span>
            </span>
          </div>
        </div>

        {/* Liens centrés MAJUSCULES tracking-wide (desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] hover:text-[#1E40AF] transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA noir à droite bordé bleu, rayon 6px */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('contact')}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-[6px] bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] hover:bg-[#1E40AF] transition-colors font-sans text-xs font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
          >
            <span className="w-2 h-2 bg-[#1E40AF] inline-block" />
            <span>CONTACT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 border border-[#0A0A0A] bg-[#FAF9F6] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#0A0A0A] p-6 space-y-4 animate-in fade-in">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B] pb-2 border-b border-[#0A0A0A]">
            // NAVIGATION SHINOBI
          </div>
          <div className="flex flex-col divide-y divide-[#0A0A0A]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="py-3 text-left font-sans font-bold text-base uppercase tracking-tight text-[#0A0A0A] hover:text-[#1E40AF] flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="w-1.5 h-1.5 bg-[#1E40AF]"></span>
              </button>
            ))}
          </div>
          <div className="pt-4">
            <BrutalistButton 
              variant="primary" 
              className="w-full"
              onClick={() => handleLinkClick('contact')}
            >
              CONTACT DIRECT
            </BrutalistButton>
          </div>
        </div>
      )}
    </header>
  );
};
