import React from 'react';
import { DesignProject } from '../types';
import { Calendar, Tag, Maximize2, ExternalLink } from 'lucide-react';

interface DesignCardProps {
  design: DesignProject;
  onOpenLightbox: (design: DesignProject) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, onOpenLightbox }) => {
  return (
    <div 
      className="group border border-[#0A0A0A] bg-[#FAF9F6] flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_#1E40AF] transition-all duration-200 relative"
    >
      {/* Zone Image avec overlay cliquable */}
      <div 
        onClick={() => onOpenLightbox(design)}
        className="relative h-60 w-full overflow-hidden border-b border-[#0A0A0A] bg-[#0A0A0A]/5 cursor-pointer"
      >
        <img 
          src={design.imageUrl} 
          alt={design.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badge Date flottant en haut à gauche */}
        <div className="absolute top-3 left-3 bg-[#0A0A0A] text-[#FAF9F6] border border-[#0A0A0A] px-2.5 py-1 font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
          <Calendar className="w-3 h-3 text-[#60A5FA]" />
          <span>{design.date}</span>
        </div>

        {/* Badge Type de Travail flottant en haut à droite */}
        <div className="absolute top-3 right-3 bg-[#1E40AF] text-[#FAF9F6] px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase shadow-sm">
          {design.typeOfWork}
        </div>

        {/* Hover overlay avec icône zoom */}
        <div className="absolute inset-0 bg-[#0A0A0A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0A0A0A]">
            <Maximize2 className="w-3.5 h-3.5 text-[#1E40AF]" />
            <span>AFFICHER LE DESIGN</span>
          </span>
        </div>
      </div>

      {/* Contenu textuel */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {design.client && (
            <div className="font-mono text-xs text-[#1E40AF] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#1E40AF]" />
              <span>{design.client}</span>
            </div>
          )}

          <h3 className="font-sans text-xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#1E40AF] transition-colors">
            {design.title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#6B6B6B] mt-2 leading-relaxed line-clamp-3">
            {design.description}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-[#0A0A0A]/15">
          {/* Tags d'outils */}
          {design.tools && design.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {design.tools.map((tool, tIdx) => (
                <span 
                  key={tIdx}
                  className="font-mono text-[10px] px-2 py-0.5 border border-[#0A0A0A]/20 bg-[#0A0A0A]/5 text-[#0A0A0A]"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onOpenLightbox(design)}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0A0A0A] hover:text-[#1E40AF] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span>DÉTAILS DU DESIGN</span>
            </button>

            {design.demoUrl && (
              <a
                href={design.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#1E40AF] hover:underline"
              >
                <span>LIEN LIVE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
