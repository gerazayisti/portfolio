import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/next";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink,
  Trophy, 
  Medal, 
  ArrowUpRight,
  Code,
  Smartphone,
  CheckCircle2,
  Send,
  MessageSquare,
  Globe,
  Award,
  Layers,
  Cpu,
  BookmarkCheck,
  Code2,
  Palette,
  Sliders,
  Plus,
  Phone,
  CheckCircle,
  Camera,
  UploadCloud
} from 'lucide-react';
import { AWARDS, EDUCATION, SKILLS, CERTIFICATIONS, VOLUNTEER_WORK } from './constants';
import { Project, DesignProject, Experience, ProfileInfo } from './types';
import { 
  getAllCodeProjects, 
  getAllDesigns, 
  getAllExperiences, 
  getProfileInfo, 
  saveProfileInfo,
  saveClientMessage 
} from './services/storageService';
import { Kicker } from './components/Kicker';
import { BrutalistButton } from './components/BrutalistButton';
import { Navbar } from './components/Navbar';
import { ImpactBanner } from './components/ImpactBanner';
import { ProjectCard } from './components/ProjectCard';
import { DesignCard } from './components/DesignCard';
import { DesignLightbox } from './components/DesignLightbox';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { SectionWatermark, HeadbandPlate, RasenganRings, ShurikenCross } from './components/MangaGraphics';

