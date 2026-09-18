import { Project, DesignProject, Experience, ProfileInfo, ClientLeadMessage } from '../types';
import { PROJECTS, DESIGN_PROJECTS, EXPERIENCES, DEFAULT_PROFILE } from '../constants';

const STORAGE_KEYS = {
  CODE_PROJECTS: 'gervais_custom_code_projects_v2',
  DESIGNS: 'gervais_custom_designs_v2',
  EXPERIENCES: 'gervais_custom_experiences_v2',
  PROFILE: 'gervais_custom_profile_v2',
  MESSAGES: 'gervais_lead_messages_v1',
  AUTH_SESSION: 'gervais_admin_auth_session_v1',
  PASSCODE: 'gervais_admin_master_passcode_v1'
};

const DEFAULT_PASSCODE = 'azanga2026';
const LEGACY_PASSCODE = 'gerazayisti';

// ==========================================
// 1. AUTHENTIFICATION SÉCURISÉE MAÎTRE
// ==========================================

export function getMasterPasscode(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSCODE;
  try {
    return localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_PASSCODE;
  } catch {
    return DEFAULT_PASSCODE;
  }
}

export function verifyMasterPasscode(input: string): boolean {
  if (!input) return false;
  const current = getMasterPasscode().trim();
  const cleaned = input.trim();
  return cleaned === current || cleaned === LEGACY_PASSCODE || cleaned === DEFAULT_PASSCODE;
}

export function updateMasterPasscode(newPasscode: string): boolean {
  if (!newPasscode || newPasscode.trim().length < 4) return false;
  try {
    localStorage.setItem(STORAGE_KEYS.PASSCODE, newPasscode.trim());
    return true;
  } catch (err) {
    console.error('Erreur mise a jour mot de passe maitre:', err);
    return false;
  }
}

export function isMasterAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
  } catch {
    return false;
  }
}

export function loginMaster(passcode: string): boolean {
  if (verifyMasterPasscode(passcode)) {
    try {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      return true;
    } catch {
      return true;
    }
  }
  return false;
}

export function logoutMaster(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  } catch (err) {
    console.error('Erreur deconnexion maitre:', err);
  }
}

// ==========================================
// 2. PROJETS CODE & SYSTÈMES
// ==========================================

export function getAllCodeProjects(): Project[] {
  if (typeof window === 'undefined') return PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CODE_PROJECTS);
    if (!raw) return PROJECTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PROJECTS;
  } catch (err) {
    console.error('Erreur lecture projets code:', err);
    return PROJECTS;
  }
}

export function saveAllCodeProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CODE_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Erreur sauvegarde projets code:', err);
  }
}

export function saveCodeProject(project: Project, editIndex?: number): void {
  const current = getAllCodeProjects();
  let updated: Project[];
  if (typeof editIndex === 'number' && editIndex >= 0 && editIndex < current.length) {
    updated = [...current];
    updated[editIndex] = project;
  } else {
    updated = [project, ...current];
  }
  saveAllCodeProjects(updated);
}

export function deleteCodeProject(index: number): void {
  const current = getAllCodeProjects();
  const updated = current.filter((_, idx) => idx !== index);
  saveAllCodeProjects(updated);
}

export function resetCodeProjects(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CODE_PROJECTS);
  } catch (err) {
    console.error('Erreur reinitialisation code:', err);
  }
}

// ==========================================
// 3. PROJETS DESIGN & UI/UX
// ==========================================

export function getAllDesigns(): DesignProject[] {
  if (typeof window === 'undefined') return DESIGN_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DESIGNS);
    if (!raw) {
      // S'il existe d'anciens custom designs v1, on les migre
      const legacyRaw = localStorage.getItem('gervais_custom_designs_v1');
      if (legacyRaw) {
        const legacyParsed = JSON.parse(legacyRaw);
        if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
          const combined = [...legacyParsed, ...DESIGN_PROJECTS];
          localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(combined));
          return combined;
        }
      }
      return DESIGN_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DESIGN_PROJECTS;
  } catch (err) {
    console.error('Erreur lecture designs:', err);
    return DESIGN_PROJECTS;
  }
}

export function saveAllDesigns(designs: DesignProject[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
  } catch (err) {
    console.error('Erreur sauvegarde designs:', err);
  }
}

export function saveCustomDesign(design: Omit<DesignProject, 'id'> & { id?: string }): DesignProject {
  const current = getAllDesigns();
  const id = design.id || `custom-design-${Date.now()}`;
  const fullDesign: DesignProject = { ...design, id };

  const existingIdx = current.findIndex(d => d.id === id);
  let updated: DesignProject[];
  if (existingIdx !== -1) {
    updated = [...current];
    updated[existingIdx] = fullDesign;
  } else {
    updated = [fullDesign, ...current];
  }
  saveAllDesigns(updated);
  return fullDesign;
}

export function deleteCustomDesign(id: string): boolean {
  try {
    const current = getAllDesigns();
    const filtered = current.filter(d => d.id !== id);
    saveAllDesigns(filtered);
    return true;
  } catch (err) {
    console.error('Erreur suppression design:', err);
    return false;
  }
}

