import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'fr';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  lang = signal<Lang>('en');

  toggleLang() {
    this.lang.set(this.lang() === 'en' ? 'fr' : 'en');
  }

  t = computed(() => {
    return this.lang() === 'en' ? EN : FR;
  });
}

// ============================================================
// ENGLISH TRANSLATIONS
// ============================================================
const EN = {
  // --- Navbar ---
  nav: {
    home: 'HOME',
    projects: 'PROJECTS',
    timeline: 'TIMELINE',
    contact: 'CONTACT',
  },

  // --- Footer ---
  footer: {
    copy: 'HABI / THE GOLDEN CHRONOS',
  },

  // --- Home Page ---
  home: {
    identityLabel: 'IDENTITY',
    identityHeading1: 'Architecting digital ecosystems where precision meets ',
    identityHeading2: 'fluidity.',
    identityText: "At the crossroads of code and creativity, I specialize in building high-performance full-stack applications that push the boundaries of modern web architecture. My approach values durability, craftsmanship, and timeless technical execution.",
    downloadResume: 'DOWNLOAD RESUME',

    worksLabel: 'SELECTED WORKS',
    worksHeading: 'Coded Legacies',
    viewAllProjects: 'VIEW ALL PROJECTS',

    contactLabel: 'GET IN TOUCH',
    contactHeading1: "Let's build the ",
    contactHeading2: 'future.',
    labelName: 'YOUR NAME',
    placeholderName: 'Your name',
    labelEmail: 'YOUR EMAIL',
    placeholderEmail: 'Your email',
    labelMessage: 'YOUR MESSAGE',
    placeholderMessage: 'Your message',
    btnSend: 'SEND MESSAGE',
    btnSending: 'SENDING...',
    btnSent: '✓ MESSAGE SENT',
  },

  // --- Projects Page ---
  projects: {
    badge: 'SYSTEM CAPABILITIES',
    heading1: 'Technical',
    heading2: 'Portfolio',
    subtitle: 'A curated collection of projects designed for resilience, performance, and precision. Each project reflects a balance between developer velocity and system stability.',
    allProjectsHeading: 'All Projects',
    sourceCode: 'SOURCE CODE',
    viewMore: 'VIEW MORE PROJECTS',
    showLess: 'SHOW LESS',
    viewGithub: 'VIEW ON GITHUB',

    p1Summary: 'An immersive visionOS training suite for high-stakes corporate recruitment, featuring real-time biometric feedback.',
    p1Desc: 'We developed a VR interview simulator using visionOS and Swift, integrating speech recognition and AI-driven feedback to help candidates prepare for real interviews.',
    p2Summary: 'A distributed microservices architecture with Docker containerization and automated CI/CD pipelines.',
    p2Desc: 'Built a full polling application using Docker microservices with PostgreSQL, Redis, and multiple backend services orchestrated via docker-compose.',
    p3Summary: 'A Discord-inspired real-time chat with WebSocket communication, role-based permissions, and async Rust backend.',
    p3Desc: 'Developed a real-time messaging platform with channels, direct messages, and role-based access control using Rust and Next.js.',
    p4Summary: 'Comprehensive CI/CD pipeline with Jenkins for automated testing, quality assurance, and deployment.',
    p4Desc: 'Implemented a full Jenkins pipeline with automated testing stages, code quality checks, and deployment automation.',
    p5Summary: 'A tower defense game built with Java and LibGDX featuring OOP design patterns and real-time gameplay.',
    p5Desc: 'Created a tower defense game using Java and LibGDX with object-oriented design, sprite management, and real-time game loop.',
    p6Summary: 'A full-stack matchmaking platform built with Django and Vue 3 for connecting people based on interests.',
    p6Desc: 'Developed a matchmaking web application with Django REST backend and Vue 3 frontend, featuring user profiles, matching algorithms, and real-time notifications.',
    p7Summary: 'A modern single-page portfolio application built with Angular and TypeScript.',
    p7Desc: 'Built a responsive portfolio website using Angular with TypeScript, featuring smooth animations and modern design patterns.',
    p8Summary: 'A RESTful API for employee management built with Spring Boot and JPA.',
    p8Desc: 'Developed a REST API using Spring Boot with JPA for employee CRUD operations, featuring proper error handling and data validation.',
    p9Summary: 'Wine and cheese pairing application for Intermarché built with Bubble.io as Tech Lead.',
    p9Desc: 'Led the technical development of a wine and cheese pairing application for Intermarché using Bubble.io, managing API integrations and data architecture.',
    p10Summary: 'Blockchain and AI integration project exploring decentralized systems and machine learning.',
    p10Desc: 'Developed a blockchain-integrated AI system combining smart contracts with machine learning models for decentralized decision-making.',
    p11Summary: 'FPGA web simulator for CNES space agency, built with responsive UI and Python backend.',
    p11Desc: 'Created a web-based FPGA simulator for CNES with a responsive interface and Python backend for processing FPGA configurations.',
    p12Summary: 'A 2D platformer game built with C and CSFML library featuring physics and level design.',
    p12Desc: 'Developed a 2D platformer game using C and CSFML with custom physics engine, sprite animations, and multiple levels.',
    p13Summary: 'C++ application to calculate the quickest path between two American locations with API exposure.',
    p13Desc: 'Developed a C++ application for calculating shortest paths between US locations via an API supporting XML and JSON. As Project Manager, I led the team and delivered documentation — resulting in a 100% project grade.',
    p14Summary: 'Reimplementation of classic Frogger on FPGA using Verilog and VGA display logic.',
    p14Desc: 'Recreated Frogger on an FPGA Go Board platform. We designed synchronous circuits, VGA rendering, and sprite management using Block RAM.',
    p15Summary: 'Mobile and web recruitment application focused on soft skills and personality matching.',
    p15Desc: 'Designed and prototyped an inclusive recruitment solution prioritizing human qualities over appearance or diplomas. As Program Manager, I defined design directions and created functional specification documents.',
    p16Summary: 'Sports equipment security prototype using embedded electronics and mobile alerts.',
    p16Desc: 'Created an embedded prototype to prevent theft or tampering of skis and snowboards, with low-power sensors and a connected mobile interface.',
  },

  // --- Timeline Page (chronological order: newest first) ---
  timeline: {
    label: 'CAREER PATH',
    heading1: 'Professional ',
    heading2: 'Trajectory',
    subtitle: 'A sequence of milestones defining my evolution as a developer. From foundational learning to high-performance distributed architectures.',
    journeyHeading: 'The Journey Continues',
    downloadResume: 'DOWNLOAD RESUME',
    getInTouch: 'GET IN TOUCH',

    // 1. Feb 2026 — VR Hackathon (won)
    exp1Period: 'FEB 2026',
    exp1Title: 'VR Interview Simulator',
    exp1Company: 'VISIONOS HACKATHON — WINNER',
    exp1Desc: 'Won first place developing an immersive visionOS training suite for corporate recruitment featuring real-time biometric feedback and speech recognition.',
    exp1Milestone: 'PRESENT',
    exp1MilestoneSub: 'Hackathon Winner',

    // 2. Sep 2025 — Present — Epitech
    exp2Period: 'SEP 2025 — PRESENT',
    exp2Title: 'Software Engineer Student',
    exp2Company: 'EPITECH NANTES',
    exp2Desc: 'Pursuing pré-Msc curriculum at Epitech, building high-performance digital solutions. Specializing in full-stack development, blockchain technologies, and system architecture.',
    exp2Milestone: '',
    exp2MilestoneSub: 'Current Studies',

    // 3. Jul — Aug 2025 — Woofing
    exp3Period: 'JUL — AUG 2025',
    exp3Title: 'Woofing Experience',
    exp3Company: 'INTERNATIONAL',
    exp3Desc: 'International woofing experience developing adaptability, cross-cultural communication, and problem-solving skills in diverse environments.',
    exp3Milestone: 'GROWTH PHASE',
    exp3MilestoneSub: '',

    // 4. 2023 — 2025 — Algosup
    exp4Period: '2023 — 2025',
    exp4Title: 'Software Engineer Student',
    exp4Company: 'ALGOSUP VIERZON',
    exp4Desc: 'Completed intensive software engineering program covering C, C++, Java, Verilog, Flutter, and project management. Led multiple team projects as Project Manager and Tech Lead.',
    exp4Milestone: '',
    exp4MilestoneSub: 'Foundation',

    // 5. Oct 2024 — Blockchain Hackathon (won)
    exp5Period: 'OCT 2024',
    exp5Title: 'Hackathon Winner',
    exp5Company: 'BLOCKCHAIN X AI HACKATHON',
    exp5Desc: 'Won first place at the CrippleFN Blockchain x AI hackathon, developing a decentralized AI system combining smart contracts with machine learning.',
    exp5Milestone: '',
    exp5MilestoneSub: 'Hackathon Winner',

    // 6. 2019 — 2022 — Baccalauréat
    exp6Period: '2019 — 2022',
    exp6Title: 'Baccalauréat',
    exp6Company: 'HIGH SCHOOL',
    exp6Desc: 'Obtained Baccalauréat with specializations in NSI (Computer Science) and Mathematics, building the foundation for software engineering studies.',
    exp6Milestone: 'ORIGIN POINT',
    exp6MilestoneSub: 'First Code',
  },

  // --- Contact Page ---
  contact: {
    heading1: 'Get in ',
    heading2: 'Touch',
    subtitle: "I'd love to hear from you — let's connect!",
    labelName: 'YOUR NAME',
    placeholderName: 'John Doe',
    labelEmail: 'YOUR EMAIL',
    placeholderEmail: 'john@example.com',
    labelMessage: 'YOUR MESSAGE',
    placeholderMessage: 'Tell me about your project or idea...',
    btnSend: 'SEND MESSAGE',
    btnSending: 'SENDING...',
    btnSent: '✓ MESSAGE SENT',
    downloadResume: 'DOWNLOAD RESUME',
  },
};

