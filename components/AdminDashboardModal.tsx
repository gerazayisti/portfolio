import React, { useState, useEffect, useRef } from 'react';
import { Project, DesignProject, Experience, ProfileInfo, ClientLeadMessage } from '../types';
import { 
  getAllCodeProjects,
  saveAllCodeProjects,
  saveCodeProject,
  deleteCodeProject,
  resetCodeProjects,
  getAllDesigns,
  saveAllDesigns,
  saveCustomDesign,
  deleteCustomDesign,
  resetDesigns,
  getAllExperiences,
  saveAllExperiences,
  saveExperience,
  deleteExperience,
  resetExperiences,
  getProfileInfo,
  saveProfileInfo,
  resetProfileInfo,
  getStoredClientMessages,
  updateClientMessageStatus,
  deleteClientMessage,
  exportMessagesAsJSON,
  buildWhatsAppReplyUrl,
  isMasterAuthenticated,
  loginMaster,
  logoutMaster,
  updateMasterPasscode,
  getMasterPasscode,
  exportFullPortfolioBackup,
  importFullPortfolioBackup,
  resetAllToDefaults
} from '../services/storageService';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  CheckCircle, 
  MessageSquare, 
  Download, 
  Copy, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Sliders, 
  ShieldCheck, 
  Phone, 
  Mail, 
  User, 
  Plus,
  Code2,
  Palette,
  Briefcase,
  KeyRound,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCcw,
  Edit3,
  FileText,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