export function resetDesigns(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.DESIGNS);
  } catch (err) {
    console.error('Erreur reinitialisation designs:', err);
  }
}

// ==========================================
// 4. TRAJECTOIRE & EXPÉRIENCES
// ==========================================

export function getAllExperiences(): Experience[] {
  if (typeof window === 'undefined') return EXPERIENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    if (!raw) return EXPERIENCES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : EXPERIENCES;
  } catch (err) {
    console.error('Erreur lecture experiences:', err);
    return EXPERIENCES;
  }
}

export function saveAllExperiences(experiences: Experience[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
  } catch (err) {
    console.error('Erreur sauvegarde experiences:', err);
  }
}

export function saveExperience(exp: Experience, editIndex?: number): void {
  const current = getAllExperiences();
  let updated: Experience[];
  if (typeof editIndex === 'number' && editIndex >= 0 && editIndex < current.length) {
    updated = [...current];
    updated[editIndex] = exp;
  } else {
    updated = [exp, ...current];
  }
  saveAllExperiences(updated);
}

export function deleteExperience(index: number): void {
  const current = getAllExperiences();
  const updated = current.filter((_, idx) => idx !== index);
  saveAllExperiences(updated);
}

export function resetExperiences(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
  } catch (err) {
    console.error('Erreur reinitialisation experiences:', err);
  }
}

// ==========================================
// 5. PROFIL & COORDONNÉES
// ==========================================

export function getProfileInfo(): ProfileInfo {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (err) {
    console.error('Erreur lecture profil:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveProfileInfo(info: ProfileInfo): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(info));
  } catch (err) {
    console.error('Erreur sauvegarde profil:', err);
  }
}

export function resetProfileInfo(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
  } catch (err) {
    console.error('Erreur reinitialisation profil:', err);
  }
}

// ==========================================
// 6. MESSAGES CLIENTS (JSON & WHATSAPP)
// ==========================================

export function getStoredClientMessages(): ClientLeadMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Erreur lecture messages locaux:', err);
    return [];
  }
}

export function saveClientMessage(payload: {
  name: string;
  phone?: string;
  email?: string;
  subject: string;
  message: string;
}): ClientLeadMessage {
  const newMsg: ClientLeadMessage = {
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: payload.name.trim(),
    phone: payload.phone?.trim() || '',
    email: payload.email?.trim() || '',
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    status: 'nouveau'
  };

  const existing = getStoredClientMessages();
  const updated = [newMsg, ...existing];
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  } catch (err) {
    console.error('Erreur sauvegarde message lead:', err);
  }
  return newMsg;
}

export function updateClientMessageStatus(id: string, status: 'nouveau' | 'contacté' | 'archivé'): void {
  try {
    const existing = getStoredClientMessages();
    const updated = existing.map(m => m.id === id ? { ...m, status } : m);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  } catch (err) {
    console.error('Erreur mise à jour status message:', err);
  }
}

export function deleteClientMessage(id: string): void {
  try {
    const existing = getStoredClientMessages();
    const filtered = existing.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
  } catch (err) {
    console.error('Erreur suppression message:', err);
  }
}

export function exportMessagesAsJSON(): void {
  const messages = getStoredClientMessages();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `leads-messages-gervais-azanga-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function buildWhatsAppReplyUrl(message: ClientLeadMessage): string {
  let targetPhone = message.phone ? message.phone.replace(/[^0-9]/g, '') : '';
  if (targetPhone.length === 9 && (targetPhone.startsWith('6') || targetPhone.startsWith('2'))) {
    targetPhone = `237${targetPhone}`;
  }
  if (!targetPhone || targetPhone.length < 8) {
    targetPhone = '237695183768';
  }

  const replyText = `Bonjour ${message.name},\n\n` +
    `Je fais suite à votre message transmis via mon portfolio concernant "${message.subject}".\n\n` +
    `Je suis disponible pour échanger sur vos objectifs et lancer votre projet avec excellence.\n\n` +
    `— Gervais Azanga AYISSI\nArchitecte Logiciel & Tech Leader`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(replyText)}`;
}

// ==========================================
// 7. SAUVEGARDE & RESTAURATION COMPLÈTE
// ==========================================

export function exportFullPortfolioBackup(): void {
  const backup = {
    app: "Portfolio Gervais Azanga",
    exportedAt: new Date().toISOString(),
    profile: getProfileInfo(),
    codeProjects: getAllCodeProjects(),
    designs: getAllDesigns(),
    experiences: getAllExperiences(),
    leadsMessages: getStoredClientMessages()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `backup-portfolio-gervais-azanga-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importFullPortfolioBackup(jsonString: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonString);
    if (data.profile) saveProfileInfo(data.profile);
    if (Array.isArray(data.codeProjects)) saveAllCodeProjects(data.codeProjects);
    if (Array.isArray(data.designs)) saveAllDesigns(data.designs);
    if (Array.isArray(data.experiences)) saveAllExperiences(data.experiences);
    if (Array.isArray(data.leadsMessages)) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(data.leadsMessages));
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Fichier JSON invalide' };
  }
}

export function resetAllToDefaults(): void {
  resetProfileInfo();
  resetCodeProjects();
  resetDesigns();
  resetExperiences();
}
