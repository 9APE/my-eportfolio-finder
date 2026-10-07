import type { Lang } from "./config";

/**
 * CV prose in every language. Written to read naturally in each language, keeping the
 * meaning, figures and tools of the English CV (public/Aurelien_Pons_CV.pdf) unchanged.
 * Typed as Record<Lang, CvCopy>, so a missing language fails the build, and the
 * experience / education entries line up by index with the dates in data/cv.ts.
 *
 * Wording is kept neutral where a language would otherwise force a grammatical gender.
 * Tool names, team names and course names are proper nouns and stay as written.
 */
export type CvCopy = {
  headline: string;
  summary: string;
  skills: { area: string; detail: string }[];
  experience: { title: string; org: string; note?: string; bullets: string[] }[];
  education: { degree: string; school: string; note: string }[];
  languages: string;
  citizenship: string;
};

export const CV_COPY: Record<Lang, CvCopy> = {
  en: {
    headline: "Mechanical Engineering – Composites, Structural Analysis, Design & Integration",
    summary:
      "Final-year Mechanical Engineering student with three years of hands-on Formula Student experience across carbon fibre design, FEA, testing and team leadership. Helped Écurie Aix place 2nd at Formula Student Germany 2026 (400+ teams) with a stiffer, more reliable monocoque. Also builds Python, data and AI tools. Seeking internships and graduate roles, ready to relocate. French and Australian citizen based in Aachen, Germany.",
    skills: [
      {
        area: "Composite Structures & FEA",
        detail:
          "Altair HyperMesh / OptiStruct, laminate design, hand-calculation checks, correlation to test data",
      },
      {
        area: "Composite Design & Manufacturing",
        detail:
          "Layup, autoclave and resin cure, void avoidance, ply cutting and nesting, mould tooling, FiberSim",
      },
      {
        area: "CAD & Design Engineering",
        detail:
          "Siemens NX (primary), SolidWorks (basic), packaging, engineering drawings, documentation",
      },
      {
        area: "Testing & Fault Finding",
        detail: "3-point bending, push-through, cross-section failure analysis",
      },
      {
        area: "Systems Integration & Leadership",
        detail:
          "Cross-team conflict resolution, led a 25-person team, requirements from rules and stakeholders",
      },
      {
        area: "Programming, Data & AI",
        detail: "Python, MATLAB, Power BI, Excel; builds AI-powered software",
      },
    ],
    experience: [
      {
        title: "Chassis & Structural Design Engineer",
        org: "Écurie Aix, Formula Student Team, RWTH Aachen",
        note: "2nd at Formula Student Germany 2026",
        bullets: [
          "Raised monocoque torsional stiffness by 75% for 35% more mass",
          "Ran FEA in Altair HyperMesh, checking every run with hand calculations first",
          "Correlated FEA to physical test data within ~2% error",
          "Found a resin-starvation risk by cross-sectioning a sample",
          "Rear wing FEA gave 11% less mass than the previous year and passed the rules check",
          "Resolved a packaging conflict between the structures and electrical sub-teams",
        ],
      },
      {
        title: "Chassis Design Engineer (Composites)",
        org: "University Racing Eindhoven",
        bullets: [
          "Designed a carbon fibre monocoque from a clean sheet in Siemens NX (packaging, ergonomics, harness positions)",
          "Validated driver field of view on a purpose-built adjustable rig",
          "Designed mould tooling for demouldability (3° draft, alignment features)",
          "Ran 3-point bending and push-through tests on carbon fibre panels",
        ],
      },
      {
        title: "Team Lead of Aerodynamics",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Led a 25-person team designing aero components, including a rear diffuser, in Siemens NX with CFD",
        ],
      },
      {
        title: "Business Intelligence & Automation Developer",
        org: "Oceania Distribution (part-time)",
        bullets: [
          "Built a Python pipeline and Power BI dashboards; the analysis tool flagged over NZ$2M in potential lost sales",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Mechanical",
        school: "Charles Darwin University, Australia",
        note: "Faculty Academic Excellence Award, ENG423 (CDU), for an off-grid thermal comfort system for a remote community in Cape York",
      },
      {
        degree: "Bachelor of Engineering (Honours), Mechanical",
        school: "University of Technology Sydney, Australia",
        note: "Transferred to Charles Darwin University in 07.2025, credits recognised. Relevant coursework: Engineering Computations (High Distinction, 90), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "English (Native), French (Native), German (A2, learning)",
    citizenship: "French and Australian",
  },

  fr: {
    headline: "Génie mécanique – Composites, analyse structurelle, conception et intégration",
    summary:
      "En dernière année d'études en génie mécanique, avec trois ans d'expérience pratique en Formula Student : conception en fibre de carbone, calcul par éléments finis (FEA), essais et encadrement d'équipe. A contribué à la 2e place d'Écurie Aix à la Formula Student Germany 2026 (plus de 400 équipes) grâce à un monocoque plus rigide et plus fiable. Développe aussi des outils en Python, d'analyse de données et d'IA. Recherche des stages et des postes de jeune diplômé, avec une mobilité géographique totale. De nationalités française et australienne, résidant à Aix-la-Chapelle, en Allemagne.",
    skills: [
      {
        area: "Structures composites et calcul FEA",
        detail:
          "Altair HyperMesh / OptiStruct, dimensionnement des stratifiés, vérification par calculs à la main, corrélation avec les données d'essais",
      },
      {
        area: "Conception et fabrication de composites",
        detail:
          "Drapage, autoclave et cuisson de la résine, prévention des porosités, découpe et imbrication des plis, outillage de moules, FiberSim",
      },
      {
        area: "CAO et conception mécanique",
        detail:
          "Siemens NX (principal), SolidWorks (notions), implantation et encombrement, plans techniques, documentation",
      },
      {
        area: "Essais et diagnostic de défaillances",
        detail: "Flexion 3 points, poinçonnement (push-through), analyse de rupture sur coupe transversale",
      },
      {
        area: "Intégration de systèmes et leadership",
        detail:
          "Résolution de conflits entre équipes, direction d'une équipe de 25 personnes, définition des exigences à partir du règlement et des parties prenantes",
      },
      {
        area: "Programmation, données et IA",
        detail: "Python, MATLAB, Power BI, Excel ; développement de logiciels basés sur l'IA",
      },
    ],
    experience: [
      {
        title: "Ingénieur conception châssis et structures",
        org: "Écurie Aix, équipe Formula Student, RWTH Aachen",
        note: "2e à la Formula Student Germany 2026",
        bullets: [
          "Rigidité en torsion du monocoque augmentée de 75 % pour 35 % de masse en plus",
          "Simulations FEA sous Altair HyperMesh, chaque calcul étant d'abord vérifié à la main",
          "Corrélation de la FEA avec les essais physiques, avec un écart d'environ 2 %",
          "Détection d'un risque de manque de résine grâce à la coupe d'un échantillon",
          "FEA de l'aileron arrière : 11 % de masse en moins que l'année précédente, et conformité au règlement validée",
          "Résolution d'un conflit d'implantation entre les sous-équipes structures et électrique",
        ],
      },
      {
        title: "Ingénieur conception châssis (composites)",
        org: "University Racing Eindhoven",
        bullets: [
          "Conception d'un monocoque en fibre de carbone à partir d'une feuille blanche sous Siemens NX (implantation, ergonomie, position des harnais)",
          "Validation du champ de vision du pilote sur un banc réglable conçu pour l'occasion",
          "Conception de l'outillage de moules pour faciliter le démoulage (dépouille de 3°, éléments d'alignement)",
          "Essais de flexion 3 points et de poinçonnement sur des panneaux en fibre de carbone",
        ],
      },
      {
        title: "Responsable de l'équipe aérodynamique",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Direction d'une équipe de 25 personnes chargée de concevoir des éléments aérodynamiques, dont un diffuseur arrière, sous Siemens NX avec simulation CFD",
        ],
      },
      {
        title: "Développeur en business intelligence et automatisation",
        org: "Oceania Distribution (temps partiel)",
        bullets: [
          "Création d'un pipeline Python et de tableaux de bord Power BI ; l'outil d'analyse a repéré plus de 2 M NZ$ de ventes potentiellement perdues",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering en génie mécanique",
        school: "Charles Darwin University, Australie",
        note: "Prix d'excellence académique de la faculté (ENG423, CDU) pour un système de confort thermique autonome, hors réseau, destiné à une communauté isolée du Cape York",
      },
      {
        degree: "Bachelor of Engineering (Honours) en génie mécanique",
        school: "University of Technology Sydney, Australie",
        note: "Transfert vers la Charles Darwin University en 07.2025, avec reconnaissance des crédits. Cours pertinents : Engineering Computations (High Distinction, 90), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "Anglais (langue maternelle), français (langue maternelle), allemand (A2, en apprentissage)",
    citizenship: "Française et australienne",
  },

  de: {
    headline: "Maschinenbau – Verbundwerkstoffe, Strukturanalyse, Konstruktion und Integration",
    summary:
      "Maschinenbaustudium im Abschlussjahr mit drei Jahren praktischer Formula-Student-Erfahrung in CFK-Konstruktion, FEM-Analyse, Prüfung und Teamführung. Hat dazu beigetragen, dass Écurie Aix bei der Formula Student Germany 2026 (über 400 Teams) den 2. Platz belegte, mit einem steiferen und zuverlässigeren Monocoque. Entwickelt außerdem Werkzeuge in Python, für Datenanalyse und mit KI. Sucht Praktika und Einstiegsstellen für Absolventen und ist zum Umzug bereit. Mit französischer und australischer Staatsbürgerschaft, wohnhaft in Aachen.",
    skills: [
      {
        area: "Verbundstrukturen und FEM",
        detail:
          "Altair HyperMesh / OptiStruct, Laminatauslegung, Plausibilisierung per Handrechnung, Abgleich mit Prüfdaten",
      },
      {
        area: "Konstruktion und Fertigung von Verbundbauteilen",
        detail:
          "Laminataufbau (Layup), Autoklav und Harzaushärtung, Vermeidung von Lunkern, Zuschnitt und Nesting der Lagen, Formenbau, FiberSim",
      },
      {
        area: "CAD und Konstruktion",
        detail:
          "Siemens NX (primär), SolidWorks (Grundkenntnisse), Bauraumplanung, technische Zeichnungen, Dokumentation",
      },
      {
        area: "Prüfung und Fehlersuche",
        detail:
          "3-Punkt-Biegeversuch, Durchdrückversuch (Push-through), Fehleranalyse am Querschnitt",
      },
      {
        area: "Systemintegration und Führung",
        detail:
          "Konfliktlösung zwischen Teams, Leitung eines 25-köpfigen Teams, Ableitung von Anforderungen aus Regelwerk und Stakeholdern",
      },
      {
        area: "Programmierung, Daten und KI",
        detail: "Python, MATLAB, Power BI, Excel; entwickelt KI-gestützte Software",
      },
    ],
    experience: [
      {
        title: "Konstrukteur Chassis und Struktur",
        org: "Écurie Aix, Formula-Student-Team, RWTH Aachen",
        note: "2. Platz bei der Formula Student Germany 2026",
        bullets: [
          "Torsionssteifigkeit des Monocoques um 75 % gesteigert, bei 35 % mehr Masse",
          "FEM-Berechnungen in Altair HyperMesh, jede Rechnung zuvor per Handrechnung plausibilisiert",
          "FEM mit physischen Prüfdaten abgeglichen, mit rund 2 % Abweichung",
          "Risiko von Harzmangel durch den Querschnitt einer Probe entdeckt",
          "FEM des Heckflügels ergab 11 % weniger Masse als im Vorjahr; Regelwerksprüfung bestanden",
          "Bauraumkonflikt zwischen den Teilteams Struktur und Elektrik gelöst",
        ],
      },
      {
        title: "Konstrukteur Chassis (Verbundwerkstoffe)",
        org: "University Racing Eindhoven",
        bullets: [
          "Carbon-Monocoque komplett neu in Siemens NX konstruiert (Bauraum, Ergonomie, Gurtpositionen)",
          "Sichtfeld des Fahrers auf einem eigens gebauten, verstellbaren Prüfstand validiert",
          "Formwerkzeuge entformungsgerecht ausgelegt (3° Entformungsschräge, Positionierelemente)",
          "3-Punkt-Biege- und Durchdrückversuche an Carbonplatten durchgeführt",
        ],
      },
      {
        title: "Teamleiter Aerodynamik",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Leitung eines 25-köpfigen Teams, das Aerodynamikkomponenten, darunter einen Heckdiffusor, in Siemens NX mit CFD entwickelte",
        ],
      },
      {
        title: "Entwickler für Business Intelligence und Automatisierung",
        org: "Oceania Distribution (Teilzeit)",
        bullets: [
          "Python-Pipeline und Power-BI-Dashboards aufgebaut; das Analysewerkzeug deckte potenziell entgangene Umsätze von über 2 Mio. NZ$ auf",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Maschinenbau",
        school: "Charles Darwin University, Australien",
        note: "Faculty Academic Excellence Award (ENG423, CDU) für ein netzunabhängiges System zur Raumklimatisierung einer abgelegenen Gemeinde auf Cape York",
      },
      {
        degree: "Bachelor of Engineering (Honours), Maschinenbau",
        school: "University of Technology Sydney, Australien",
        note: "Wechsel an die Charles Darwin University im 07.2025, Studienleistungen anerkannt. Relevante Kurse: Engineering Computations (High Distinction, 90), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "Englisch (Muttersprache), Französisch (Muttersprache), Deutsch (A2, in Lernphase)",
    citizenship: "Französisch und australisch",
  },

  nl: {
    headline: "Werktuigbouwkunde – composieten, constructieanalyse, ontwerp en integratie",
    summary:
      "Laatstejaars werktuigbouwkunde met drie jaar praktijkervaring in Formula Student: carbonontwerp, FEA, testen en teamleiding. Droeg bij aan de 2e plaats van Écurie Aix op de Formula Student Germany 2026 (meer dan 400 teams) met een stijvere, betrouwbaardere monocoque. Bouwt daarnaast tools in Python, voor data-analyse en met AI. Op zoek naar stages en functies voor starters, bereid te verhuizen. Met de Franse en Australische nationaliteit, woonachtig in Aken, Duitsland.",
    skills: [
      {
        area: "Composietconstructies en FEA",
        detail:
          "Altair HyperMesh / OptiStruct, laminaatontwerp, controleberekeningen met de hand, correlatie met testdata",
      },
      {
        area: "Composietontwerp en -productie",
        detail:
          "Lamineren (lay-up), autoclaaf en harsuitharding, voorkomen van luchtinsluitingen (voids), plies snijden en nesten, matrijzenbouw, FiberSim",
      },
      {
        area: "CAD en ontwerp",
        detail:
          "Siemens NX (primair), SolidWorks (basis), inpassing, technische tekeningen, documentatie",
      },
      {
        area: "Testen en foutopsporing",
        detail: "3-puntsbuigproef, push-through-proef, breukanalyse op doorsneden",
      },
      {
        area: "Systeemintegratie en leiderschap",
        detail:
          "Conflicten tussen teams oplossen, leiding over een team van 25 personen, eisen afleiden uit reglement en stakeholders",
      },
      {
        area: "Programmeren, data en AI",
        detail: "Python, MATLAB, Power BI, Excel; bouwt AI-gestuurde software",
      },
    ],
    experience: [
      {
        title: "Ontwerpingenieur chassis en constructie",
        org: "Écurie Aix, Formula Student-team, RWTH Aachen",
        note: "2e op de Formula Student Germany 2026",
        bullets: [
          "Torsiestijfheid van de monocoque met 75% verhoogd voor 35% extra massa",
          "FEA uitgevoerd in Altair HyperMesh, waarbij elke run eerst met handberekeningen werd gecontroleerd",
          "FEA gecorreleerd aan fysieke testdata met een afwijking van ±2%",
          "Risico op harsgebrek ontdekt door een monster door te snijden",
          "FEA van de achtervleugel leverde 11% minder massa op dan vorig jaar en voldeed aan de reglementscontrole",
          "Inpassingsconflict tussen de subteams constructie en elektronica opgelost",
        ],
      },
      {
        title: "Ontwerpingenieur chassis (composieten)",
        org: "University Racing Eindhoven",
        bullets: [
          "Een carbon monocoque volledig vanaf nul ontworpen in Siemens NX (inpassing, ergonomie, positie van de gordels)",
          "Het gezichtsveld van de coureur gevalideerd op een speciaal gebouwde, verstelbare opstelling",
          "Matrijsgereedschap ontworpen met het oog op ontvormbaarheid (3° ontvormhoek, uitlijnelementen)",
          "3-puntsbuig- en push-through-proeven uitgevoerd op carbonpanelen",
        ],
      },
      {
        title: "Teamleider aerodynamica",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Leiding over een team van 25 personen dat aerodynamische onderdelen ontwierp, waaronder een achterdiffusor, in Siemens NX met CFD",
        ],
      },
      {
        title: "Ontwikkelaar business intelligence en automatisering",
        org: "Oceania Distribution (parttime)",
        bullets: [
          "Een Python-pipeline en Power BI-dashboards gebouwd; de analysetool signaleerde meer dan NZ$ 2 miljoen aan mogelijk gemiste omzet",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Werktuigbouwkunde",
        school: "Charles Darwin University, Australië",
        note: "Faculty Academic Excellence Award (ENG423, CDU) voor een off-grid systeem voor thermisch comfort voor een afgelegen gemeenschap op Cape York",
      },
      {
        degree: "Bachelor of Engineering (Honours), Werktuigbouwkunde",
        school: "University of Technology Sydney, Australië",
        note: "Overgestapt naar de Charles Darwin University in 07.2025, studiepunten erkend. Relevante vakken: Engineering Computations (High Distinction, 90), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "Engels (moedertaal), Frans (moedertaal), Duits (A2, aan het leren)",
    citizenship: "Frans en Australisch",
  },
};
