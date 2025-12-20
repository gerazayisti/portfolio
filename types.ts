
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

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Pro' | 'Communauté' | 'Bénévole' | 'Freelance' | 'Stage';
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