type TabType = 'code' | 'design' | 'experiences' | 'profile' | 'messages' | 'security';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onDataUpdated
}) => {
  // État d'authentification maître
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Onglet actif
  const [activeTab, setActiveTab] = useState<TabType>('code');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ====================================================
  // ÉTATS DE GESTION DES DONNÉES
  // ====================================================

  // 1. Projets Code
  const [codeProjects, setCodeProjects] = useState<Project[]>([]);
  const [editingCodeIndex, setEditingCodeIndex] = useState<number | null>(null);
  const [codeForm, setCodeForm] = useState<Project>({
    title: '',
    role: '',
    description: '',
    features: [],
    tags: [],
    impact: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: ''
  });
  const [codeFeaturesInput, setCodeFeaturesInput] = useState('');
  const [codeTagsInput, setCodeTagsInput] = useState('');

  // 2. Projets Design
  const [designs, setDesigns] = useState<DesignProject[]>([]);
  const [editingDesignId, setEditingDesignId] = useState<string | null>(null);
  const [designForm, setDesignForm] = useState({
    title: '',
    client: '',
    date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    typeOfWork: 'UI/UX Mobile',
    description: '',
    imageUrl: '',
    tools: 'Figma, Design System',
    demoUrl: ''
  });
  const [designImageMode, setDesignImageMode] = useState<'upload' | 'url'>('upload');
  const [designUploadPreview, setDesignUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 3. Expériences
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExpIndex, setEditingExpIndex] = useState<number | null>(null);
  const [expForm, setExpForm] = useState<Experience>({
    role: '',
    company: '',
    location: 'Yaoundé, Cameroun',
    period: '',
    type: 'Consultant',
    description: '',
    tasks: []
  });
  const [expTasksInput, setExpTasksInput] = useState('');

  // 4. Profil & Coordonnées
  const [profile, setProfile] = useState<ProfileInfo>(getProfileInfo());

  // 5. Messages / Leads
  const [messages, setMessages] = useState<ClientLeadMessage[]>([]);
  const [showRawJSON, setShowRawJSON] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  // 6. Sécurité & Mots de passe
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);

  // ====================================================
  // CHARGEMENT & SYNCHRONISATION
  // ====================================================

  const reloadAllData = () => {
    setCodeProjects(getAllCodeProjects());
    setDesigns(getAllDesigns());
    setExperiences(getAllExperiences());
    setProfile(getProfileInfo());
    setMessages(getStoredClientMessages());
    onDataUpdated();
  };

  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(isMasterAuthenticated());
      reloadAllData();
      setPasscodeError(null);
      setPasscodeInput('');
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Authentification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMaster(passcodeInput)) {
      setIsAuthenticated(true);
      setPasscodeError(null);
      showToast('Accès Maître autorisé. Bienvenue Gervais.');
    } else {
      setPasscodeError('Code d’accès invalide. Vérifiez vos identifiants.');
    }
  };

  const handleLogout = () => {
    logoutMaster();
    setIsAuthenticated(false);
    setPasscodeInput('');
    showToast('Session Maître verrouillée.');
  };

  // ====================================================
  // ACTIONS PROJETS CODE
  // ====================================================

  const handleEditCodeProject = (proj: Project, index: number) => {
    setEditingCodeIndex(index);
    setCodeForm({ ...proj });
    setCodeFeaturesInput((proj.features || []).join('\n'));
    setCodeTagsInput((proj.tags || []).join(', '));
  };

  const handleCancelEditCode = () => {
    setEditingCodeIndex(null);
    setCodeForm({
      title: '',
      role: '',
      description: '',
      features: [],
      tags: [],
      impact: '',
      imageUrl: '',
      githubUrl: '',
      demoUrl: ''
    });
    setCodeFeaturesInput('');
    setCodeTagsInput('');
  };

  const handleSaveCodeProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeForm.title.trim()) return;

    const parsedFeatures = codeFeaturesInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const parsedTags = codeTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectToSave: Project = {
      ...codeForm,
      title: codeForm.title.trim(),
      role: codeForm.role.trim(),
      description: codeForm.description.trim(),
      impact: codeForm.impact.trim(),
      imageUrl: codeForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      features: parsedFeatures.length > 0 ? parsedFeatures : [codeForm.title],
      tags: parsedTags.length > 0 ? parsedTags : ['Architecture', 'Fullstack'],
      githubUrl: codeForm.githubUrl?.trim() || undefined,
      demoUrl: codeForm.demoUrl?.trim() || undefined
    };

    saveCodeProject(projectToSave, editingCodeIndex !== null ? editingCodeIndex : undefined);
    handleCancelEditCode();
    reloadAllData();
    showToast(`Projet code "${projectToSave.title}" enregistré avec succès.`);
  };

  const handleDeleteCodeProject = (index: number, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression du projet code "${title}" ?`)) {
      deleteCodeProject(index);
      if (editingCodeIndex === index) handleCancelEditCode();
      reloadAllData();
      showToast(`Projet "${title}" supprimé.`);
    }
  };

  const handleResetCodeProjects = () => {
    if (window.confirm('Voulez-vous restaurer la liste des projets code d’origine ?')) {
      resetCodeProjects();
      handleCancelEditCode();
      reloadAllData();
      showToast('Projets code réinitialisés aux valeurs initiales.');
    }
  };

  // ====================================================
  // ACTIONS PROJETS DESIGN
  // ====================================================

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDesignUploadPreview(result);
      setDesignForm(prev => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditDesign = (design: DesignProject) => {
    setEditingDesignId(design.id);
    setDesignForm({
      title: design.title,
      client: design.client || '',
      date: design.date,
      typeOfWork: design.typeOfWork,
      description: design.description,
      imageUrl: design.imageUrl,
      tools: (design.tools || []).join(', '),
      demoUrl: design.demoUrl || ''
    });
    setDesignUploadPreview(design.imageUrl);
  };

  const handleCancelEditDesign = () => {
    setEditingDesignId(null);
    setDesignForm({
      title: '',
      client: '',
      date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      typeOfWork: 'UI/UX Mobile',
      description: '',
      imageUrl: '',
      tools: 'Figma, Design System',
      demoUrl: ''
    });
    setDesignUploadPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designForm.title.trim() || !designForm.imageUrl.trim()) {
      alert('Veuillez renseigner au moins le titre et une image.');
      return;
    }

    const toolsArray = designForm.tools
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    saveCustomDesign({
      id: editingDesignId || undefined,
      title: designForm.title.trim(),
      client: designForm.client.trim() || undefined,
      date: designForm.date.trim() || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      typeOfWork: designForm.typeOfWork.trim(),
      description: designForm.description.trim(),
      imageUrl: designForm.imageUrl.trim(),
      tools: toolsArray.length > 0 ? toolsArray : ['Figma', 'UI/UX'],
      demoUrl: designForm.demoUrl.trim() || undefined
    });

    handleCancelEditDesign();
    reloadAllData();
    showToast('Projet design enregistré avec succès.');
  };

  const handleDeleteDesign = (id: string, title: string) => {
    if (window.confirm(`Confirmez-vous la suppression de la maquette "${title}" ?`)) {
      deleteCustomDesign(id);
      if (editingDesignId === id) handleCancelEditDesign();
      reloadAllData();
      showToast(`Maquette "${title}" supprimée.`);
    }
  };

  const handleResetDesigns = () => {
    if (window.confirm('Voulez-vous réinitialiser tous les designs aux valeurs d’origine ?')) {
      resetDesigns();
      handleCancelEditDesign();
      reloadAllData();
      showToast('Designs réinitialisés aux modèles originaux.');
    }
  };

  // ====================================================
  // ACTIONS EXPÉRIENCES
  // ====================================================

  const handleEditExperience = (exp: Experience, index: number) => {
    setEditingExpIndex(index);
    setExpForm({ ...exp });
    setExpTasksInput((exp.tasks || []).join('\n'));
  };

  const handleCancelEditExperience = () => {
    setEditingExpIndex(null);
    setExpForm({
      role: '',
      company: '',
      location: 'Yaoundé, Cameroun',
      period: '',
      type: 'Consultant',
      description: '',
      tasks: []
    });
    setExpTasksInput('');
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role.trim() || !expForm.company.trim()) return;

    const parsedTasks = expTasksInput
      .split('\n')
      .map(t => t.trim())
      .filter(Boolean);

    const expToSave: Experience = {
      ...expForm,
      role: expForm.role.trim(),
      company: expForm.company.trim(),
      location: expForm.location.trim() || 'Yaoundé, Cameroun',
      period: expForm.period.trim(),
      type: expForm.type,
      description: expForm.description.trim(),
      tasks: parsedTasks
    };

    saveExperience(expToSave, editingExpIndex !== null ? editingExpIndex : undefined);
    handleCancelEditExperience();
    reloadAllData();
    showToast(`Expérience chez "${expToSave.company}" enregistrée.`);
  };

  const handleDeleteExperience = (index: number, company: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l’expérience chez "${company}" ?`)) {
      deleteExperience(index);
      if (editingExpIndex === index) handleCancelEditExperience();
      reloadAllData();
      showToast(`Expérience chez "${company}" supprimée.`);
    }
  };

  const handleResetExperiences = () => {
    if (window.confirm('Rétablir la liste des expériences professionnelles d’origine ?')) {
      resetExperiences();
      handleCancelEditExperience();
      reloadAllData();
      showToast('Expériences réinitialisées aux valeurs initiales.');
    }
  };

  // ====================================================
  // ACTIONS PROFIL
  // ====================================================

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfileInfo(profile);
    reloadAllData();
    showToast('Profil et coordonnées mis à jour avec succès sur le portfolio.');
  };

  const handleResetProfile = () => {
    if (window.confirm('Rétablir le profil et la biographie d’origine ?')) {
      resetProfileInfo();
      reloadAllData();
      showToast('Profil réinitialisé aux valeurs initiales.');
    }
  };

  // ====================================================
  // ACTIONS MESSAGES / LEADS
  // ====================================================

  const handleStatusChange = (id: string, status: 'nouveau' | 'contacté' | 'archivé') => {
    updateClientMessageStatus(id, status);
    setMessages(getStoredClientMessages());
    showToast(`Statut mis à jour : ${status.toUpperCase()}`);
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce message ?')) {
      deleteClientMessage(id);
      setMessages(getStoredClientMessages());
      showToast('Message archivé/supprimé.');
    }
  };

  const handleCopyRawJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(messages, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  // ====================================================
  // ACTIONS SÉCURITÉ & BACKUP
  // ====================================================

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasscode.trim().length < 4) {
      alert('Le mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    if (updateMasterPasscode(newPasscode)) {
      setPasscodeSuccess(true);
      setNewPasscode('');
      showToast('Code d’accès Maître modifié avec succès.');
      setTimeout(() => setPasscodeSuccess(false), 3000);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const res = importFullPortfolioBackup(content);
      if (res.success) {
        reloadAllData();
        showToast('Sauvegarde complète restaurée avec succès !');
      } else {
        alert(`Erreur d’importation : ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  const handleFullReset = () => {
    if (window.confirm('ATTENTION : Voulez-vous réinitialiser TOUTES les données (Code, Design, Expériences, Profil) aux constantes d’origine ?')) {
      resetAllToDefaults();
      reloadAllData();
      showToast('Toutes les informations ont été rétablies à leur état initial.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A0A0A]/85 backdrop-blur-md animate-in fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[60] bg-[#1E40AF] text-[#FAF9F6] border-2 border-[#FAF9F6] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#0A0A0A] flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4 text-[#60A5FA]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Conteneur principal */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#FAF9F6] text-[#0A0A0A] border-4 border-[#0A0A0A] shadow-[8px_8px_0px_0px_#1E40AF] flex flex-col overflow-hidden">
        
        {/* ====================================================
            HEADER DU TERMINAL
           ==================================================== */}
        <div className="bg-[#0A0A0A] text-[#FAF9F6] px-6 py-4 border-b-2 border-[#0A0A0A] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#1E40AF]" />
            <div>
              <h2 className="font-sans text-base sm:text-lg font-black tracking-wider uppercase text-[#FAF9F6] flex items-center gap-2">
                <span>TERMINAL MAÎTRE</span>
                <span className="text-[#60A5FA] font-mono text-xs font-semibold">[ CONTRÔLE CENTRAL ]</span>
              </h2>
              <p className="font-mono text-[11px] text-[#FAF9F6]/70 uppercase">
                {isAuthenticated 
                  ? "SESSION SÉCURISÉE ACTIVE // GERVAIS AZANGA" 
                  : "AUTHENTIFICATION EXCLUSIVE REQUISE"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 border border-[#FAF9F6]/40 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#0A0A0A] transition-colors font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                title="Verrouiller la console maître"
              >
                <Lock className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>VERROUILLER</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 border border-[#FAF9F6]/30 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#0A0A0A] transition-colors"
              aria-label="Fermer la console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ====================================================
            GATE D'AUTHENTIFICATION SI NON AUTHENTIFIÉ
           ==================================================== */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center overflow-y-auto max-w-lg mx-auto w-full my-auto space-y-6">
            <div className="w-16 h-16 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] shadow-[4px_4px_0px_0px_#1E40AF] flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-[#60A5FA]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-sans text-2xl font-black uppercase text-[#0A0A0A]">
                AUTHENTIFICATION MAÎTRE
              </h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                Ce terminal administre l'ensemble des projets, du design, des expériences et des coordonnées publiques. Saisissez votre code d'accès pour déverrouiller.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (passcodeError) setPasscodeError(null);
                  }}
                  placeholder="Code d'accès maître..."
                  className="w-full bg-[#FAF9F6] text-[#0A0A0A] border-2 border-[#0A0A0A] px-4 py-3.5 font-mono text-sm tracking-wider focus:outline-none focus:border-[#1E40AF] shadow-[3px_3px_0px_0px_#0A0A0A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#0A0A0A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passcodeError && (
                <div className="p-3 bg-red-50 border-2 border-red-600 text-red-700 font-mono text-xs flex items-center gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{passcodeError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] font-sans text-sm font-black uppercase tracking-wider hover:bg-[#1E40AF] transition-colors shadow-[4px_4px_0px_0px_#0A0A0A] flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4 text-[#60A5FA]" />
                <span>DÉVERROUILLER LA CONSOLE</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#0A0A0A]/20 w-full font-mono text-[11px] text-[#6B6B6B]">
              <span>Astuce d'accès : Code par défaut <strong className="text-[#0A0A0A]">azanga2026</strong></span>
            </div>
          </div>
        ) : (
          /* ====================================================
              CONSOLE D'ADMINISTRATION COMPLÈTE
             ==================================================== */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Barre d'onglets de navigation du Dashboard */}
            <div className="bg-[#FAF9F6] border-b-2 border-[#0A0A0A] px-6 py-2 flex flex-wrap gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#1E40AF]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <Code2 className="w-4 h-4 text-[#60A5FA]" />
                <span>PROJETS CODE ({codeProjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('design')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'design'
                    ? 'bg-[#1E40AF] text-[#FAF9F6] border-[#1E40AF] shadow-[3px_3px_0px_0px_#0A0A0A]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <Palette className="w-4 h-4 text-[#FAF9F6]" />
                <span>PROJETS DESIGN ({designs.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experiences')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'experiences'
                    ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#1E40AF]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#60A5FA]" />
                <span>EXPÉRIENCES ({experiences.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#1E40AF]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <User className="w-4 h-4 text-[#60A5FA]" />
                <span>PROFIL & COORDONNÉES</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'messages'
                    ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#1E40AF]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#60A5FA]" />
                <span>LEADS JSON ({messages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  activeTab === 'security'
                    ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#1E40AF]'
                    : 'bg-[#FAF9F6] text-[#0A0A0A] border-transparent hover:border-[#0A0A0A]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                <span>SÉCURITÉ & BACKUP</span>
              </button>
            </div>

            {/* Corps défilant du tab actif */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* ====================================================
                  ONGLET 1 : PROJETS CODE & SYSTÈMES
                 ==================================================== */}
              {activeTab === 'code' && (
                <div className="space-y-8 animate-in fade-in">
                  
                  {/* Formulaire d'édition / création de projet code */}
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
                        <h3 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                          {editingCodeIndex !== null ? `MODIFIER LE PROJET CODE : ${codeForm.title}` : 'AJOUTER UN NOUVEAU PROJET CODE'}
                        </h3>
                      </div>
                      {editingCodeIndex !== null && (
                        <button
                          type="button"
                          onClick={handleCancelEditCode}
                          className="font-mono text-xs font-bold uppercase text-red-600 hover:underline"
                        >
                          Annuler modification
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveCodeProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Titre du projet *
                          </label>
                          <input
                            type="text"
                            required
                            value={codeForm.title}
                            onChange={(e) => setCodeForm({ ...codeForm, title: e.target.value })}
                            placeholder="Ex: Gestock+, Papyrus, HopeBridge..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Rôle & Architecture *
                          </label>
                          <input
                            type="text"
                            required
                            value={codeForm.role}
                            onChange={(e) => setCodeForm({ ...codeForm, role: e.target.value })}
                            placeholder="Ex: Lead Architect & Dev Mobile / PC"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Description synthétique *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={codeForm.description}
                          onChange={(e) => setCodeForm({ ...codeForm, description: e.target.value })}
                          placeholder="Description des fonctionnalités et de la proposition de valeur..."
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF] resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Fonctionnalités clés (1 par ligne)
                          </label>
                          <textarea
                            rows={3}
                            value={codeFeaturesInput}
                            onChange={(e) => setCodeFeaturesInput(e.target.value)}
                            placeholder="Encaissements Mobile Money & Cash&#10;Scan de code-barres & inventaire temps réel&#10;Rapports financiers par IA"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF] resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Tags / Stack (séparés par virgules)
                          </label>
                          <input
                            type="text"
                            value={codeTagsInput}
                            onChange={(e) => setCodeTagsInput(e.target.value)}
                            placeholder="Mobile POS, Desktop/PC, FinTech, React, Python"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />

                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] pt-2">
                            Impact & Déploiement
                          </label>
                          <input
                            type="text"
                            value={codeForm.impact}
                            onChange={(e) => setCodeForm({ ...codeForm, impact: e.target.value })}
                            placeholder="Ex: Déployé à Yaoundé · Salon GETEC 2026"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            URL Image d'illustration
                          </label>
                          <input
                            type="url"
                            value={codeForm.imageUrl}
                            onChange={(e) => setCodeForm({ ...codeForm, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Lien GitHub (optionnel)
                          </label>
                          <input
                            type="url"
                            value={codeForm.githubUrl || ''}
                            onChange={(e) => setCodeForm({ ...codeForm, githubUrl: e.target.value })}
                            placeholder="https://github.com/gerazayisti/..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Lien Démo / Site en ligne (optionnel)
                          </label>
                          <input
                            type="url"
                            value={codeForm.demoUrl || ''}
                            onChange={(e) => setCodeForm({ ...codeForm, demoUrl: e.target.value })}
                            placeholder="https://gestockplus.tech"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#0A0A0A]/20">
                        <button
                          type="button"
                          onClick={handleResetCodeProjects}
                          className="font-mono text-xs text-red-600 hover:underline flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>RÉTABLIR LES PROJETS CODE PAR DÉFAUT</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {editingCodeIndex !== null && (
                            <button
                              type="button"
                              onClick={handleCancelEditCode}
                              className="px-4 py-2 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A]/5"
                            >
                              ANNULER
                            </button>
                          )}
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1E40AF] transition-colors shadow-[3px_3px_0px_0px_#1E40AF] flex items-center gap-2"
                          >
                            <Save className="w-4 h-4 text-[#60A5FA]" />
                            <span>{editingCodeIndex !== null ? 'METTRE À JOUR LE PROJET' : 'ENREGISTRER LE PROJET CODE'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Liste des projets code existants avec actions Modifier / Supprimer */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      // LISTE DES PROJETS CODE ACTUELLEMENT DÉPLOYÉS SUR LE PORTFOLIO ({codeProjects.length})
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {codeProjects.map((proj, idx) => (
                        <div 
                          key={idx} 
                          className={`p-4 border-2 transition-all flex flex-col justify-between ${
                            editingCodeIndex === idx 
                              ? 'border-[#1E40AF] bg-[#1E40AF]/5 shadow-[4px_4px_0px_0px_#1E40AF]' 
                              : 'border-[#0A0A0A] bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-mono text-[10px] text-[#1E40AF] font-bold uppercase">
                                  #{idx + 1} // {proj.role}
                                </span>
                                <h5 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                                  {proj.title}
                                </h5>
                              </div>
                              <span className="font-mono text-[10px] px-2 py-0.5 border border-[#0A0A0A] font-bold">
                                {proj.tags?.[0] || 'Code'}
                              </span>
                            </div>

                            <p className="font-sans text-xs text-[#6B6B6B] line-clamp-2">
                              {proj.description}
                            </p>

                            <div className="font-mono text-[11px] text-[#0A0A0A] flex flex-wrap gap-2 pt-1">
                              {proj.demoUrl && <span className="text-[#1E40AF]">🌐 {proj.demoUrl.replace(/^https?:\/\//, '')}</span>}
                              {proj.githubUrl && <span>📂 GitHub lié</span>}
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-[#0A0A0A]/20 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditCodeProject(proj, idx)}
                              className="px-3 py-1.5 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#1E40AF]" />
                              <span>MODIFIER</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteCodeProject(idx, proj.title)}
                              className="px-3 py-1.5 border border-red-600 text-red-600 font-mono text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1"
                              title="Supprimer ce projet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================
                  ONGLET 2 : PROJETS DESIGN & UI/UX
                 ==================================================== */}
              {activeTab === 'design' && (
                <div className="space-y-8 animate-in fade-in">
                  
                  {/* Formulaire d'édition / ajout de maquette */}
                  <div className="p-6 border-2 border-[#1E40AF] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
                        <h3 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                          {editingDesignId ? `MODIFIER LA MAQUETTE : ${designForm.title}` : 'UPLOADER OU CRÉER UN NOUVEAU PROJET DESIGN'}
                        </h3>
                      </div>
                      {editingDesignId && (
                        <button
                          type="button"
                          onClick={handleCancelEditDesign}
                          className="font-mono text-xs font-bold uppercase text-red-600 hover:underline"
                        >
                          Annuler modification
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveDesign} className="space-y-4">
                      
                      {/* Sélecteur d'image (Upload local ou URL) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-xs font-bold uppercase text-[#0A0A0A] flex items-center gap-2">
                            <span>IMAGE DE LA MAQUETTE *</span>
                            <span className="text-[#1E40AF] font-normal">[ PNG, JPG, WebP ou URL ]</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setDesignImageMode('upload')}
                              className={`px-3 py-1 font-mono text-[11px] font-bold uppercase border transition-colors ${
                                designImageMode === 'upload'
                                  ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A]'
                                  : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]'
                              }`}
                            >
                              Upload Fichier
                            </button>
                            <button
                              type="button"
                              onClick={() => setDesignImageMode('url')}
                              className={`px-3 py-1 font-mono text-[11px] font-bold uppercase border transition-colors ${
                                designImageMode === 'url'
                                  ? 'bg-[#0A0A0A] text-[#FAF9F6] border-[#0A0A0A]'
                                  : 'bg-[#FAF9F6] text-[#0A0A0A] border-[#0A0A0A]'
                              }`}
                            >
                              URL Directe
                            </button>
                          </div>
                        </div>

                        {designImageMode === 'upload' ? (
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-[#0A0A0A] p-6 text-center cursor-pointer hover:bg-[#0A0A0A]/5 transition-colors space-y-2 bg-[#FAF9F6]"
                          >
                            <input 
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              accept="image/*"
                              className="hidden"
                            />
                            <Upload className="w-8 h-8 text-[#1E40AF] mx-auto" />
                            <div className="font-sans text-xs sm:text-sm font-bold text-[#0A0A0A]">
                              Cliquez pour choisir une capture d'écran ou un visuel de maquette
                            </div>
                            <div className="font-mono text-[10px] text-[#6B6B6B]">
                              L'image sera enregistrée localement en haute définition dans votre portfolio.
                            </div>
                          </div>
                        ) : (
                          <input
                            type="url"
                            value={designForm.imageUrl}
                            onChange={(e) => {
                              setDesignForm({ ...designForm, imageUrl: e.target.value });
                              setDesignUploadPreview(e.target.value);
                            }}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        )}

                        {designUploadPreview && (
                          <div className="relative border border-[#0A0A0A] bg-[#0A0A0A] p-2 flex items-center justify-between">
                            <img 
                              src={designUploadPreview} 
                              alt="Aperçu design" 
                              className="h-20 w-32 object-cover border border-[#FAF9F6]/20"
                            />
                            <span className="font-mono text-xs text-[#FAF9F6] truncate px-3">
                              Image prête à être publiée
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setDesignUploadPreview(null);
                                setDesignForm({ ...designForm, imageUrl: '' });
                              }}
                              className="p-1 text-[#FAF9F6] hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Titre de la maquette *
                          </label>
                          <input
                            type="text"
                            required
                            value={designForm.title}
                            onChange={(e) => setDesignForm({ ...designForm, title: e.target.value })}
                            placeholder="Ex: Gestock+ Caisse Tactile POS..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Organisation / Client
                          </label>
                          <input
                            type="text"
                            value={designForm.client}
                            onChange={(e) => setDesignForm({ ...designForm, client: e.target.value })}
                            placeholder="Ex: PME Retail, Bastos Yaoundé, CAMEDU..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Date de réalisation *
                          </label>
                          <input
                            type="text"
                            required
                            value={designForm.date}
                            onChange={(e) => setDesignForm({ ...designForm, date: e.target.value })}
                            placeholder="Ex: Septembre 2026, Juin 2025..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Type de travail *
                          </label>
                          <input
                            type="text"
                            required
                            value={designForm.typeOfWork}
                            onChange={(e) => setDesignForm({ ...designForm, typeOfWork: e.target.value })}
                            placeholder="Ex: UI/UX Mobile, Design Système & POS..."
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Description des défis ergonomiques & choix graphiques *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={designForm.description}
                          onChange={(e) => setDesignForm({ ...designForm, description: e.target.value })}
                          placeholder="Expliquez la démarche : lisibilité en caisse, ergonomie sous soleil, accessibilité..."
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF] resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Outils & Technologies UI (séparés par virgules)
                          </label>
                          <input
                            type="text"
                            value={designForm.tools}
                            onChange={(e) => setDesignForm({ ...designForm, tools: e.target.value })}
                            placeholder="Figma, Design System, Material 3, Tokens"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Lien Figma / Prototype / Démo (optionnel)
                          </label>
                          <input
                            type="url"
                            value={designForm.demoUrl}
                            onChange={(e) => setDesignForm({ ...designForm, demoUrl: e.target.value })}
                            placeholder="https://figma.com/file/... ou URL prototype"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#0A0A0A]/20">
                        <button
                          type="button"
                          onClick={handleResetDesigns}
                          className="font-mono text-xs text-red-600 hover:underline flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>RÉTABLIR LES MAQUETTES DESIGN D'ORIGINE</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {editingDesignId && (
                            <button
                              type="button"
                              onClick={handleCancelEditDesign}
                              className="px-4 py-2 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A]/5"
                            >
                              ANNULER
                            </button>
                          )}
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#1E40AF] text-[#FAF9F6] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0A0A0A] transition-colors shadow-[3px_3px_0px_0px_#0A0A0A] flex items-center gap-2"
                          >
                            <Save className="w-4 h-4 text-[#FAF9F6]" />
                            <span>{editingDesignId ? 'METTRE À JOUR LE DESIGN' : 'ENREGISTRER LA MAQUETTE'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Liste des maquettes existantes */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      // MAQUETTES & CRÉATIONS DESIGN ACTIVES ({designs.length})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {designs.map((d) => (
                        <div 
                          key={d.id} 
                          className={`p-3 border-2 transition-all flex flex-col justify-between ${
                            editingDesignId === d.id 
                              ? 'border-[#1E40AF] bg-[#1E40AF]/5 shadow-[4px_4px_0px_0px_#1E40AF]' 
                              : 'border-[#0A0A0A] bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="h-32 w-full overflow-hidden border border-[#0A0A0A] bg-black">
                              <img 
                                src={d.imageUrl} 
                                alt={d.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#1E40AF] font-bold">
                              <span>{d.typeOfWork}</span>
                              <span className="text-[#6B6B6B]">{d.date}</span>
                            </div>
                            <h5 className="font-sans text-sm font-black uppercase text-[#0A0A0A] line-clamp-1">
                              {d.title}
                            </h5>
                            <p className="font-sans text-xs text-[#6B6B6B] line-clamp-2">
                              {d.description}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-[#0A0A0A]/20 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditDesign(d)}
                              className="px-2.5 py-1 border border-[#0A0A0A] font-mono text-[11px] font-bold uppercase hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors"
                            >
                              MODIFIER
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteDesign(d.id, d.title)}
                              className="px-2.5 py-1 border border-red-600 text-red-600 font-mono text-[11px] font-bold uppercase hover:bg-red-600 hover:text-white transition-colors"
                              title="Supprimer cette maquette"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================
                  ONGLET 3 : TRAJECTOIRE & EXPÉRIENCES
                 ==================================================== */}
              {activeTab === 'experiences' && (
                <div className="space-y-8 animate-in fade-in">
                  
                  {/* Formulaire expérience */}
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-5">
                    <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
                        <h3 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                          {editingExpIndex !== null ? `MODIFIER EXPÉRIENCE : ${expForm.company}` : 'AJOUTER UNE NOUVELLE MISSION // EXPÉRIENCE'}
                        </h3>
                      </div>
                      {editingExpIndex !== null && (
                        <button
                          type="button"
                          onClick={handleCancelEditExperience}
                          className="font-mono text-xs font-bold uppercase text-red-600 hover:underline"
                        >
                          Annuler modification
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveExperience} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Rôle / Titre du poste *
                          </label>
                          <input
                            type="text"
                            required
                            value={expForm.role}
                            onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                            placeholder="Ex: Consultant Technique & Architecte Numérique"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Type de contrat
                          </label>
                          <select
                            value={expForm.type}
                            onChange={(e) => setExpForm({ ...expForm, type: e.target.value as any })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          >
                            <option value="Consultant">Consultant</option>
                            <option value="Entrepreneur">Entrepreneur</option>
                            <option value="Pro">Pro</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Stage">Stage</option>
                            <option value="Bénévole">Bénévole</option>
                            <option value="Communauté">Communauté</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Entreprise / Organisation *
                          </label>
                          <input
                            type="text"
                            required
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            placeholder="Ex: CAMEDU (camedu.cm)"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Période *
                          </label>
                          <input
                            type="text"
                            required
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            placeholder="Ex: Septembre 2026 - Présent"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Lieu
                          </label>
                          <input
                            type="text"
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            placeholder="Ex: Yaoundé, Cameroun"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Description de la mission *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          placeholder="Missions de conseil et d'ingénierie logicielle pour la plateforme..."
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF] resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Tâches & Réalisations (1 par ligne)
                        </label>
                        <textarea
                          rows={3}
                          value={expTasksInput}
                          onChange={(e) => setExpTasksInput(e.target.value)}
                          placeholder="Audit et conception de l'architecture des ENT&#10;Conseil technique sur l'interopérabilité des flux"
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF] resize-none"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#0A0A0A]/20">
                        <button
                          type="button"
                          onClick={handleResetExperiences}
                          className="font-mono text-xs text-red-600 hover:underline flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>RÉTABLIR LES EXPÉRIENCES INITIALES</span>
                        </button>

                        <div className="flex items-center gap-3">
                          {editingExpIndex !== null && (
                            <button
                              type="button"
                              onClick={handleCancelEditExperience}
                              className="px-4 py-2 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A]/5"
                            >
                              ANNULER
                            </button>
                          )}
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1E40AF] transition-colors shadow-[3px_3px_0px_0px_#1E40AF] flex items-center gap-2"
                          >
                            <Save className="w-4 h-4 text-[#60A5FA]" />
                            <span>{editingExpIndex !== null ? 'METTRE À JOUR L’EXPÉRIENCE' : 'ENREGISTRER L’EXPÉRIENCE'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Liste des expériences existantes */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                      // CHRONOLOGIE DES EXPÉRIENCES AFFICHÉES ({experiences.length})
                    </h4>

                    <div className="space-y-3">
                      {experiences.map((exp, idx) => (
                        <div 
                          key={idx} 
                          className={`p-4 border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            editingExpIndex === idx 
                              ? 'border-[#1E40AF] bg-[#1E40AF]/5 shadow-[4px_4px_0px_0px_#1E40AF]' 
                              : 'border-[#0A0A0A] bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] bg-[#0A0A0A] text-[#FAF9F6] px-2 py-0.5 uppercase font-bold">
                                {exp.type}
                              </span>
                              <span className="font-mono text-xs text-[#1E40AF] font-bold">
                                {exp.period}
                              </span>
                              <span className="font-mono text-xs text-[#6B6B6B]">· {exp.location}</span>
                            </div>
                            <h5 className="font-sans text-base font-black text-[#0A0A0A]">
                              {exp.role} — <span className="text-[#1E40AF]">{exp.company}</span>
                            </h5>
                            <p className="font-sans text-xs text-[#6B6B6B] line-clamp-1 max-w-2xl">
                              {exp.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleEditExperience(exp, idx)}
                              className="px-3 py-1.5 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors"
                            >
                              MODIFIER
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteExperience(idx, exp.company)}
                              className="px-3 py-1.5 border border-red-600 text-red-600 font-mono text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition-colors"
                              title="Supprimer cette expérience"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================
                  ONGLET 4 : PROFIL & COORDONNÉES
                 ==================================================== */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-6">
                    <div className="border-b border-[#0A0A0A] pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#1E40AF]" />
                        <h3 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                          INFORMATIONS GÉNÉRALES & CONTACT DU PORTFOLIO
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetProfile}
                        className="font-mono text-xs text-red-600 hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rétablir valeurs d'origine</span>
                      </button>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Nom public affiché *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Kicker Hero (en-tête) *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.kicker}
                            onChange={(e) => setProfile({ ...profile, kicker: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Titre d'impact Hero (H1) *
                        </label>
                        <input
                          type="text"
                          required
                          value={profile.headlineH1}
                          onChange={(e) => setProfile({ ...profile, headlineH1: e.target.value })}
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                          Texte de présentation / Bio Hero *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={profile.bioHero}
                          onChange={(e) => setProfile({ ...profile, bioHero: e.target.value })}
                          className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF] leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Téléphone d'affichage *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Numéro WhatsApp brut (sans + ni espaces) *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.whatsappNumber}
                            onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                            placeholder="237695183768"
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Email direct *
                          </label>
                          <input
                            type="email"
                            required
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Localisation *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-sans text-sm focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Lien GitHub public *
                          </label>
                          <input
                            type="url"
                            required
                            value={profile.githubUrl}
                            onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
                            Statut de disponibilité *
                          </label>
                          <input
                            type="text"
                            required
                            value={profile.availability}
                            onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-xs focus:outline-none focus:border-[#1E40AF]"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#0A0A0A]/20 flex justify-end">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1E40AF] transition-colors shadow-[4px_4px_0px_0px_#1E40AF] flex items-center gap-2"
                        >
                          <Save className="w-4 h-4 text-[#60A5FA]" />
                          <span>ENREGISTRER LE PROFIL & COORDONNÉES</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ====================================================
                  ONGLET 5 : LEADS JSON & WHATSAPP
                 ==================================================== */}
              {activeTab === 'messages' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[#0A0A0A] bg-[#FAF9F6]">
                    <div>
                      <h4 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                        BOÎTE DE RÉCEPTION CLIENTS & PROSPECTS
                      </h4>
                      <p className="font-sans text-xs text-[#6B6B6B]">
                        Chaque visiteur soumettant le formulaire voit sa demande archivée en format JSON structuré et synchronisée avec WhatsApp.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowRawJSON(!showRawJSON)}
                        className="px-3 py-1.5 border border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors"
                      >
                        {showRawJSON ? 'Voir les cartes' : 'Inspecter le JSON brut'}
                      </button>

                      <button
                        type="button"
                        onClick={exportMessagesAsJSON}
                        className="px-3 py-1.5 bg-[#0A0A0A] text-[#FAF9F6] border border-[#1E40AF] font-mono text-xs font-bold uppercase hover:bg-[#1E40AF] transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-[#60A5FA]" />
                        <span>Télécharger JSON</span>
                      </button>
                    </div>
                  </div>

                  {showRawJSON ? (
                    <div className="p-4 border-2 border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF9F6] font-mono text-xs overflow-x-auto space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#FAF9F6]/20">
                        <span className="text-[#60A5FA]">// STRUCTURE JSON BRUTE</span>
                        <button
                          onClick={handleCopyRawJSON}
                          className="px-2 py-1 border border-[#FAF9F6]/40 hover:bg-[#FAF9F6] hover:text-[#0A0A0A] transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedJSON ? 'Copié !' : 'Copier JSON'}</span>
                        </button>
                      </div>
                      <pre className="text-green-400 whitespace-pre-wrap">
                        {JSON.stringify(messages, null, 2)}
                      </pre>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-16 border-2 border-dashed border-[#0A0A0A] text-center space-y-3 bg-[#FAF9F6]">
                      <MessageSquare className="w-10 h-10 text-[#1E40AF] mx-auto opacity-50" />
                      <h4 className="font-sans text-lg font-bold text-[#0A0A0A]">
                        Aucun message reçu pour l'instant
                      </h4>
                      <p className="font-sans text-xs text-[#6B6B6B] max-w-sm mx-auto">
                        Les demandes déposées par vos clients apparaîtront ici avec possibilité de réponse instantanée en 1 clic sur WhatsApp.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className="p-5 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[3px_3px_0px_0px_#0A0A0A] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0A0A]/20 pb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 ${
                                msg.status === 'nouveau' ? 'bg-green-600 animate-pulse' :
                                msg.status === 'contacté' ? 'bg-blue-600' : 'bg-gray-400'
                              }`} />
                              <span className="font-sans font-black text-sm uppercase text-[#0A0A0A]">
                                {msg.name}
                              </span>
                              <span className="font-mono text-[11px] text-[#6B6B6B]">
                                ({new Date(msg.timestamp).toLocaleString('fr-FR')})
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={msg.status}
                                onChange={(e) => handleStatusChange(msg.id, e.target.value as any)}
                                className="font-mono text-[11px] border border-[#0A0A0A] bg-[#FAF9F6] px-2 py-1 font-bold uppercase"
                              >
                                <option value="nouveau">Nouveau</option>
                                <option value="contacté">Contacté</option>
                                <option value="archivé">Archivé</option>
                              </select>

                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-[#0A0A0A]">
                            {msg.phone && (
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                                <span>{msg.phone}</span>
                              </div>
                            )}
                            {msg.email && (
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-[#1E40AF]" />
                                <span>{msg.email}</span>
                              </div>
                            )}
                            <div className="font-bold text-[#1E40AF]">
                              OBJET : {msg.subject}
                            </div>
                          </div>

                          <div className="p-3 bg-white border border-[#0A0A0A]/20 font-sans text-xs text-[#0A0A0A] whitespace-pre-wrap leading-relaxed">
                            {msg.message}
                          </div>

                          <div className="pt-2 flex justify-end">
                            <a
                              href={buildWhatsAppReplyUrl(msg)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#25D366] text-[#0A0A0A] font-sans text-xs font-black uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors inline-flex items-center gap-2 border border-[#0A0A0A]"
                            >
                              <MessageSquare className="w-4 h-4 fill-current" />
                              <span>RÉPONDRE SUR WHATSAPP</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ====================================================
                  ONGLET 6 : SÉCURITÉ & BACKUP SOUVERAIN
                 ==================================================== */}
              {activeTab === 'security' && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* Modification du code d'accès maître */}
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#0A0A0A] pb-3">
                      <KeyRound className="w-5 h-5 text-[#1E40AF]" />
                      <h4 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                        MODIFIER LE CODE D'ACCÈS MAÎTRE
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      Ce code protège l'accès à vos modifications de contenu, uploads et leads clients.
                    </p>

                    <form onSubmit={handleChangePasscode} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <input
                        type="text"
                        required
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        placeholder="Nouveau code secret..."
                        className="flex-1 bg-[#FAF9F6] border border-[#0A0A0A] p-2.5 font-mono text-sm focus:outline-none focus:border-[#1E40AF]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#0A0A0A] text-[#FAF9F6] border-2 border-[#1E40AF] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1E40AF] transition-colors shrink-0"
                      >
                        METTRE À JOUR
                      </button>
                    </form>

                    {passcodeSuccess && (
                      <div className="font-mono text-xs text-green-700 font-bold flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Code d'accès mis à jour avec succès !</span>
                      </div>
                    )}
                  </div>

                  {/* Export & Import Sauvegarde Complète */}
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAF9F6] shadow-[4px_4px_0px_0px_#0A0A0A] space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#0A0A0A] pb-3">
                      <Download className="w-5 h-5 text-[#1E40AF]" />
                      <h4 className="font-sans text-base font-black uppercase text-[#0A0A0A]">
                        SAUVEGARDE ET RESTAURATION COMPLÈTE DU PORTFOLIO
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
                      Téléchargez un fichier JSON unique contenant l'intégralité de vos projets de code, designs personnalisés, chronologie d'expériences et coordonnées.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        type="button"
                        onClick={exportFullPortfolioBackup}
                        className="px-6 py-3 bg-[#1E40AF] text-[#FAF9F6] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0A0A0A] transition-colors shadow-[3px_3px_0px_0px_#0A0A0A] flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>EXPORTER LA SAUVEGARDE COMPLÈTE (JSON)</span>
                      </button>

                      <label className="px-6 py-3 bg-[#FAF9F6] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0A0A0A] hover:text-[#FAF9F6] transition-colors cursor-pointer flex items-center gap-2">
                        <Upload className="w-4 h-4 text-[#1E40AF]" />
                        <span>IMPORTER UN FICHIER DE SAUVEGARDE</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportBackup}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Réinitialisation générale */}
                  <div className="p-6 border-2 border-red-600 bg-red-50/50 space-y-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-sans text-sm font-black uppercase">
                        ZONE DE RÉINITIALISATION D'URGENCE
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-red-800">
                      Rétablit l'intégralité des données (code, designs, parcours et coordonnées) aux constantes originales de déploiement.
                    </p>
                    <button
                      type="button"
                      onClick={handleFullReset}
                      className="px-4 py-2 border-2 border-red-600 text-red-700 font-mono text-xs font-bold uppercase hover:bg-red-600 hover:text-white transition-colors"
                    >
                      TOUT RÉINITIALISER AUX VALEURS D'ORIGINE
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