// ============================================================
// FRENCH TRANSLATIONS
// ============================================================
const FR = {
  // --- Navbar ---
  nav: {
    home: 'ACCUEIL',
    projects: 'PROJETS',
    timeline: 'PARCOURS',
    contact: 'CONTACT',
  },

  // --- Footer ---
  footer: {
    copy: 'HABI / THE GOLDEN CHRONOS',
  },

  // --- Home Page ---
  home: {
    identityLabel: 'IDENTITÉ',
    identityHeading1: "Architecturer des écosystèmes numériques où la précision rencontre la ",
    identityHeading2: 'fluidité.',
    identityText: "Au carrefour du code et de la créativité, je me spécialise dans la construction d'applications full-stack haute performance qui repoussent les limites de l'architecture web moderne. Mon approche valorise la durabilité, l'artisanat et l'exécution technique intemporelle.",
    downloadResume: 'TÉLÉCHARGER LE CV',

    worksLabel: 'TRAVAUX SÉLECTIONNÉS',
    worksHeading: 'Héritages Codés',
    viewAllProjects: 'VOIR TOUS LES PROJETS',

    contactLabel: 'ME CONTACTER',
    contactHeading1: 'Construisons le ',
    contactHeading2: 'futur.',
    labelName: 'VOTRE NOM',
    placeholderName: 'Votre nom',
    labelEmail: 'VOTRE EMAIL',
    placeholderEmail: 'Votre email',
    labelMessage: 'VOTRE MESSAGE',
    placeholderMessage: 'Votre message',
    btnSend: 'ENVOYER LE MESSAGE',
    btnSending: 'ENVOI...',
    btnSent: '✓ MESSAGE ENVOYÉ',
  },

  // --- Projects Page ---
  projects: {
    badge: 'CAPACITÉS SYSTÈME',
    heading1: 'Portfolio',
    heading2: 'Technique',
    subtitle: "Une collection soigneusement sélectionnée de projets conçus pour la résilience, la performance et la précision. Chaque projet reflète un équilibre entre vélocité développeur et stabilité système.",
    allProjectsHeading: 'Tous les Projets',
    sourceCode: 'CODE SOURCE',
    viewMore: 'VOIR PLUS DE PROJETS',
    showLess: 'VOIR MOINS',
    viewGithub: 'VOIR SUR GITHUB',

    p1Summary: "Suite d'entraînement immersive visionOS pour le recrutement d'entreprise, avec retour biométrique en temps réel.",
    p1Desc: "Nous avons développé un simulateur d'entretien VR utilisant visionOS et Swift, intégrant la reconnaissance vocale et le feedback IA.",
    p2Summary: 'Architecture microservices distribuée avec conteneurisation Docker et pipelines CI/CD automatisés.',
    p2Desc: "Application de sondage complète utilisant des microservices Docker avec PostgreSQL, Redis et plusieurs services backend orchestrés via docker-compose.",
    p3Summary: 'Chat temps réel inspiré de Discord avec communication WebSocket, permissions par rôles et backend Rust asynchrone.',
    p3Desc: "Plateforme de messagerie temps réel avec canaux, messages directs et contrôle d'accès basé sur les rôles utilisant Rust et Next.js.",
    p4Summary: "Pipeline CI/CD complet avec Jenkins pour les tests automatisés, l'assurance qualité et le déploiement.",
    p4Desc: "Pipeline Jenkins complet avec étapes de tests automatisés, vérifications de qualité de code et automatisation du déploiement.",
    p5Summary: 'Jeu tower defense construit avec Java et LibGDX avec patterns de conception OOP et gameplay temps réel.',
    p5Desc: 'Jeu tower defense utilisant Java et LibGDX avec conception orientée objet, gestion de sprites et boucle de jeu temps réel.',
    p6Summary: "Plateforme de matchmaking full-stack construite avec Django et Vue 3 pour connecter les gens par centres d'intérêt.",
    p6Desc: "Application web de matchmaking avec backend Django REST et frontend Vue 3, profils utilisateurs, algorithmes de matching et notifications temps réel.",
    p7Summary: 'Application portfolio single-page moderne construite avec Angular et TypeScript.',
    p7Desc: 'Site portfolio responsive utilisant Angular avec TypeScript, animations fluides et patterns de design modernes.',
    p8Summary: 'API RESTful pour la gestion des employés construite avec Spring Boot et JPA.',
    p8Desc: "API REST utilisant Spring Boot avec JPA pour les opérations CRUD employés, gestion d'erreurs et validation des données.",
    p9Summary: "Application d'accords vins et fromages pour Intermarché construite avec Bubble.io en tant que Tech Lead.",
    p9Desc: "Direction technique d'une application d'accords vins et fromages pour Intermarché utilisant Bubble.io, gestion des intégrations API et architecture de données.",
    p10Summary: "Projet d'intégration Blockchain et IA explorant les systèmes décentralisés et le machine learning.",
    p10Desc: "Système IA intégré à la blockchain combinant smart contracts et modèles de machine learning pour la prise de décision décentralisée.",
    p11Summary: 'Simulateur web FPGA pour le CNES, construit avec une UI responsive et un backend Python.',
    p11Desc: 'Simulateur FPGA web pour le CNES avec interface responsive et backend Python pour le traitement des configurations FPGA.',
    p12Summary: 'Jeu de plateforme 2D construit avec C et la bibliothèque CSFML avec physique et level design.',
    p12Desc: 'Jeu de plateforme 2D utilisant C et CSFML avec moteur physique personnalisé, animations de sprites et niveaux multiples.',
    p13Summary: "Application C++ pour calculer le chemin le plus rapide entre deux points américains avec exposition API.",
    p13Desc: "Application C++ pour calculer le plus court chemin entre des localisations américaines via une API supportant XML et JSON. En tant que Chef de Projet, j'ai dirigé l'équipe — résultant en une note de 100%.",
    p14Summary: "Réimplémentation du classique Frogger sur FPGA utilisant Verilog et la logique d'affichage VGA.",
    p14Desc: 'Recréation de Frogger sur une plateforme FPGA Go Board. Circuits synchrones, rendu VGA et gestion des sprites utilisant la Block RAM.',
    p15Summary: 'Application mobile et web de recrutement axée sur les soft skills et le matching par personnalité.',
    p15Desc: "Solution de recrutement inclusive privilégiant les qualités humaines. En tant que Program Manager, j'ai défini les orientations design et créé les documents de spécification fonctionnelle.",
    p16Summary: "Prototype de sécurisation d'équipements sportifs utilisant l'électronique embarquée et les alertes mobiles.",
    p16Desc: 'Prototype embarqué pour prévenir le vol de skis et snowboards, avec capteurs basse consommation et interface mobile connectée.',
  },

  // --- Timeline Page ---
  timeline: {
    label: 'PARCOURS',
    heading1: 'Trajectoire ',
    heading2: 'Professionnelle',
    subtitle: "Une séquence de jalons définissant mon évolution en tant que développeur. De l'apprentissage fondamental aux architectures distribuées haute performance.",
    journeyHeading: 'Le Voyage Continue',
    downloadResume: 'TÉLÉCHARGER LE CV',
    getInTouch: 'ME CONTACTER',

    exp1Period: 'FÉV 2026',
    exp1Title: "Simulateur d'Entretien VR",
    exp1Company: 'HACKATHON VISIONOS — VAINQUEUR',
    exp1Desc: "Première place pour le développement d'une suite d'entraînement immersive visionOS pour le recrutement d'entreprise avec retour biométrique temps réel et reconnaissance vocale.",
    exp1Milestone: 'PRÉSENT',
    exp1MilestoneSub: 'Vainqueur Hackathon',

    exp2Period: 'SEP 2025 — PRÉSENT',
    exp2Title: 'Étudiant Ingénieur Logiciel',
    exp2Company: 'EPITECH NANTES',
    exp2Desc: "Cursus pré-Msc à Epitech, construction de solutions numériques haute performance. Spécialisation en développement full-stack, technologies blockchain et architecture système.",
    exp2Milestone: '',
    exp2MilestoneSub: 'Études Actuelles',

    exp3Period: 'JUL — AOÛ 2025',
    exp3Title: 'Expérience Woofing',
    exp3Company: 'INTERNATIONAL',
    exp3Desc: "Expérience de woofing internationale développant l'adaptabilité, la communication interculturelle et la résolution de problèmes dans des environnements divers.",
    exp3Milestone: 'PHASE DE CROISSANCE',
    exp3MilestoneSub: '',

    exp4Period: '2023 — 2025',
    exp4Title: 'Étudiant Ingénieur Logiciel',
    exp4Company: 'ALGOSUP VIERZON',
    exp4Desc: "Programme intensif d'ingénierie logicielle couvrant C, C++, Java, Verilog, Flutter et gestion de projet. Direction de multiples projets d'équipe en tant que Chef de Projet et Tech Lead.",
    exp4Milestone: '',
    exp4MilestoneSub: 'Fondation',

    exp5Period: 'OCT 2024',
    exp5Title: 'Vainqueur Hackathon',
    exp5Company: 'HACKATHON BLOCKCHAIN X IA',
    exp5Desc: "Première place au hackathon CrippleFN Blockchain x IA, développement d'un système IA décentralisé combinant smart contracts et machine learning.",
    exp5Milestone: '',
    exp5MilestoneSub: 'Vainqueur Hackathon',

    exp6Period: '2019 — 2022',
    exp6Title: 'Baccalauréat',
    exp6Company: 'LYCÉE',
    exp6Desc: "Obtention du Baccalauréat avec spécialisations en NSI (Informatique) et Mathématiques, posant les fondations des études en ingénierie logicielle.",
    exp6Milestone: 'POINT DE DÉPART',
    exp6MilestoneSub: 'Premier Code',
  },

  // --- Contact Page ---
  contact: {
    heading1: 'Me ',
    heading2: 'Contacter',
    subtitle: "J'aimerais avoir de vos nouvelles — connectons-nous !",
    labelName: 'VOTRE NOM',
    placeholderName: 'Jean Dupont',
    labelEmail: 'VOTRE EMAIL',
    placeholderEmail: 'jean@exemple.com',
    labelMessage: 'VOTRE MESSAGE',
    placeholderMessage: 'Parlez-moi de votre projet ou idée...',
    btnSend: 'ENVOYER LE MESSAGE',
    btnSending: 'ENVOI...',
    btnSent: '✓ MESSAGE ENVOYÉ',
    downloadResume: 'TÉLÉCHARGER LE CV',
  },
};
