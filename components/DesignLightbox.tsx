import React from 'react';
import { DesignProject } from '../types';
import { X, Calendar, Tag, ExternalLink } from 'lucide-react';

interface DesignLightboxProps {
  design: DesignProject | null;
  onClose: () => void;
}

export const DesignLightbox: React.FC<DesignLightboxProps> = ({ design, onClose }) => {
  if (!design) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF9F6] border-2 border-[#0A0A0A] max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-[8px_8px_0px_0px_#1E40AF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#0A0A0A] bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              [ DESIGN STUDIO // APERÇU HAUTE DÉFINITION ]
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors focus:outline-none"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zone Image Pleine Largeur */}
        <div className="w-full bg-[#0A0A0A] p-2 sm:p-4 flex items-center justify-center border-b border-[#0A0A0A]">
          <img 
            src={design.imageUrl} 
            alt={design.title}
            className="max-h-[55vh] w-auto max-w-full object-contain border border-[#FAF9F6]/20"
          />
        </div>

        {/* Détails et Métadonnées */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#FAF9F6]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0A0A0A]/20 pb-4">
            <div>
              {design.client && (
                <div className="font-mono text-xs text-[#1E40AF] font-bold uppercase tracking-widest mb-1">
                  // {design.client}
                </div>
              )}
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
                {design.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-3 py-1 bg-[#0A0A0A] text-[#FAF9F6] font-bold uppercase flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#60A5FA]" />
                <span>{design.date}</span>
              </span>

              <span className="font-mono text-xs px-3 py-1 bg-[#1E40AF] text-[#FAF9F6] font-bold uppercase tracking-wider">
                {design.typeOfWork}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">
              // NATURE ET OBJECTIFS DU TRAVAIL EFFECTUÉ
            </h4>
            <p className="font-sans text-sm sm:text-base text-[#0A0A0A] leading-relaxed">
              {design.description}
            </p>
          </div>

          {/* Outils */}
          {design.tools && design.tools.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#6B6B6B] mb-2">
                // OUTILS & ENVIRONNEMENT DE CONCEPTION
              </h4>
              <div className="flex flex-wrap gap-2">
                {design.tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 border border-[#0A0A0A] bg-[#FAF9F6] text-[#0A0A0A] font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions bas de modal */}
          <div className="pt-4 border-t border-[#0A0A0A]/20 flex flex-wrap items-center justify-between gap-4">
            {design.demoUrl ? (
              <a
                href={design.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1E40AF] text-[#FAF9F6] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#1E40AF]/90 transition-colors inline-flex items-center gap-2"
              >
                <span>VISITER LE SITE DU PROJET</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="font-mono text-xs text-[#6B6B6B]">
                // MAQUETTE CONCEPTION ORIGINALE GERVAIS AZANGA
              </span>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-[#0A0A0A] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors"
            >
              FERMER L'APERÇU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
