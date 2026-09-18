import { Award, Project, DesignProject, Experience, Education, SkillSet, Certification, Volunteer, ProfileInfo } from './types';

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
    role: "Consultant Technique & Architecte Numérique",
    company: "CAMEDU (camedu.cm)",
    location: "Yaoundé, Cameroun",
    period: "Septembre 2026 - Présent",
    type: "Consultant",
    description: "Missions de conseil et d'ingénierie logicielle pour la plateforme nationale d'éducation numérique et les Espaces Numériques de Travail (ENT) du Cameroun.",
    tasks: [
      "Audit et conception de l'architecture des Espaces Numériques de Travail (ENT) pour élèves, parents, enseignants et universités.",
      "Conseil technique sur l'interopérabilité des flux scolaires (enseignement de base, secondaire, supérieur et formation professionnelle).",
      "Optimisation de la résilience, de la performance et de l'accessibilité multi-terminaux à l'échelle nationale."
    ]
  },
  {
    role: "Fondateur & Lead Architecte Fullstack",
    company: "Gestock+ (gestockplus.tech)",
    location: "Yaoundé, Cameroun",
    period: "Mars 2026 - Présent",
    type: "Entrepreneur",
    description: "Création, design UI/UX, développement complet (Mobile & PC) et pilotage de la mise sur le marché d'une solution de caisse et de gestion des stocks pour PME.",
    tasks: [
      "Conception architecturale et développement intégral des versions Mobile et PC (desktop).",
      "Design de l'expérience utilisateur (UX/UI), scan code-barres et encaissement multi-moyens (MTN MoMo, Orange Money, Cash).",
      "Conception du moteur d'analyse financière IA et scoring d'activité pour l'éligibilité aux crédits bancaires.",
      "Immersion terrain auprès des commerçants de Yaoundé et présentation officielle au salon technologique GETEC 2026."
    ]
  },
  {
    role: "Tech Lead & Architecte Web",
    company: "Papyrus (papyrus.tech)",
    location: "Bastos, Yaoundé, Cameroun",
    period: "Avril - Août 2026",
    type: "Freelance",
    description: "Direction technique, architecture web et design UX/UI de la marketplace scolaire intelligente de Bastos (Yaoundé).",
    tasks: [
      "Architecture logicielle et développement du portail web e-commerce haute résilience.",
      "Intégration du système IA de numérisation instantanée des listes scolaires par photo vers panier d'achat.",
      "Développement de la bourse d'échange de livres et manuels scolaires d'occasion assistée par vision IA.",
      "Mise en place des passerelles de paiement sécurisées et de l'expérience utilisateur mobile-first."
    ]
  },
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
  expertise: [
    "Design Centré Utilisateur",
    "Intuition Entrepreneuriale",
    "Prototypage Rapide & MVP",
    "UI/UX Design",
    "Architecture Logicielle",
    "Storyboards & Specs",
    "Esprit Critique"
  ]
};

export const PROJECTS: Project[] = [
  {
    title: "Gestock+",
    role: "Lead Architect & Dev Mobile / PC",
    description: "Solution complète de caisse (POS) et gestion intelligente des stocks et ventes sur Mobile et PC pour commerces et PME.",
    features: [
      "Encaissements Mobile Money (MTN, Orange) & Cash avec reçus instantanés",
      "Scan de code-barres & inventaire temps réel multi-boutiques",
      "Rapports financiers, marges bénéficiaires et prévisions de vente par IA",
      "Scoring d'activité commerciale pour éligibilité aux crédits bancaires"
    ],
    tags: ["Mobile POS", "Desktop/PC", "FinTech", "AI Analytics", "Retail"],
    impact: "Déployé à Yaoundé · Présenté au salon GETEC 2026",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e557224f?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "https://gestockplus.tech",
    githubUrl: "https://github.com/gerazayisti"
  },
  {
    title: "Papyrus",
    role: "Lead Web Architect & UX/UI Designer",
    description: "Marketplace scolaire intelligente basée à Bastos (Yaoundé), digitalisant l'achat, l'échange et la gestion des fournitures et manuels au Cameroun.",
    features: [
      "Numérisation de listes scolaires par IA : photo vers panier d'achat instantané",
      "Bourse d'échange de livres scolaires d'occasion avec estimation par vision IA",
      "Intégration des paiements mobiles sécurisés et livraison géolocalisée",
      "Architecture web e-commerce réactive conçue pour les fortes affluences"
    ],
    tags: ["EdTech", "E-Commerce", "AI Vision", "React", "Marketplace"],
    impact: "Marketplace scolaire de référence à Bastos, Yaoundé",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    demoUrl: "https://papyrus.tech",
    githubUrl: "https://github.com/gerazayisti"
  },
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
    role: "Lead Architect & Fullstack Developer",
    description: "Plateforme cloud de gestion intégrale des associations, tontines numériques, épargnes et prêts communautaires.",
    features: [
      "Gestion des tontines, cotisations, épargnes & octroi de prêts avec suivi d'échéances",
      "Gestion hiérarchique des membres (Président, Trésorier, Secrétaire, Censeur)",
      "Tenue des séances : suivi des présences, absences & calcul automatique des sanctions",
      "Redistribution automatisée des dividendes selon les parts & génération de cartes/attestations QR Code"
    ],
    tags: ["FinTech", "Tontine Digitale", "Épargne & Prêts", "SaaS", "Communauté"],
    impact: "Déployé en production avec essai 30 jours pour associations",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    demoUrl: "https://asso-in.online",
    githubUrl: "https://github.com/gerazayisti"
  },
  {
    title: "HopeBridge",
    role: "Lead Web Developer & UX Designer",
    description: "Plateforme web humanitaire et sociale dédiée à l'accompagnement, l'autonomisation communautaire et l'accès aux opportunités durables.",
    features: [
      "Architecture web haute performance et design empathique centré sur l'usager",
      "Portail de sensibilisation, programmes d'autonomisation et gestion des soutiens",
      "Expérience mobile-first fluide pour une accessibilité maximale sur tous réseaux"
    ],
    tags: ["Social Impact", "Web Platform", "UX/UI", "Community"],
    impact: "Portail international d'autonomisation et d'assistance",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    demoUrl: "https://www.hopebridge.me",
    githubUrl: "https://github.com/gerazayisti"
  },
  {
    title: "Portail Faculté des Sciences — UY1",
    role: "UI/UX Architect & Proposition Visionnaire",
    description: "Proposition d'avant-garde pour la refonte du portail de la Faculté des Sciences de l'Université de Yaoundé 1 alliant Brutalisme Constructiviste et rigueur académique.",
    features: [
      "Esthétique Brutalisme Constructiviste (grille modulaire franche, contrastes stricts, zéro artifice)",
      "Architecture de l'information orientée étudiant & chercheur : accès instantané aux départements, cours et filières",
      "Ergonomie radicalement axée sur les usages réels en campus (chargement ultra-rapide, zéro latence)"
    ],
    tags: ["Brutalisme", "Style Constructiviste", "EdTech", "Université Yaoundé 1"],
    impact: "Refonte d'architecture pour le campus scientifique de Yaoundé 1",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    githubUrl: "https://github.com/gerazayisti"
  }
];

