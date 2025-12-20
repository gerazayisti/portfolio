import { Award, Project, Experience, Education, SkillSet, Certification, Volunteer } from './types';

export const AWARDS: Award[] = [
  {
    title: "1er prix African Digital Haward",
    date: "2024",
    description: "Récompense pour MedIA, assistant médical innovant pour la gestion de l'adhérence médicamenteuse.",
    category: "Innovation"
  },
  {
    title: "2nd prix IA for Africa",
    date: "2024",
    description: "Distinction pour l'excellence de la solution MedIA basée sur l'intelligence artificielle.",
    category: "AI"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "GESTION DE PROJET", issuer: "GOOGLE" },
  { title: "UI/UX Designer", issuer: "MTF Institute" },
  { title: "MSc Financial Engineering", issuer: "World Quant University", status: "En cours" },
  { title: "Deep Learning for Computer Vision", issuer: "World Quant University" },
  { title: "Prompt Engineering", issuer: "MTF Institute" },
  { title: "Data Sciences Assistant", issuer: "DataCamp" },
  { title: "Computer Vision Level 2", issuer: "DeepLearning AI", status: "En cours" }
];

export const VOLUNTEER_WORK: Volunteer[] = [
  { role: "Fondateur", organization: "g-connect", period: "Présent" },
  { role: "NASA Space App Lead Ebolowa", organization: "NASA", period: "2025 - Présent" },
  { role: "GDG Organiser", organization: "Google Developers Group", period: "2024 - Présent" },
  { role: "GDSC Co-lead", organization: "Google Developer Student Clubs", period: "2024" },
  { role: "Deeplearning IA Lead Yaoundé", organization: "DeepLearning.AI", period: "2023" },
  { role: "Délégué d'étudiant", organization: "UY1 (Informatique)", period: "2022 - 2025" },
  { role: "Infographe", organization: "AEFAS", period: "2023" },
  { role: "Designer & Responsable Communauté", organization: "XR4GOD", period: "2024" },
  { role: "Développeur, Designer & Marketing", organization: "ONG JCAC", period: "2023 - 2025" }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Designer mobile",
    company: "BON ABROAD",
    location: "Lyon, France",
    period: "Août - Novembre 2025",
    type: "Freelance",
    description: "Conception et optimisation de l'interface mobile (UX/UI) pour iOS et Android.",
    tasks: [
      "Définition de la charte graphique et harmonisation de l'identité visuelle de l'application.",
      "Réalisation de maquettes interactives et tests utilisateurs pour améliorer l'expérience client."
    ]
  },
  {
    role: "Designer web",
    company: "Decatech",
    location: "Yaoundé, Cameroun",
    period: "Mai - Juin 2025",
    type: "Freelance",
    description: "Conception UX/UI et collaboration avec l'équipe produit pour la cohérence visuelle.",
    tasks: [
      "Réalisation de maquettes et tests utilisateurs pour améliorer l'expérience client.",
      "Collaboration avec l'équipe produit afin d'assurer la cohérence visuelle et fonctionnelle."
    ]
  },
  {
    role: "Directeur de l'information",
    company: "JUSA",
    location: "Yaoundé, Cameroun",
    period: "Oct 2024 - Oct 2025",
    type: "Pro",
    description: "Supervision de la stratégie de communication et coordination des équipes éditoriales.",
    tasks: [
      "Coordination des équipes éditoriales et gestion des contenus numériques et institutionnels.",
      "Mise en place d'outils digitaux pour renforcer la visibilité, la cohérence et l'impact médiatique."
    ]
  },
  {
    role: "Designer web & développeur web",
    company: "T-sea Inc",
    location: "Yaoundé, Cameroun",
    period: "Juin 2023 - février 2024",
    type: "Freelance",
    description: "Conception et développement de sites web responsives adaptés aux besoins clients.",
    tasks: [
      "Création d'interfaces modernes et cohérentes, alignées sur l'identité visuelle de chaque projet.",
      "Intégration de solutions interactives et optimisation des performances."
    ]
  },
  {
    role: "Chef de projet syprocenp",
    company: "Université de Yaoundé 1",
    location: "Yaoundé, Cameroun",
    period: "2023 - 2024",
    type: "Pro",
    description: "Pilotage d'une plateforme numérique de gestion et d'identification des étudiants.",
    tasks: [
      "Coordination des équipes techniques pour le développement et l'intégration des modules web et mobile.",
      "Supervision de la phase de test et de déploiement au sein des établissements partenaires."
    ]
  },
  {
    role: "Développeur web",
    company: "Collège Sainte Thérèse de Mva'a",
    location: "Okola, Cameroun",
    period: "2020 - 2023",
    type: "Pro",
    description: "Développement et maintenance du site institutionnel et outils de gestion internes.",
    tasks: [
      "Conception d'outils numériques internes pour la gestion des élèves et des activités scolaires.",
      "Optimisation de l'ergonomie et de la performance du site."
    ]
  },
  {
    role: "Développeur web et IA",
    company: "INNOVATECH",
    location: "Yaoundé, Cameroun",
    period: "Juin - Août 2023",
    type: "Stage",
    description: "Mise en place de modèles prédictifs et de reconnaissance d'images.",
    tasks: [
      "Modèle de régression linéaire pour la prédiction des prix des véhicules au Cameroun.",
      "Identification des cellules infectées par le paludisme par IA.",
      "Développement d'un modèle de reconnaissance d'objets et de gestes."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Licence Informatique",
    school: "Université de Yaoundé I",
    period: "2022 - 2026",
    description: "Formation en programmation, systèmes et IA."
  },
  {
    degree: "Baccalauréat TI",
    school: "Cosathe Mva'a",
    period: "2019 - 2020",
    description: "Série Technologique Informatique."
  }
];

