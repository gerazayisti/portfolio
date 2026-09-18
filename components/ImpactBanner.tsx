import React from 'react';

interface ImpactBannerProps {
  phrase?: string;
  subphrase?: string;
  kanjiStamp?: string;
}

export const ImpactBanner: React.FC<ImpactBannerProps> = ({
  phrase = "volonté_du_feu ▸ code_absolu",
  subphrase = "ARCHITECTURAL RIGOR // SHINOBI DISCIPLINE // LEADER DE LA NOUVELLE VAGUE TECH",
  kanjiStamp = "志" // Ambition / Will of Fire
}) => {
  return (
    <section className="relative w-full bg-[#1E40AF] text-[#FAF9F6] border-y border-[#0A0A0A] overflow-hidden py-8 md:py-10">
      {/* Constructivist geometric background elements */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-15 flex items-center justify-between px-6">
        <div className="font-mono text-9xl font-black tracking-tighter text-[#FAF9F6] transform -rotate-6">
          {kanjiStamp}
        </div>
        <div className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest text-[#FAF9F6]">
          <span>// JUTSU_ENGINE: ACTIVE</span>
          <span>// CHAKRA_FLOW: 100%</span>
          <span>// LATITUDE: +3.8480 YAOUNDÉ</span>
          <div className="w-16 h-16 border border-[#FAF9F6] grid grid-cols-2 p-1">
            <div className="bg-[#FAF9F6]/40 m-0.5"></div>
            <div className="m-0.5"></div>
            <div className="m-0.5"></div>
            <div className="bg-[#FAF9F6]/40 m-0.5"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#FAF9F6] inline-block" />
              <span>{subphrase}</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight uppercase leading-none">
              {phrase}
            </h2>
          </div>
          
          <div className="hidden md:flex flex-col items-end text-right font-mono text-xs text-[#FAF9F6]/80 border-l border-[#FAF9F6]/30 pl-6 shrink-0">
            <span className="font-bold text-[#FAF9F6] tracking-widest">[ S-RANK COGNITION ]</span>
            <span className="text-[11px] text-[#60A5FA]">NUMERID × MED-IA × NASA GDG</span>
            <span className="text-[10px] opacity-75 mt-1 font-mono">KONOHA CODE STANDARD v4.2</span>
          </div>
        </div>
      </div>
    </section>
  );
};
