import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  Download, 
  ExternalLink,
  Trophy, 
  Medal, 
  Send, 
  Sparkles, 
  Bot,
  CheckCircle2,
  ArrowUpRight,
  Code,
  Smartphone,
  Loader2,
  Globe,
  Heart,
  MessageSquare
} from 'lucide-react';
import { AWARDS, PROJECTS, EXPERIENCES, EDUCATION, SKILLS, CERTIFICATIONS, VOLUNTEER_WORK } from './constants';
import { askGervaisBot } from './services/geminiService';

// --- Composants UI Atomiques ---

const Button = ({ children, variant = "primary", className = "", ...props }: any) => {
  const variants: any = {
    primary: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-200 bg-white hover:bg-neutral-50 text-black",
    ghost: "hover:bg-neutral-100 text-black",
  };
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all h-11 px-6 disabled:opacity-50 ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl mb-3 uppercase">{title}</h2>
    {subtitle && <p className="text-neutral-500 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
    <div className="h-1 w-20 bg-black mt-6"></div>
  </div>
);

// --- Chat IA ---

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: "Bonjour, je suis l'assistant IA de Gervais. Comment puis-je vous renseigner sur son parcours ou ses projets ?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const msg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    const res = await askGervaisBot(msg);
    setMessages(prev => [...prev, { role: 'ai', text: res }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] mb-4 flex flex-col overflow-hidden pointer-events-auto animate-in slide-in-from-bottom-5">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> <span className="text-sm font-bold">G-Assistant</span></div>
            <button onClick={() => setIsOpen(false)}><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-neutral-200 rounded-bl-none shadow-sm text-neutral-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-2 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-black" />
                  <span className="text-xs text-neutral-400">G-Bot réfléchit...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Posez une question..." 
              className="flex-1 px-4 py-2 text-sm bg-neutral-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black" 
            />
            <button type="submit" className="p-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="pointer-events-auto h-14 w-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>
    </div>
  );
};

