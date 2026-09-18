import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onTriggerMasterAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onTriggerMasterAdmin }) => {
  return (
    <footer className="w-full bg-[#FAF9F6] border-t-2 border-[#0A0A0A]">
      <div className="container mx-auto px-6 py-16">
        {/* 3 colonnes encadrées côte à côte par bordures noires */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#0A0A0A] divide-y md:divide-y-0 md:divide-x divide-[#0A0A0A] bg-[#FAF9F6]">
          {/* Colonne 1 : Identité & Philosophie */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A]">
                  GERVAIS AZANGA
                </span>
              </div>
              <h4 className="font-sans text-xl font-bold text-[#0A0A0A] mb-3">
                gervais_azanga
              </h4>
              <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                Tech Leader, Architecte Logiciel & Ingénieur IA. Concepteur de solutions critiques liant rigueur constructive, intuition business et impact concret sur le terrain.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#0A0A0A]/20 font-mono text-[10px] text-[#6B6B6B]">
              <span>// BASED IN YAOUNDÉ, CAMEROON</span><br />
              <span>// AFFILIATIONS: NASA SPACE APPS × GDG</span>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="p-6 space-y-4">
            <h4 className="font-sans text-sm font-semibold lowercase text-[#0A0A0A] tracking-wider border-b border-[#0A0A0A]/20 pb-2">
              navigation
            </h4>
            <ul className="space-y-3 font-sans text-xs text-[#0A0A0A]">
              <li>
                <button
                  onClick={() => onNavigate('a-propos')}
                  className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                  <span>à propos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prix')}
                  className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                  <span>palmarès & prix</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projets')}
                  className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                  <span>missions & projets</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('parcours')}
                  className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                  <span>parcours pro</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors"
                >
                  <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                  <span>jutsu & tech matrix</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Réseaux & Alliances */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="font-sans text-sm font-semibold lowercase text-[#0A0A0A] tracking-wider border-b border-[#0A0A0A]/20 pb-2">
                alliances & contact
              </h4>
              <ul className="space-y-3 font-sans text-xs text-[#0A0A0A]">
                <li>
                  <a
                    href="https://cm.linkedin.com/in/gervais-azanga-ayissi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors group"
                  >
                    <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                    <span>linkedin</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gerazayisti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors group"
                  >
                    <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                    <span>github</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:gerazayisti@gmail.com"
                    className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors group"
                  >
                    <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                    <span>email direct</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/237695183768"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-[#1E40AF] transition-colors group"
                  >
                    <span className="w-2 h-2 bg-[#1E40AF] shrink-0" />
                    <span>whatsapp rapide</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[#0A0A0A]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={onTriggerMasterAdmin}
                className="font-mono text-2xl font-black text-[#1E40AF] hover:scale-110 transition-transform cursor-pointer focus:outline-none"
                aria-label="Sceau Shinobi"
                title="Sceau Shinobi"
              >
                忍
              </button>
              <span className="font-mono text-[10px] text-[#6B6B6B]">
                © {new Date().getFullYear()} GERVAIS AZANGA
              </span>
            </div>
          </div>
        </div>

        {/* Barre basse */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-[#6B6B6B] gap-4">
          <p>
            BRUTALISME CONSTRUCTIVISTE BLEU × NARUTO SHIPPUDEN MANGA SYSTEM
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1E40AF]" />
            <span>EXCELLENCE TECHNIQUE & DESIGN D'ÉLITE</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