export default function App() {
  // Données dynamiques du portfolio administrables
  const [codeProjectsList, setCodeProjectsList] = useState<Project[]>([]);
  const [designsList, setDesignsList] = useState<DesignProject[]>([]);
  const [experiencesList, setExperiencesList] = useState<Experience[]>([]);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(getProfileInfo());

  // Image principale du Hero (GETEC 2026 / Gestock+ 20260626_125901.jpg)
  const FALLBACK_AVATAR = "/gervais-azanga-fallback.jpg";
  const [heroImageSrc, setHeroImageSrc] = useState<string>(
    profileInfo.heroImageUrl || "/20260626_125901.jpg"
  );
  const [isPhotoUpdatedNotice, setIsPhotoUpdatedNotice] = useState(false);

  useEffect(() => {
    if (profileInfo.heroImageUrl) {
      setHeroImageSrc(profileInfo.heroImageUrl);
    }
  }, [profileInfo.heroImageUrl]);

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const updated = { ...profileInfo, heroImageUrl: dataUrl };
      saveProfileInfo(updated);
      setProfileInfo(updated);
      setHeroImageSrc(dataUrl);
      setIsPhotoUpdatedNotice(true);
      setTimeout(() => setIsPhotoUpdatedNotice(false), 5000);
    };
    reader.readAsDataURL(file);
  };

  // Navigation et onglets de projets (Code vs Design)
  const [projectsTab, setProjectsTab] = useState<'code' | 'design'>('code');
  const [designFilter, setDesignFilter] = useState<string>('TOUT');
  const [activeDesignLightbox, setActiveDesignLightbox] = useState<DesignProject | null>(null);
  
  // Terminal d'administration Maître (verrouillé et masqué aux clients)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Formulaire de contact avec sauvegarde JSON et transmission WhatsApp
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const refreshPortfolioData = () => {
    setCodeProjectsList(getAllCodeProjects());
    setDesignsList(getAllDesigns());
    setExperiencesList(getAllExperiences());
    setProfileInfo(getProfileInfo());
  };

  useEffect(() => {
    refreshPortfolioData();

    // Raccourci secret pour ouvrir le terminal maître (Ctrl+Shift+G ou Cmd+Shift+G)
    // ainsi que paramètre d'URL direct ?admin=true ou #admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault();
        setIsDashboardOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
      setIsDashboardOpen(true);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Sauvegarde locale en format JSON structuré
    saveClientMessage({
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      subject: contactForm.subject,
      message: contactForm.message
    });

    // 2. Préparation du message WhatsApp enrichi
    const phoneNumber = "237695183768";
    const lines = [
      `Bonjour Gervais,`,
      `Je vous contacte depuis votre portfolio professionnel :`,
      ``,
      `👤 Nom : ${contactForm.name}`,
      contactForm.phone ? `📞 Téléphone / WhatsApp : ${contactForm.phone}` : null,
      contactForm.email ? `✉️ Email : ${contactForm.email}` : null,
      `🎯 Objet : ${contactForm.subject}`,
      ``,
      `📝 Message / Expression des besoins :`,
      `${contactForm.message}`
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(lines);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encoded}`;
    setLastWhatsAppUrl(waUrl);
    setFormSubmitted(true);

    // Ouverture WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0A0A0A] font-sans antialiased overflow-x-hidden selection:bg-[#1E40AF] selection:text-[#FAF9F6]">
      {/* Top Navbar */}
      <Navbar 
        onNavigate={scrollTo} 
      />

      <main className="w-full">
        {/* =========================================================================
            SECTION 01: HERO / PORTRAIT ARCHITECTURAL (Fond Crème #FAF9F6)
           ========================================================================= */}
        <section id="a-propos" className="relative py-16 sm:py-24 md:py-32 border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg">
          <SectionWatermark number="01" color="black" position="top-right" />
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Top Sub-Bar Manga / Koma header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-[#0A0A0A]">
              <div className="flex items-center gap-3">
                <HeadbandPlate title="SHINOBI ARCHITECT // TECH LEADER" kanji="忍" variant="light" />
                <span className="hidden sm:inline-block font-mono text-[11px] text-[#6B6B6B]">
                  [ YAOUNDÉ × LYON // GLOBAL DELIVERY ]
                </span>
              </div>
              <div className="font-mono text-xs font-semibold text-[#0A0A0A] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#1E40AF] inline-block animate-pulse" />
                <span>{profileInfo.availability}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Colonne gauche : Typographie massive, Règle Typo Signature */}
              <div className="lg:col-span-7 space-y-8">
                <Kicker text={profileInfo.kicker} kanji="志" />

                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#0A0A0A] leading-[1.05] uppercase">
                  {profileInfo.headlineH1}
                </h1>

                <p className="font-sans text-base sm:text-lg text-[#6B6B6B] leading-relaxed max-w-2xl whitespace-pre-line">
                  {profileInfo.bioHero}
                </p>

                {/* CTAs Primaires & Secondaires */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <BrutalistButton 
                    variant="primary" 
                    onClick={() => scrollTo('projets')}
                  >
                    EXPLORER LES MISSIONS S-RANK
                  </BrutalistButton>

                  <BrutalistButton 
                    variant="secondary" 
                    icon={<Download className="w-4 h-4" />}
                    onClick={() => scrollTo('contact')}
                  >
                    CONTACTER DIRECTEMENT
                  </BrutalistButton>
                </div>

                {/* KPI Constructivistes / Shinobi Data Matrix */}
                <div className="pt-8 border-t border-[#0A0A0A] grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="border-l-2 border-[#0A0A0A] pl-4">
                    <div className="font-mono text-3xl sm:text-4xl font-black text-[#0A0A0A]">
                      02<span className="text-[#1E40AF]">+</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] mt-1">
                      PRIX CONTINENTAUX IA
                    </div>
                  </div>

                  <div className="border-l-2 border-[#0A0A0A] pl-4">
                    <div className="font-mono text-3xl sm:text-4xl font-black text-[#0A0A0A]">
                      20<span className="text-[#1E40AF]">+</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] mt-1">
                      SOLUTIONS LIVRÉES
                    </div>
                  </div>

                  <div className="border-l-2 border-[#0A0A0A] pl-4 col-span-2 sm:col-span-1">
                    <div className="font-mono text-3xl sm:text-4xl font-black text-[#0A0A0A]">
                      NASA<span className="text-[#1E40AF]">/GDG</span>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#6B6B6B] mt-1">
                      LEADERSHIP COMMUNAUTAIRE
                    </div>
                  </div>
                </div>

                {/* Réseaux rapides */}
                <div className="flex items-center gap-6 pt-2 font-mono text-xs text-[#0A0A0A]">
                  <span className="text-[#6B6B6B] tracking-widest">// ALLIANCES :</span>
                  <a 
                    href="https://github.com/gerazayisti" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#1E40AF] flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4" /> <span>GITHUB</span>
                  </a>
                  <a 
                    href="https://cm.linkedin.com/in/gervais-azanga-ayissi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#1E40AF] flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> <span>LINKEDIN</span>
                  </a>
                </div>
              </div>

              {/* Colonne droite : Portrait Équipe / Hero N&B strict 1px, 0px radius */}
              <div className="lg:col-span-5 relative">
                {/* Cadre de type Manga Koma Panel */}
                <div className="border-2 border-[#0A0A0A] bg-[#FAF9F6] p-4 relative">
                  {/* Filigrane géométrique Rasengan */}
                  <div className="absolute -top-10 -right-10 pointer-events-none opacity-25">
                    <RasenganRings size={160} stroke="#1E40AF" />
                  </div>

                  {/* Image cadre constructiviste 1px, 0px radius */}
                  <div className="relative aspect-[4/5] w-full border border-[#0A0A0A] overflow-hidden bg-[#0A0A0A] group">
                    <img
                      src={heroImageSrc}
                      onError={() => {
                        if (heroImageSrc !== FALLBACK_AVATAR) {
                          setHeroImageSrc(FALLBACK_AVATAR);
                        }
                      }}
                      alt="Gervais Azanga Ayissi"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Corner rivets */}
                    <span className="absolute top-2 left-2 font-mono text-[9px] bg-[#0A0A0A] text-[#FAF9F6] px-2 py-0.5 border border-[#FAF9F6] uppercase tracking-wider">
                      GERVAIS_AZANGA.RAW
                    </span>
                    <span className="absolute bottom-2 right-2 font-mono text-[9px] bg-[#1E40AF] text-[#FAF9F6] px-2 py-0.5 font-bold">
                      忍 S-RANK
                    </span>

                    {/* Contrôle rapide d'importation au survol */}
                    <div className="absolute inset-0 bg-[#0A0A0A]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2 text-center backdrop-blur-[2px]">
                      <span className="font-mono text-[11px] font-bold text-[#FAF9F6] tracking-wider uppercase">
                        PHOTO PRINCIPALE DU PORTFOLIO
                      </span>
                      <label className="cursor-pointer px-4 py-2 bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-[#FAF9F6] font-mono text-xs font-bold uppercase border border-[#FAF9F6] flex items-center gap-2 shadow-[3px_3px_0px_0px_#FAF9F6] transition-transform active:translate-x-0.5 active:translate-y-0.5">
                        <Camera className="w-4 h-4 text-[#FAF9F6]" />
                        <span>CHANGER LA PHOTO PRINCIPALE</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleHeroPhotoUpload}
                        />
                      </label>
                      <span className="font-mono text-[9px] text-[#FAF9F6]/80">
                        Sélectionnez votre fichier 20260626_125901.jpg
                      </span>
                    </div>
                  </div>

                  {/* Notification de mise à jour de photo */}
                  {isPhotoUpdatedNotice && (
                    <div className="mt-2 p-2 bg-[#1E40AF] text-[#FAF9F6] border border-[#0A0A0A] font-mono text-xs flex items-center gap-2 animate-in fade-in">
                      <CheckCircle className="w-4 h-4 text-[#60A5FA] shrink-0" />
                      <span>Photo principale mise à jour avec succès !</span>
                    </div>
                  )}

                  {/* Bouton mobile visible pour importation directe */}
                  <div className="mt-2.5 sm:hidden">
                    <label className="cursor-pointer w-full py-2 bg-[#0A0A0A] text-[#FAF9F6] border border-[#1E40AF] font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#1E40AF]">
                      <Camera className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <span>IMPORTER LA PHOTO (20260626_125901.jpg)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroPhotoUpload}
                      />
                    </label>
                  </div>

                  {/* Nom Poppins 700 + rôle kicker bleu en dessous */}
                  <div className="pt-4 space-y-1">
                    <h3 className="font-sans text-xl font-bold text-[#0A0A0A] tracking-tight uppercase">
                      GERVAIS AZANGA AYISSI
                    </h3>
                    <Kicker text="ENTREPRENEUR TECH // ARCHITECTE LOGICIEL & UI/UX" kanji="術" />
                  </div>

                  {/* Technical Coordinates stamp */}
                  <div className="mt-4 pt-3 border-t border-[#0A0A0A] flex items-center justify-between font-mono text-[10px] text-[#6B6B6B]">
                    <span>SYS: REACT × TS × PYTHON</span>
                    <span>LOC: 3.8480° N, 11.5021° E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BARRE D'IMPACT 1 (Plein Bleu #1E40AF - Typo Blanche XXL Italic)
           ========================================================================= */}
        <ImpactBanner 
          phrase="volonté_du_feu ▸ code_absolu"
          subphrase="RIGUEUR ARCHITECTURALE SUISSE // CODE DE QUALITÉ ABSOLUE"
          kanjiStamp="志"
        />

        {/* =========================================================================
            SECTION 02: PRIX & RECONNAISSANCES (Fond Noir #0A0A0A - Section Inversée)
           ========================================================================= */}
        <section id="prix" className="relative py-20 sm:py-28 md:py-32 bg-[#0A0A0A] text-[#FAF9F6] border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg-dark">
          <SectionWatermark number="02" color="white" position="top-right" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header de section */}
            <div className="mb-16 border-b border-[#FAF9F6]/20 pb-8">
              <Kicker text="PALMARÈS & DISTINCTIONS S-RANK" kanji="賞" variant="dark" />
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FAF9F6] mt-4 uppercase">
                Distinctions africaines & <span className="text-[#60A5FA] italic">impact prouvé</span>.
              </h2>
              <p className="font-sans text-base text-[#FAF9F6]/75 mt-3 max-w-2xl leading-relaxed">
                Reconnaissance continentale récompensant l'innovation technologique de rupture au service de la santé publique et de l'intelligence artificielle.
              </p>
            </div>

            {/* Grille des Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {AWARDS.map((award, idx) => (
                <div 
                  key={idx} 
                  className="border-2 border-[#FAF9F6] bg-[#0A0A0A] p-8 flex flex-col justify-between relative group hover:border-[#60A5FA] transition-colors"
                >
                  <div className="absolute top-4 right-4 font-mono text-xs font-bold text-[#60A5FA] border border-[#60A5FA] px-2.5 py-0.5">
                    {award.date} // {award.category}
                  </div>

                  <div>
                    <div className="w-12 h-12 border border-[#FAF9F6] bg-[#0A0A0A] flex items-center justify-center mb-6 text-[#FAF9F6] group-hover:bg-[#1E40AF] group-hover:border-[#1E40AF] transition-colors">
                      {idx === 0 ? <Trophy className="w-6 h-6" /> : <Medal className="w-6 h-6" />}
                    </div>

                    <div className="font-mono text-[10px] text-[#60A5FA] uppercase tracking-widest mb-1">
                      ▪ DISTINCTION D'HONNEUR 0{idx + 1}
                    </div>

                    <h3 className="font-sans text-2xl font-bold text-[#FAF9F6] tracking-tight mb-4">
                      {award.title}
                    </h3>

                    <p className="font-sans text-sm text-[#FAF9F6]/80 leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#FAF9F6]/20 flex items-center justify-between font-mono text-[11px] text-[#FAF9F6]/60">
                    <span>PROJET : MedIA</span>
                    <span className="text-[#60A5FA] font-bold">1ER RANG CONTINENTAL</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Citations de rigueur constructiviste */}
            <div className="mt-16 p-6 border border-[#FAF9F6]/20 bg-[#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#FAF9F6]/70">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#60A5FA]" />
                <span>E-HEALTH HACKATHON & INNOVATION SUMMIT // VALIDÉ PAR JURY INTERNATIONAL</span>
              </div>
              <span className="text-[#60A5FA] font-bold">[ CERTIFIÉ AUDITÉ ]</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: PROJETS & MISSIONS S-RANK (Fond Crème #FAF9F6)
           ========================================================================= */}
        <section id="projets" className="relative py-20 sm:py-28 md:py-32 bg-[#FAF9F6] border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg">
          <SectionWatermark number="03" color="black" position="top-right" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header de section avec contrôle segmenté CODE vs DESIGN */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-[#0A0A0A] pb-8">
              <div>
                <Kicker text="PORTFOLIO BICEPHALE // CODE & DESIGN" kanji="術" />
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] mt-4 uppercase">
                  Missions concrètes, <span className="text-[#1E40AF] italic">code & design</span>.
                </h2>
                <p className="font-sans text-base text-[#6B6B6B] mt-3 max-w-2xl leading-relaxed">
                  Une double compétence assumée : découvrez séparément nos architectures logicielles déployées en production et nos maquettes tactiles et designs d'expérience utilisateur.
                </p>
              </div>

              {/* Sélecteur d'onglets (Code vs Design) */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setProjectsTab('code')}
                  className={`px-5 py-3 border-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                    projectsTab === 'code'
                      ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#1E40AF]'
                      : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#0A0A0A]/5'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-[#60A5FA]" />
                  <span>SECTION CODE & SYSTÈMES ({codeProjectsList.length})</span>
                </button>

                <button
                  onClick={() => setProjectsTab('design')}
                  className={`px-5 py-3 border-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all ${
                    projectsTab === 'design'
                      ? 'bg-[#1E40AF] text-[#FAF9F6] border-[#1E40AF] shadow-[4px_4px_0px_0px_#0A0A0A]'
                      : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#0A0A0A]/5'
                  }`}
                >
                  <Palette className="w-4 h-4 text-[#FAF9F6]" />
                  <span>SECTION DESIGN & UI/UX ({designsList.length})</span>
                </button>
              </div>
            </div>

            {/* ==========================================
                SOUS-SECTION A : CODE & SYSTÈMES
               ========================================== */}
            {projectsTab === 'code' && (
              <div className="space-y-12 animate-in fade-in duration-300">
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[#0A0A0A] bg-[#FAF9F6]">
                  <div className="font-mono text-xs text-[#0A0A0A] flex items-center gap-2 font-bold uppercase">
                    <span className="w-2 h-2 bg-[#1E40AF]" />
                    <span>SOLUTIONS LOGICIELLES FULLSTACK, MOBILES & BACKENDS SCALABLES</span>
                  </div>

                  <BrutalistButton 
                    variant="secondary"
                    onClick={() => window.open('https://github.com/gerazayisti', '_blank', 'noopener,noreferrer')}
                  >
                    VOIR TOUS LES DÉPÔTS GITHUB
                  </BrutalistButton>
                </div>

                {/* Grille des Cards Projets Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {codeProjectsList.map((project, idx) => (
                    <ProjectCard 
                      key={idx} 
                      project={project} 
                      index={idx}
                      missionRank={idx === 0 ? 'S-RANK' : 'A-RANK'}
                    />
                  ))}
                </div>

                {/* Banner info bas de section Code */}
                <div className="mt-16 p-6 border border-[#0A0A0A] bg-[#FAF9F6] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#0A0A0A]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#1E40AF]" />
                    <span className="font-bold">TOUS LES CODES SOURCES SONT REVUS SELON LES NORMES STRICTES TYPESCRIPT & PYTHON.</span>
                  </div>
                  <span className="text-[#1E40AF] font-bold">[ 100% PRODUCTION READY ]</span>
                </div>
              </div>
            )}

            {/* ==========================================
                SOUS-SECTION B : DESIGN & PRODUITS
               ========================================== */}
            {projectsTab === 'design' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* Barre de contrôle du studio design */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 border border-[#0A0A0A] bg-[#FAF9F6]">
                  <div>
                    <span className="font-mono text-xs text-[#1E40AF] font-bold uppercase tracking-wider block mb-1">
                      // DIRECTION ARTISTIQUE, MAQUETTES TACTILES & PROTOTYPAGE PRODUIT
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#6B6B6B]">
                      Cliquez sur une maquette pour l'afficher en haute résolution avec la date et les détails de conception.
                    </p>
                  </div>
                </div>

                {/* Filtres thématiques de design */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#6B6B6B] uppercase mr-2 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" /> FILTRER :
                  </span>
                  {['TOUT', 'Mobile', 'Système', 'E-Commerce', 'Brutalisme', 'HealthTech'].map((filt) => (
                    <button
                      key={filt}
                      onClick={() => setDesignFilter(filt)}
                      className={`font-mono text-xs px-3 py-1 border transition-colors ${
                        designFilter === filt
                          ? 'bg-[#1E40AF] text-[#FAF9F6] border-[#1E40AF] font-bold'
                          : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]/30 hover:border-[#0A0A0A]'
                      }`}
                    >
                      {filt}
                    </button>
                  ))}
                </div>

                {/* Grille des Designs */}
                {(() => {
                  const filteredDesigns = designsList.filter((d) => {
                    if (designFilter === 'TOUT') return true;
                    const search = designFilter.toLowerCase();
                    return (
                      d.typeOfWork.toLowerCase().includes(search) ||
                      d.title.toLowerCase().includes(search) ||
                      (d.tools && d.tools.some(t => t.toLowerCase().includes(search)))
                    );
                  });

                  if (filteredDesigns.length === 0) {
                    return (
                      <div className="p-16 border border-dashed border-[#0A0A0A] text-center bg-[#FAF9F6] space-y-4">
                        <Palette className="w-10 h-10 text-[#1E40AF] mx-auto opacity-50" />
                        <h4 className="font-sans text-lg font-bold text-[#0A0A0A]">
                          Aucun projet de design dans cette catégorie.
                        </h4>
                        <p className="font-sans text-sm text-[#6B6B6B] max-w-md mx-auto">
                          Sélectionnez une autre catégorie de filtre pour découvrir les maquettes d'interface et d'expérience produit.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredDesigns.map((design) => (
                        <DesignCard 
                          key={design.id} 
                          design={design} 
                          onOpenLightbox={(d) => setActiveDesignLightbox(d)} 
                        />
                      ))}
                    </div>
                  );
                })()}

                {/* Banner bas de section Design */}
                <div className="mt-16 p-6 border border-[#0A0A0A] bg-[#FAF9F6] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#0A0A0A]">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#1E40AF]" />
                    <span className="font-bold">DESIGN SYSTÈMES RIGOUROUX ET ADAPTÉS AUX CONTRAINTES MOBILES EN AFRIQUE ET À L'INTERNATIONAL.</span>
                  </div>
                  <span className="text-[#1E40AF] font-bold">[ ERGONOMIE CENTRÉE USAGER ]</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            BARRE D'IMPACT 2 (Plein Bleu #1E40AF - Typo Blanche XXL Italic)
           ========================================================================= */}
        <ImpactBanner 
          phrase="vision_business ▸ solutions_utilisateurs"
          subphrase="INTUITION ENTREPRENEURIALE // COMPRÉHENSION IMMÉDIATE // LIVRAISON ULTRA-RAPIDE"
          kanjiStamp="術"
        />

        {/* =========================================================================
            SECTION 04: PARCOURS & ALLIANCES (Fond Noir #0A0A0A - Section Inversée)
           ========================================================================= */}
        <section id="parcours" className="relative py-20 sm:py-28 md:py-32 bg-[#0A0A0A] text-[#FAF9F6] border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg-dark">
          <SectionWatermark number="04" color="white" position="top-right" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header de section */}
            <div className="mb-16 border-b border-[#FAF9F6]/20 pb-8">
              <Kicker text="PARCOURS PROFESSIONNEL & ALLIANCES" kanji="歴" variant="dark" />
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FAF9F6] mt-4 uppercase">
                Trajectoire pro & <span className="text-[#60A5FA] italic">leadership stratégique</span>.
              </h2>
              <p className="font-sans text-base text-[#FAF9F6]/75 mt-3 max-w-2xl leading-relaxed">
                Une progression forgée entre conseil stratégique national pour l'éducation (CAMEDU), directions de l'information, design mobile international et coordination de communautés technologiques mondiales (NASA, Google).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Colonne gauche : Timeline des expériences (8 colonnes) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="font-mono text-xs uppercase tracking-widest text-[#60A5FA] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#60A5FA]" />
                  <span>// REGISTRE DES POSTES & RESPONSABILITÉS</span>
                </div>

                <div className="space-y-6">
                  {experiencesList.map((exp, idx) => (
                    <div 
                      key={idx} 
                      className="border border-[#FAF9F6]/30 bg-[#0A0A0A] p-6 hover:border-[#60A5FA] transition-colors relative"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-[#60A5FA] uppercase tracking-wider">
                          {exp.period} // {exp.type}
                        </span>
                        <span className="font-mono text-xs text-[#FAF9F6]/60 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#60A5FA]" /> {exp.location}
                        </span>
                      </div>

                      <h3 className="font-sans text-2xl font-bold text-[#FAF9F6] tracking-tight mb-1">
                        {exp.role} <span className="text-[#60A5FA]">@ {exp.company}</span>
                      </h3>

                      <p className="font-sans text-sm text-[#FAF9F6]/80 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {exp.tasks && exp.tasks.length > 0 && (
                        <div className="pt-3 border-t border-[#FAF9F6]/10">
                          <ul className="space-y-2">
                            {exp.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="font-mono text-xs text-[#FAF9F6]/70 flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 bg-[#60A5FA] shrink-0 mt-1.5" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite : Volontariat, NASA & Communautés (4 colonnes) */}
              <div className="lg:col-span-4 space-y-8">
                <div className="border-2 border-[#60A5FA] p-6 bg-[#0A0A0A] space-y-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#60A5FA] flex items-center gap-2 border-b border-[#FAF9F6]/20 pb-3">
                    <span className="w-2 h-2 bg-[#60A5FA]" />
                    <span>ALLIANCES & GUILDES TECH</span>
                  </div>

                  <p className="font-sans text-xs text-[#FAF9F6]/80 leading-relaxed">
                    Engagement actif dans la transmission de la connaissance et l'organisation des plus grands rassemblements développeurs en Afrique centrale.
                  </p>

                  <div className="divide-y divide-[#FAF9F6]/15">
                    {VOLUNTEER_WORK.map((vol, vIdx) => (
                      <div key={vIdx} className="py-3 flex flex-col justify-between">
                        <span className="font-sans text-sm font-bold text-[#FAF9F6]">
                          {vol.role}
                        </span>
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#60A5FA] mt-0.5">
                          <span>{vol.organization}</span>
                          <span className="text-[#FAF9F6]/50">{vol.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#FAF9F6]/20 font-mono text-[10px] text-[#FAF9F6]/60">
                    // VOLONTÉ DU FEU TRANSMIS AUX NOUVELLES GÉNÉRATIONS
                  </div>
                </div>

                {/* Bloc Éducation */}
                <div className="border border-[#FAF9F6]/30 p-6 bg-[#0A0A0A] space-y-4">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#FAF9F6] flex items-center gap-2 border-b border-[#FAF9F6]/20 pb-3">
                    <span className="w-2 h-2 bg-[#1E40AF]" />
                    <span>FORMATION UNIVERSITAIRE</span>
                  </div>

                  {EDUCATION.map((edu, eIdx) => (
                    <div key={eIdx} className="space-y-1">
                      <div className="font-sans text-base font-bold text-[#FAF9F6]">
                        {edu.degree}
                      </div>
                      <div className="font-mono text-xs text-[#60A5FA]">
                        {edu.school} // {edu.period}
                      </div>
                      {edu.description && (
                        <p className="font-sans text-xs text-[#FAF9F6]/70">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: JUTSU & TECH MATRIX (Fond Crème #FAF9F6)
           ========================================================================= */}
        <section id="skills" className="relative py-20 sm:py-28 md:py-32 bg-[#FAF9F6] border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg">
          <SectionWatermark number="05" color="black" position="top-right" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header de section */}
            <div className="mb-16 border-b border-[#0A0A0A] pb-8">
              <Kicker text="ARSENAL TECHNIQUE & JUTSU" kanji="術" />
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] mt-4 uppercase">
                Maîtrise technique & <span className="text-[#1E40AF] italic">arsenal jutsu</span>.
              </h2>
              <p className="font-sans text-base text-[#6B6B6B] mt-3 max-w-2xl leading-relaxed">
                Une panoplie complète de compétences : de la data science avancée et vision par ordinateur jusqu'aux frameworks web et au design d'interfaces utilisateur haut de gamme.
              </p>
            </div>

            {/* 12-col modular constructivist grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Carte 1 : Frameworks & Langages (dont Rasengan.js !) */}
              <div className="border border-[#0A0A0A] bg-[#FAF9F6] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0A0A0A]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#1E40AF]" />
                      LANGAGES & FRAMEWORKS
                    </span>
                    <span className="font-mono text-[10px] bg-[#0A0A0A] text-[#FAF9F6] px-1.5 py-0.5">
                      CORE
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#6B6B6B] mb-4">
                    Architectures réactives, typage strict et micro-frameworks performants :
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[...SKILLS.languages, ...SKILLS.frameworks].map((tech) => (
                      <span
                        key={tech}
                        className={`font-mono text-xs font-semibold px-2.5 py-1 border ${
                          tech === 'Rasengan.js' 
                            ? 'bg-[#1E40AF] text-[#FAF9F6] border-[#1E40AF]' 
                            : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-[#0A0A0A]/20 font-mono text-[10px] text-[#6B6B6B]">
                  // COMPATIBILITÉ TS STRICTE + SSR ACCÉLÉRÉ
                </div>
              </div>

              {/* Carte 2 : Data Science & Intelligence Artificielle */}
              <div className="border border-[#0A0A0A] bg-[#FAF9F6] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0A0A0A]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#1E40AF]" />
                      IA & DATA SCIENCE
                    </span>
                    <span className="font-mono text-[10px] bg-[#0A0A0A] text-[#FAF9F6] px-1.5 py-0.5">
                      DEEP
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#6B6B6B] mb-4">
                    Modélisation prédictive, vision par ordinateur et pipelines LLM :
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {SKILLS.dataAI.map((aiSkill) => (
                      <span
                        key={aiSkill}
                        className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A]"
                      >
                        {aiSkill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-[#0A0A0A]/20 font-mono text-[10px] text-[#6B6B6B]">
                  // RECONNAISSANCE D'IMAGES & MODÈLES BIOMÉDICAUX
                </div>
              </div>

              {/* Carte 3 : Outils Design & Prototypage */}
              <div className="border border-[#0A0A0A] bg-[#FAF9F6] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0A0A0A]">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#1E40AF]" />
                      DESIGN & STRATÉGIE
                    </span>
                    <span className="font-mono text-[10px] bg-[#0A0A0A] text-[#FAF9F6] px-1.5 py-0.5">
                      UX/UI
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#6B6B6B] mb-4">
                    Conception de design systems sans faille, maquettage haute fidélité :
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[...SKILLS.tools, ...SKILLS.expertise].map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-[#0A0A0A]/20 font-mono text-[10px] text-[#6B6B6B]">
                  // PROTOCOLES FIGMA & ARCHITECTURE DES COMPOSANTS
                </div>
              </div>
            </div>

            {/* Certifications professionnelles (Bordures 1px strictes, 0px radius) */}
            <div className="mt-16">
              <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-4 mb-6">
                <h3 className="font-sans text-xl font-bold uppercase text-[#0A0A0A] flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-[#1E40AF]" />
                  CERTIFICATIONS OFFICIELLES
                </h3>
                <span className="font-mono text-xs text-[#6B6B6B]">
                  GOOGLE × WORLDQUANT × MTF × DATACAMP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="border border-[#0A0A0A] bg-[#FAF9F6] p-4 flex items-center justify-between group hover:border-[#1E40AF] transition-colors"
                  >
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#0A0A0A] group-hover:text-[#1E40AF] transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-[#6B6B6B]">
                        {cert.issuer}
                      </p>
                    </div>

                    {cert.status ? (
                      <span className="font-mono text-[10px] font-bold border border-[#0A0A0A] px-2 py-0.5 bg-[#FAF9F6] text-[#1E40AF]">
                        {cert.status}
                      </span>
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#1E40AF] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: CONTACT DIRECT (Fond Noir #0A0A0A - Section Inversée)
           ========================================================================= */}
        <section id="contact" className="relative py-20 sm:py-28 md:py-32 bg-[#0A0A0A] text-[#FAF9F6] border-b border-[#0A0A0A] overflow-hidden constructivist-grid-bg-dark">
          <SectionWatermark number="06" color="white" position="top-right" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Header de section */}
              <div className="text-center mb-16 border-b border-[#FAF9F6]/20 pb-8">
                <Kicker text="COLLABORATION & TRANSMISSION DE MISSION" kanji="連" variant="dark" />
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FAF9F6] mt-4 uppercase">
                  Activez votre vision avec <span className="text-[#60A5FA] italic">rigueur absolue</span>.
                </h2>
                <p className="font-sans text-base text-[#FAF9F6]/75 mt-3 max-w-2xl mx-auto leading-relaxed">
                  Prêt à concevoir un produit d'élite, à auditer votre architecture ou à structurer vos modèles IA ? Contact direct et réactif.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                {/* Coordonnées directes (5 colonnes) */}
                <div className="md:col-span-5 space-y-8">
                  <div className="border border-[#FAF9F6]/30 p-6 bg-[#0A0A0A] space-y-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#60A5FA] flex items-center gap-2 border-b border-[#FAF9F6]/20 pb-2">
                      <span className="w-2 h-2 bg-[#60A5FA]" />
                      <span>CANAUX DIRECTS</span>
                    </div>

                    <a 
                      href={`mailto:${profileInfo.email}`} 
                      className="flex items-center gap-3 text-base font-bold text-[#FAF9F6] hover:text-[#60A5FA] transition-colors py-2 border-b border-[#FAF9F6]/10"
                    >
                      <Mail className="w-5 h-5 text-[#60A5FA] shrink-0" />
                      <span className="font-mono text-sm">{profileInfo.email}</span>
                    </a>

                    <a 
                      href={`https://wa.me/${profileInfo.whatsappNumber}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-base font-bold text-[#FAF9F6] hover:text-[#60A5FA] transition-colors py-2 border-b border-[#FAF9F6]/10"
                    >
                      <MessageSquare className="w-5 h-5 text-[#60A5FA] shrink-0" />
                      <span className="font-mono text-sm">{profileInfo.phone}</span>
                    </a>

                    <div className="pt-2 font-mono text-xs text-[#FAF9F6]/60">
                      // RÉPONSE EN MOINS DE 24 HEURES ASSURÉE
                    </div>
                  </div>

                  <div className="border border-[#FAF9F6]/30 p-6 bg-[#0A0A0A] space-y-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#60A5FA] flex items-center gap-2 border-b border-[#FAF9F6]/20 pb-2">
                      <span className="w-2 h-2 bg-[#60A5FA]" />
                      <span>RÉSEAUX PROFESSIONNELS</span>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href="https://cm.linkedin.com/in/gervais-azanga-ayissi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-[#FAF9F6] font-mono text-xs font-bold text-[#FAF9F6] hover:bg-[#1E40AF] hover:border-[#1E40AF] transition-colors flex items-center gap-2 rounded-[6px]"
                      >
                        <Linkedin className="w-4 h-4" /> LINKEDIN
                      </a>

                      <a
                        href="https://github.com/gerazayisti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-[#FAF9F6] font-mono text-xs font-bold text-[#FAF9F6] hover:bg-[#1E40AF] hover:border-[#1E40AF] transition-colors flex items-center gap-2 rounded-[6px]"
                      >
                        <Github className="w-4 h-4" /> GITHUB
                      </a>
                    </div>
                  </div>
                </div>

                {/* Formulaire WhatsApp direct & Enregistrement JSON (7 colonnes) */}
                <div className="md:col-span-7">
                  {formSubmitted ? (
                    <div className="border-2 border-[#60A5FA] p-8 bg-[#0A0A0A] space-y-6 animate-in fade-in">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-[#60A5FA]" />
                        <div>
                          <h3 className="font-sans text-xl font-bold text-[#FAF9F6] tracking-tight">
                            Message Enregistré & Transmis !
                          </h3>
                          <span className="font-mono text-xs text-[#60A5FA] uppercase font-semibold">
                            [ CONSERVATION SÉCURISÉE EN FORMAT JSON & WHATSAPP ]
                          </span>
                        </div>
                      </div>

                      <p className="font-sans text-sm text-[#FAF9F6]/80 leading-relaxed">
                        Votre demande a été structurée en format JSON dans notre boîte de réception locale et la fenêtre de discussion WhatsApp avec <strong className="text-[#FAF9F6]">Gervais Azanga (+237 695 18 37 68)</strong> a été initiée.
                      </p>

                      <div className="pt-4 border-t border-[#FAF9F6]/20 flex flex-wrap gap-4">
                        {lastWhatsAppUrl && (
                          <a
                            href={lastWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-[#25D366] text-[#0A0A0A] font-sans text-xs font-black uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors inline-flex items-center gap-2 border border-[#FAF9F6]"
                          >
                            <MessageSquare className="w-4 h-4 fill-current" />
                            <span>RÉOUVRIR LA CONVERSATION WHATSAPP</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setContactForm({
                              name: '',
                              phone: '',
                              email: '',
                              subject: '',
                              message: ''
                            });
                          }}
                          className="px-5 py-3 border border-[#FAF9F6] text-[#FAF9F6] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#0A0A0A] transition-colors"
                        >
                          ENVOYER UN AUTRE MESSAGE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form 
                      onSubmit={handleContactSubmit} 
                      className="border-2 border-[#FAF9F6] p-8 bg-[#0A0A0A] space-y-6"
                    >
                      <div className="font-mono text-xs uppercase tracking-widest text-[#60A5FA] flex items-center justify-between border-b border-[#FAF9F6]/20 pb-3">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#60A5FA]" />
                          <span>TRANSMISSION DIRECTE WHATSAPP // ARCHIVAGE JSON</span>
                        </span>
                        <span>[ SÉCURITÉ CLIENT ]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase tracking-wider text-[#FAF9F6]">
                            VOTRE NOM // ORGANISATION *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Ex: Jean Dupont (Studio / Entreprise)"
                            className="w-full bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#60A5FA] placeholder:text-[#FAF9F6]/40"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase tracking-wider text-[#FAF9F6]">
                            TÉLÉPHONE / WHATSAPP *
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="Ex: +237 6XX XX XX XX"
                            className="w-full bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#60A5FA] placeholder:text-[#FAF9F6]/40"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase tracking-wider text-[#FAF9F6]">
                            EMAIL (OPTIONNEL)
                          </label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="nom@entreprise.com"
                            className="w-full bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#60A5FA] placeholder:text-[#FAF9F6]/40"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs uppercase tracking-wider text-[#FAF9F6]">
                            OBJET DU PROJET *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            placeholder="Ex: Application Mobile, Refonte UI, Caisse POS"
                            className="w-full bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#60A5FA] placeholder:text-[#FAF9F6]/40"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs uppercase tracking-wider text-[#FAF9F6]">
                          MESSAGE / CAHIER DES CHARGES *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Détaillez vos objectifs, fonctionnalités attendues ou délais de livraison..."
                          className="w-full bg-[#0A0A0A] text-[#FAF9F6] border border-[#FAF9F6] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#60A5FA] placeholder:text-[#FAF9F6]/40 resize-none"
                        />
                      </div>

                      <div className="font-mono text-[11px] text-[#FAF9F6]/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#60A5FA]" />
                        <span>Ce message est sécurisé en JSON puis transmis instantanément sur WhatsApp.</span>
                      </div>

                      <BrutalistButton
                        type="submit"
                        variant="dark-primary"
                        className="w-full py-4 text-sm font-bold tracking-wider uppercase"
                      >
                        ENVOYER LE MESSAGE (WHATSAPP & JSON)
                      </BrutalistButton>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer 4 Colonnes Strictes avec sceau maître secret */}
      <Footer 
        onNavigate={scrollTo} 
        onTriggerMasterAdmin={() => setIsDashboardOpen(true)}
      />

      {/* Terminal Shinobi IA Gervais */}
      <ChatWidget />

      {/* Lightbox d'inspection haute résolution de design */}
      <DesignLightbox 
        design={activeDesignLightbox} 
        onClose={() => setActiveDesignLightbox(null)} 
      />

      {/* Terminal Maître Sécurisé (Code, Design, Expériences, Profil, Leads JSON & Sécurité) */}
      <AdminDashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
        onDataUpdated={refreshPortfolioData} 
      />
    </div>
  );
}