export const SKILLS: SkillSet = {
  languages: ["JavaScript", "TypeScript", "Python", "PHP", "R", "SQL"],
  frameworks: ["React", "Next.js", "Laravel", "Django", "Rasengan.js", "Node.js"],
  dataAI: ["PowerBI", "Deep Learning", "Computer Vision", "Prompt Engineering"],
  tools: ["Figma", "Photoshop", "Illustrator", "Android Studio", "Lunacy", "Git/GitHub", "Gimp"],
  expertise: ["UI/UX Design", "Gestion de projet", "Communication", "Storyboards", "Esprit critique"]
};

export const PROJECTS: Project[] = [
  {
    title: "MedIA",
    role: "Lead Developer & UI Designer",
    description: "Assistant médical intelligent facilitant la gestion de l'adhérence médicamenteuse entre patients et médecins.",
    features: ["IA prédictive", "Gestion de l'adhérence", "Interface patient/médecin optimisée"],
    tags: ["IA", "HealthTech", "UX/UI"],
    impact: "1er prix African Digital Haward, 2nd prix IA for Africa",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com/gerazayisti"
  },
  {
    title: "numerid",
    role: "Chef de Projet & Dev",
    description: "Plateforme de production et gestion des cartes d'identité numérique des étudiants.",
    features: ["Gestion d'identité", "Génération de cartes numériques", "Backend administratif"],
    tags: ["EdTech", "Management", "Fullstack"],
    impact: "Déployé à l'Université de Yaoundé 1",
    imageUrl: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=2069&auto=format&fit=crop",
    githubUrl: "https://github.com/gerazayisti"
  },
  {
    title: "ASSO's",
    role: "Fullstack Developer",
    description: "Plateforme d'aide à la gestion d'associations (tontines, projets, prêts).",
    features: ["Gestion financière", "Suivi de projets", "Système de tontine numérique"],
    tags: ["FinTech", "Social", "Web App"],
    impact: "Solution communautaire",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    githubUrl: "https://github.com/gerazayisti"
  }
];