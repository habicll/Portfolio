import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {
  selectedProject: any = null;

  projects = [
    {
      title: 'Accords Fromages et Vins ~ Intermarché',
      period: 'Apr 2025 - Jun 2025',
      association: 'Algosup',
      summary: 'A web app to recommend wine and cheese pairings based on dishes, fully built on Bubble.io.',
      description: `Intermarché wanted to offer its customers a digital assistant for pairing cheeses and wines. 
      Our mission was to design, prototype, and deploy a web application based on Intermarché’s product database. 
      As Tech Leader, I oversaw the technical direction, ensured architectural consistency, wrote and maintained the 
      product documentation, and guaranteed accessibility and clarity for a technical audience.`,
      skills: ['Data Management', 'API', 'Technical Writing', 'Technical Leadership', 'Bubble.io', 'Markdown'],
      link: 'https://github.com/algosup/2024-2025-project-5-bubble-intermarche-team-6',
      image: '/Inter.jpeg'

    },
    {
      title: 'Hackathon Blockchain x AI ~ XRP Ledger',
      period: 'May 2025',
      summary: 'CrippleFN — a blockchain-powered platform for combating fake news using AI and community validation.',
      description: `We built CrippleFN, a platform promoting transparency and accuracy in information using AI, 
      citizen participation, and blockchain traceability. The goal was to assign a timestamped, tamper-proof 
      “trust score” to each piece of content to restore confidence in information.`,
      skills: ['AI', 'Python', 'Blockchain', 'Postman API', 'Problem Solving', 'System Design'],
      link: 'https://github.com/CrippleFN',
      image: '/Cripple.jpeg',

    },
    {
      title: 'Web Interface for FPGA Simulator ~ CNES',
      period: 'Feb 2025 - Mar 2025',
      association: 'Algosup',
      summary: 'Educational web prototype for visualizing signal propagation in FPGA architectures.',
      description: `We designed and prototyped a web app to teach signal propagation inside FPGAs (NanoXplore NGultra, Xilinx 7). 
      It merges 2D floorplan visualization with temporal simulation data. As technical writer, I produced the user manual and 
      installation guide for our interactive teaching tool.`,
      skills: ['Technical Writing', 'Waterfall Method', 'Customer Satisfaction', 'Documentation'],
      link: 'https://github.com/algosup/2024-2025-project-4-web-fpga-team-5',
      image: '/Cnes.jpeg',

    },
    {
      title: 'Hackathon GenAI ~ SIA Partners',
      period: 'Jan 2025 - Feb 2025',
      summary: 'Fichotron – AI, an app to merge and enrich public and internal data for generating client profiles.',
      description: `We developed Fichotron – AI, a web application to automate data aggregation and document generation 
      for SFIL. Built with a responsive UI and Python backend, it merged public and internal datasets to create customized client profiles.`,
      skills: ['Python', 'AWS', 'HTML', 'CSS', 'Generative AI', 'Data Management'],
      link: 'https://github.com/GenAI_hackaton',
      image: '/fichotron.JPG',

    },
    {
      title: 'Quickest Path',
      period: 'Jan 2025 - Feb 2025',
      association: 'Algosup',
      summary: 'C++ app to compute the fastest route between two US points with API exposure and optimization goals.',
      description: `We developed a C++ application to calculate the shortest path between U.S. locations using an API supporting XML and JSON. 
      As Project Manager, I led the team, planned milestones, assigned tasks, and delivered documentation — resulting in a 100% project grade.`,
      skills: ['C++', 'Project Management', 'Agile/Waterfall', 'GitHub', 'Team Leadership'],
      link: 'https://github.com/algosup/2024-2025-project-3-quickest-path-team-5',
      image: '/Quickestpath.png',

    },
    {
      title: 'Frogger FPGA',
      period: 'Sep 2024 - Oct 2024',
      association: 'Algosup',
      summary: 'Reimplementation of the classic Frogger game on FPGA using Verilog and VGA display logic.',
      description: `As software developer, I recreated Frogger on a Go Board FPGA platform. 
      We designed synchronous circuits, VGA rendering, and sprite management using Block RAM.`,
      skills: ['Verilog', 'FPGA', 'Software Development', 'Problem Solving'],
      link: 'https://github.com/algosup/2024-2025-project-1-fpga-team-2',
      image: '/frogger.jpeg',

    },
    {
      title: 'Hackathon Blockchain ~ Avalanche',
      period: 'Oct 2024',
      summary: 'First-place project: tokenizing NFC-equipped toys linked to NFTs on Avalanche blockchain.',
      description: `During an Avalanche hackathon, our team built a system linking physical toys with NFTs 
      via embedded NFC chips — enabling minting and blockchain transactions directly from the toy.`,
      skills: ['Blockchain', 'NFC', 'Smart Contracts', 'Hackathon Development'],
      link: 'https://github.com/hackaton-blockchain-vierzon-2024',
      image: '/mooguis.png',

    },
    {
      title: 'Adopte Un Candidat ~ We Are Evolution',
      period: 'Apr 2024 - Jun 2024',
      association: 'Algosup',
      summary: 'A mobile and web recruitment app focusing on soft skills and personality-driven matching.',
      description: `We designed and prototyped an inclusive recruitment solution prioritizing human qualities 
      over appearance or degrees. As Program Manager, I defined design directions and created a functional 
      specification document with UI mockups.`,
      skills: ['Program Management', 'UX/UI', 'Canva', 'Functional Specs'],
      link: 'https://github.com/algosup/2023-2024-project-5-flutter-team-3',
      image: '/evolution.png',

    },
    {
      title: 'SportShield ~ Corris Innovation',
      period: 'Mar 2024 - Apr 2024',
      association: 'Algosup',
      summary: 'Prototype for securing sports gear using embedded electronics and mobile alerts.',
      description: `We created an embedded prototype to prevent theft or tampering of skis and snowboards, 
      featuring low-power sensors and a connected mobile interface. As QA, I wrote and executed test specifications.`,
      skills: ['Quality Assurance', 'Test Planning', 'GitHub', 'Markdown'],
      link: 'https://github.com/algosup/2023-2024-project-4-SPORTSHIELD-team-4',
      image: '/coris.png',

    },
    {
      title: 'Employee API ~ OWN',
      date: 'Aug 2025',
      summary:
        'Built a RESTful Employee Management API with CRUD operations using Spring Boot and JPA.',
      description:
        'Developed a RESTful API for employee management featuring CRUD endpoints (POST/GET/PUT/DELETE) implemented via Spring Boot. Integrated persistence with H2 and JPA, and used Lombok to simplify boilerplate code. The project focused on clean backend architecture and reproducible Maven configuration.',
      skills: [
        'Spring Boot',
        'Spring Data JPA',
        'REST',
        'H2',
        'Java 21',
        'Lombok',
        'CRUD',
        'SQL',
        'Unit Testing',
      ],
      github: '',
      image: '/java.png',
    },
    {
      title: 'Grape',
      date: 'Sep 2025',
      summary:
        'Single-page web app built with Angular showcasing digital portfolio and content navigation.',
      description:
        'Grape is a fast, modular SPA built with Angular and TypeScript that acts as a digital resume. I designed and developed the front-end architecture, routing system, and responsive interface while managing JSON-based content and optimizing performance for smaller bundle sizes.',
      skills: [
        'Angular',
        'TypeScript',
        'HTML',
        'CSS',
        'Responsive Design',
        'JSON',
        'Git',
        'SPA',
      ],
      github:
        'https://github.com/EpitechMscProPromo2028/T-WEB-500-digitalResume-NAN_habi-cailleau',
      image: '/grape.jpg',
    },
    {
      title: 'LinkUp ~ Epitech',
      period: 'Oct 2024 - Present',
      summary: 'Web matchmaking platform built with Django REST and Vue 3 for company-candidate connections.',
      description: `I built a Django REST backend (Token Auth, dj-rest-auth) with a Vue 3 + Vite frontend to enable 
      job posting, applications, and admin management. Focused on API integration, migrations, and authentication flows.`,
      skills: ['Django', 'Vue 3', 'Vite', 'Axios', 'REST API', 'MySQL'],
      link: 'https://github.com/EpitechMscProPromo2028/T-WEB-501-NAN_2',
      image: '/linkup.jpeg',

    }
  ];

  openProject(project: any) {
    this.selectedProject = project;
  }

  closeProject() {
    this.selectedProject = null;
  }
}