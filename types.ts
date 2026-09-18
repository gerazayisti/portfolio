
export interface Award {
  title: string;
  date: string;
  description: string;
  category: string;
}

export interface Project {
  title: string;
  role: string;
  description: string;
  features: string[];
  tags: string[];
  impact: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface DesignProject {
  id: string;
  title: string;
  client?: string;
  date: string;
  typeOfWork: string; // Ex: 'UI/UX Mobile', 'Design Système', 'Branding & Identité', 'Maquettes Web'
  description: string;
  imageUrl: string;
  tools?: string[];
  demoUrl?: string;
}

export interface ClientLeadMessage {
  id: string;
  timestamp: string;
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'nouveau' | 'contacté' | 'archivé';
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Pro' | 'Communauté' | 'Bénévole' | 'Freelance' | 'Stage' | 'Consultant' | 'Entrepreneur';
  description: string;
  tasks?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  status?: string;
}

export interface Volunteer {
  role: string;
  organization: string;
  period?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface SkillSet {
  languages: string[];
  frameworks: string[];
  dataAI: string[];
  tools: string[];
  expertise: string[];
}

export interface ProfileInfo {
  name: string;
  kicker: string;
  headlineH1: string;
  headlineH1Highlight: string;
  bioHero: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  location: string;
  githubUrl: string;
  availability: string;
}