// --- Application Principale ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', subject: '', message: '' });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "237695183768"; 
    const text = `Bonjour Gervais,\n\nJe suis ${contactForm.name}.\nObjet : ${contactForm.subject}\n\nMessage : ${contactForm.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="h-8 w-8 bg-black text-white flex items-center justify-center rounded">G</div>
            <span className="hidden sm:inline">GERVAIS AZANGA AYISSI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['À propos', 'Prix', 'Projets', 'Parcours'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-').replace('à', 'a'))} 
                className="text-sm font-bold text-neutral-500 hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
            <Button variant="primary" onClick={() => scrollTo('contact')}>Contact</Button>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white p-6 pt-24 animate-in fade-in flex flex-col gap-6">
           <nav className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter">
            {['À propos', 'Prix', 'Projets', 'Parcours', 'Contact'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-').replace('à', 'a'))} 
                className="text-left hover:text-neutral-400"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section id="a-propos" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50 -z-10 skew-x-12 translate-x-20"></div>
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-black uppercase tracking-widest mb-6 border border-neutral-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Disponible pour projets innovants
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
                UI/UX Designer & <br/><span className="text-neutral-400">Front-end Developer.</span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed mb-10 max-w-xl">
                Passionné par la création de solutions numériques innovantes. J'allie créativité et expertise technique pour concevoir des interfaces modernes, performantes et centrées sur l'utilisateur.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="gap-2" onClick={() => scrollTo('projets')}>
                  Voir mes Réalisations <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Télécharger CV
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <a href="https://github.com/gerazayisti" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors"><Github className="h-6 w-6" /></a>
                <a href="https://cm.linkedin.com/in/gervais-azanga-ayissi" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors"><Linkedin className="h-6 w-6" /></a>
                <a href="mailto:gerazayisti@gmail.com" className="text-neutral-400 hover:text-black transition-colors"><Mail className="h-6 w-6" /></a>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square max-w-[450px] mx-auto relative group">
                <div className="absolute inset-0 bg-neutral-100 rounded-3xl -rotate-6 border border-neutral-200 group-hover:rotate-0 transition-transform duration-500"></div>
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4E03AQG3Q7E_9Q_9aw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718222444155?e=1746662400&v=beta&t=M8-9e-R6-v1t9_9t1-S9-v_r_W1-y_R_W1_R_W1_R_W1" 
                  className="relative z-10 w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white" 
                  alt="Gervais Azanga Ayissi" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="prix" className="py-24 bg-white border-y border-neutral-100">
          <div className="container mx-auto px-6">
            <SectionHeading title="Prix & Reconnaissances" subtitle="L'excellence récompensée dans les domaines de l'IA et de l'innovation digitale." />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {AWARDS.map((award, i) => (
                <div key={i} className="group p-8 border border-neutral-100 hover:border-black transition-all duration-500 rounded-2xl bg-neutral-50/50">
                  <div className="h-12 w-12 bg-white border border-neutral-200 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                    {i === 0 ? <Trophy className="h-6 w-6" /> : <Medal className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{award.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">{award.description}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{award.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projets Section */}
        <section id="projets" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <SectionHeading title="Projets & Travaux" subtitle="Des solutions concrètes allant de la HealthTech à la gestion EdTech." />
              <div className="flex gap-2">
                <Button variant="outline" className="h-10 px-4 text-xs" onClick={() => window.open('https://github.com/gerazayisti', '_blank')}>Voir sur GitHub</Button>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <div key={i} className="group border border-neutral-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700">
                  <div className="aspect-video relative overflow-hidden bg-neutral-100">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-neutral-200 rounded text-[10px] font-black uppercase tracking-widest">{project.impact}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 rounded-lg hover:bg-black hover:text-white transition-all">
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-neutral-200 rounded-lg hover:bg-black hover:text-white transition-all">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-neutral-500 text-sm mb-6 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-neutral-50 border border-neutral-100 rounded text-[9px] font-bold text-neutral-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="parcours" className="py-24 bg-neutral-50 border-y border-neutral-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <SectionHeading title="Expérience & Parcours" subtitle="Mon parcours professionnel entre entrepreneuriat, consulting et design." />
            <div className="relative border-l-2 border-neutral-200 ml-4 pl-8 space-y-16">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-black shadow-sm"></div>
                  <div className="mb-1 text-sm font-black text-neutral-400 uppercase tracking-widest">{exp.period}</div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <h3 className="text-2xl font-black">{exp.role}</h3>
                    <span className="text-neutral-400 font-bold">@ {exp.company}</span>
                    <span className="px-2 py-1 bg-white border border-neutral-100 rounded text-[10px] font-black uppercase tracking-widest">{exp.type}</span>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed max-w-3xl">{exp.description}</p>
                  {exp.tasks && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {exp.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-neutral-500 flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-300" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="text-xs text-neutral-400 flex items-center gap-1.5"><Globe className="h-3 w-3" /> {exp.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Certs Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <SectionHeading title="Compétences" subtitle="Maîtrise technique et vision stratégique." />
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-400"><Code className="h-4 w-4"/> Langages & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...SKILLS.languages, ...SKILLS.frameworks].map(s => (
                        <span key={s} className="px-3 py-1 bg-black text-white text-[11px] font-bold rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-neutral-400"><Smartphone className="h-4 w-4"/> Design & Outils</h4>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.tools.map(s => (
                        <span key={s} className="px-3 py-1 border border-neutral-200 text-[11px] font-bold rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SectionHeading title="Certifications" subtitle="Apprentissage continu et spécialisations." />
                <div className="grid gap-3">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                      <div>
                        <div className="text-sm font-bold group-hover:text-black transition-colors">{cert.title}</div>
                        <div className="text-xs text-neutral-400">{cert.issuer}</div>
                      </div>
                      {cert.status ? (
                        <span className="text-[10px] font-bold bg-neutral-200 px-2 py-1 rounded uppercase tracking-widest">{cert.status}</span>
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - WhatsApp Redirection */}
        <section id="contact" className="py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {Array.from({length: 12}).map((_, i) => <div key={i} className="border-r border-white"></div>)}
            </div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Prêt à <span className="text-neutral-500">Collaborer ?</span></h2>
                <p className="text-neutral-400 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                  Vous avez un projet en tête ? Contactez-moi directement via WhatsApp pour une réponse rapide.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-2 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500">Contact Direct</h4>
                    <div className="flex flex-col gap-4">
                      <a href="mailto:gerazayisti@gmail.com" className="flex items-center gap-3 text-lg font-bold hover:text-neutral-400 transition-colors">
                        <Mail className="h-5 w-5" /> gerazayisti@gmail.com
                      </a>
                      <div className="flex items-center gap-3 text-lg font-bold">
                        <MessageSquare className="h-5 w-5" /> +237 695 183 768
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500">Social</h4>
                    <div className="flex gap-6">
                      <a href="https://cm.linkedin.com/in/gervais-azanga-ayissi" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors"><Linkedin className="h-8 w-8" /></a>
                      <a href="https://github.com/gerazayisti" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors"><Github className="h-8 w-8" /></a>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-6 bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm shadow-2xl">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Votre Nom</label>
                        <input 
                          required
                          value={contactForm.name}
                          onChange={e => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="Ex: Jean Dupont"
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all placeholder:text-neutral-600" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Objet</label>
                        <input 
                          required
                          value={contactForm.subject}
                          onChange={e => setContactForm({...contactForm, subject: e.target.value})}
                          placeholder="Ex: Projet Mobile"
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all placeholder:text-neutral-600" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Message</label>
                      <textarea 
                        required
                        value={contactForm.message}
                        onChange={e => setContactForm({...contactForm, message: e.target.value})}
                        rows={4}
                        placeholder="Dites-moi tout sur votre projet..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all placeholder:text-neutral-600 resize-none" 
                      />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-neutral-200 text-lg font-black gap-2 transition-transform active:scale-[0.98]">
                      Envoyer sur WhatsApp <MessageSquare className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-100 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-black tracking-tighter uppercase">Gervais Azanga Ayissi</div>
          <p className="text-sm text-neutral-400 font-medium">© {new Date().getFullYear()} Tous droits réservés.</p>
          <div className="flex gap-8 text-sm font-bold text-neutral-400">
            <a href="https://github.com/gerazayisti" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
            <a href="https://cm.linkedin.com/in/gervais-azanga-ayissi" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}