import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Bot, Terminal } from 'lucide-react';
import { askGervaisBot } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: "Salutations. Je suis l'assistant shinobi IA de Gervais Azanga. Interrogez-moi sur ses réalisations tech, ses distinctions internationales (MedIA) ou ses disponibilités pour vos projets d'élite." 
    }
  ]);
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
    const msg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    const res = await askGervaisBot(msg);
    setMessages(prev => [...prev, { role: 'ai', text: res }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="bg-[#FAF9F6] border-2 border-[#0A0A0A] w-80 sm:w-96 h-[520px] mb-3 flex flex-col pointer-events-auto animate-in slide-in-from-bottom-3 duration-200">
          {/* Header Brutaliste */}
          <div className="bg-[#0A0A0A] text-[#FAF9F6] p-3.5 border-b border-[#0A0A0A] flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#1E40AF] inline-block" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#FAF9F6] flex items-center gap-1.5">
                  <span>G-BOT // SHINOBI TERMINAL</span>
                  <span className="text-[10px] text-[#60A5FA]">v2.4</span>
                </span>
                <span className="text-[9px] font-mono text-[#FAF9F6]/60">ASSISTANT STRATÉGIQUE IA</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#FAF9F6] hover:bg-[#1E40AF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]"
              aria-label="Fermer le terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Sub-bar / Mode status */}
          <div className="bg-[#0A0A0A] px-3.5 py-1 border-b border-[#FAF9F6]/20 flex items-center justify-between text-[10px] font-mono text-[#60A5FA]">
            <span>// STATUS: READY</span>
            <span>MODEL: GEMINI // CHAKRA-ONLINE</span>
          </div>

          {/* Message stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F6] constructivist-grid-bg">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[88%] p-3.5 text-xs font-sans leading-relaxed border ${
                    m.role === 'user' 
                      ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A]' 
                      : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]'
                  }`}
                >
                  <div className="font-mono text-[9px] font-bold tracking-wider mb-1 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 ${m.role === 'user' ? 'bg-[#60A5FA]' : 'bg-[#1E40AF]'}`} />
                    <span className={m.role === 'user' ? 'text-[#60A5FA]' : 'text-[#1E40AF]'}>
                      {m.role === 'user' ? 'REQUÊTE UTILISATEUR' : 'GERVAIS_AI // PROTOCOLE'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#FAF9F6] border border-[#0A0A0A] px-3 py-2 flex items-center gap-2 text-xs font-mono text-[#0A0A0A]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#1E40AF]" />
                  <span>Calcul de la réponse...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Formulaire de saisie */}
          <form onSubmit={handleSend} className="p-2.5 bg-[#FAF9F6] border-t-2 border-[#0A0A0A] flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez une question technique..."
              className="flex-1 px-3 py-2 text-xs font-sans bg-[#FAF9F6] text-[#0A0A0A] border border-[#0A0A0A] focus:outline-none focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] placeholder:text-[#6B6B6B]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-[#0A0A0A] text-[#FAF9F6] border border-[#0A0A0A] hover:bg-[#1E40AF] hover:border-[#1E40AF] transition-colors disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
              aria-label="Envoyer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto h-12 w-12 sm:h-14 sm:w-14 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#0A0A0A] hover:bg-[#1E40AF] hover:border-[#1E40AF] transition-colors rounded-[6px] flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
        aria-label="Ouvrir le terminal IA Gervais"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono text-xs font-bold text-[#60A5FA] group-hover:text-white leading-none">忍</span>
            <Terminal className="h-4 w-4 mt-0.5" />
          </div>
        )}
      </button>
    </div>
  );
};