export const DESIGN_PROJECTS: DesignProject[] = [
  {
    id: "design-gestock",
    title: "Gestock+ Mobile & Caisse POS",
    client: "NUMERID / Gestock+ Tech",
    date: "Mars 2026",
    typeOfWork: "UI/UX Mobile & POS",
    description: "Design complet de l'interface tactile de caisse pour commerçants : encaissement ultra-rapide, scan code-barres fluide, ergonomie optimisée pour usage intensif à une main sous fort ensoleillement.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=2070&auto=format&fit=crop",
    tools: ["Figma", "Design System", "Android UX"],
    demoUrl: "https://gestockplus.tech"
  },
  {
    id: "design-papyrus",
    title: "Papyrus Marketplace Scolaire",
    client: "Papyrus Tech Bastos",
    date: "Avril - Août 2026",
    typeOfWork: "UI/UX E-Commerce & Web",
    description: "Parcours utilisateur épuré pour l'achat de manuels scolaires et la bourse de revente entre parents : flux de commande express, numérisation visuelle des listes et design de confiance.",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2098&auto=format&fit=crop",
    tools: ["Figma", "Photoshop", "Micro-Interactions"],
    demoUrl: "https://papyrus.tech"
  },
  {
    id: "design-assos",
    title: "ASSO's — Plateforme Tontines & Prêts",
    client: "ASSO's In Online",
    date: "Janvier 2026",
    typeOfWork: "Design Système & Dashboard SaaS",
    description: "Conception du tableau de bord financier pour dirigeants d'associations : suivi des parts d'épargne, simulateur de prêts, fiches séances et cartes de membres avec QR code haute lisibilité.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tools: ["Figma", "Design Tokens", "DataViz"],
    demoUrl: "https://asso-in.online"
  },
  {
    id: "design-uy1-facsciences",
    title: "Portail Faculté des Sciences UY1",
    client: "Université de Yaoundé 1",
    date: "Juin 2026",
    typeOfWork: "Brutalisme Constructiviste Web",
    description: "Proposition d'interface académique radicale : grille modulaire franche, contrastes stricts sans fioriture, accès direct aux départements, syllabus et résultats en moins de deux clics.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    tools: ["Figma", "Constructivist Grid", "Typography"]
  },
  {
    id: "design-bon-abroad",
    title: "BON ABROAD Mobile App",
    client: "BON ABROAD (Lyon)",
    date: "Août - Novembre 2025",
    typeOfWork: "UI/UX Mobile iOS & Android",
    description: "Création de l'identité visuelle mobile et refonte ergonomique des flux de découverte, d'orientation et de mise en relation internationale.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    tools: ["Figma", "iOS HIG", "Material Design"]
  },
  {
    id: "design-media",
    title: "MedIA Assistant Médical",
    client: "HealthTech Initiative",
    date: "2024",
    typeOfWork: "Design Produit & DataViz Médicale",
    description: "Design de l'application primée pour le suivi de l'observance thérapeutique : rappels visuels haptiques, visualisation chronologique des prises et mode patient sans barrière d'alphabétisation.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    tools: ["Figma", "HealthTech UX", "Accessibilité"]
  }
];

export const DEFAULT_PROFILE: ProfileInfo = {
  name: "Gervais Azanga",
  kicker: "DISTINCTION & ARCHITECTURE LOGICIELLE",
  headlineH1: "Donnez à vos idées une rigueur et une puissance numérique.",
  headlineH1Highlight: "puissance numérique",
  bioHero: "Tech Leader, Entrepreneur & Bâtisseur de solutions à fort impact. Animé d'une profonde intuition entrepreneuriale, je capte instantanément l'essence stratégique de chaque projet pour concevoir et déployer des solutions ultra-rapides, robustes et viscéralement orientées utilisateur. Fondateur de NUMERID, architecte de Gestock+, Papyrus & ASSO's, et consultant pour CAMEDU.",
  phone: "+237 695 18 37 68",
  whatsappNumber: "237695183768",
  email: "gerazayisti@gmail.com",
  location: "Yaoundé, Cameroun",
  githubUrl: "https://github.com/gerazayisti",
  availability: "DISPONIBLE POUR MISSIONS CRITIQUES",
  heroImageUrl: "/20260626_125901.jpg"
};
