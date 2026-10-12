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
};

export const CV_COPY: Record<Lang, CvCopy> = {
  en: {
    headline: "Mechanical Design Engineering | Composites, FEA & Vehicle Integration",
    summary:
      "Three years of hands-on Formula Student engineering across Australia, the Netherlands and Germany, completed alongside a full degree. As a final-year Mechanical Engineering student (graduating 06.2027), my skills cover carbon fibre design and manufacture, FEA, Siemens NX, testing and validation, and Python automation.",
    skills: [
      {
        area: "CAD & Design Engineering",
        detail:
          "Siemens NX (primary), SolidWorks (basic), mechanisms and actuation, packaging, engineering drawings",
      },
      {
        area: "Composites & Manufacture",
        detail:
          "carbon fibre layup, autoclave and resin cure, mould tooling, ply nesting, FiberSim",
      },
      {
        area: "FEA & Engineering Fundamentals",
        detail:
          "hand calculations, Altair HyperMesh / OptiStruct, laminate design, correlation to test data",
      },
      {
        area: "Testing & Validation",
        detail: "3-point bending, push-through tests, purpose-built rigs",
      },
      {
        area: "System Integration",
        detail:
          "balancing requirements across subsystems, working from rules and constraints, documenting the process",
      },
      {
        area: "Software",
        detail: "Python, MATLAB, Power BI, Excel",
      },
    ],
    experience: [
      {
        title: "Structural Design Engineer (FEA)",
        org: "Écurie Aix, Formula Student Team, RWTH Aachen",
        bullets: [
          "Owned monocoque torsional stiffness development: raised it by 75% for 35% more mass, using hand calculations to set up the FEA load case",
          "Rear wing FEA gave 11% less mass than the previous year and passed the rules check",
          "Identified a resin-starvation risk through self-initiated research and good engineering practice",
          "Followed a documented engineering process from requirements to constraints and preferences",
        ],
      },
      {
        title: "Chassis Design Engineer (Composites)",
        org: "University Racing Eindhoven",
        bullets: [
          "Designed a carbon fibre monocoque from a clean sheet in Siemens NX, packaging ergonomics and harness positions around other systems",
          "Validated laminate calculations in real-life three-point bending tests on carbon fibre panels",
          "Resolved an integration issue by reorienting switches using bending-radius data from the electrical team",
          "Designed mould tooling for demouldability (3° draft, alignment features)",
        ],
      },
      {
        title: "Team Lead of Aerodynamics",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Manufactured a carbon fibre and Kevlar diffuser, accounting for material properties under bump loads and floor strikes",
        ],
      },
      {
        title: "Linear Actuation System for a Robot",
        org: "Mechanical Design Fundamentals Studio, University of Technology Sydney",
        bullets: [
          "Designed and built a DC-motor linear actuator with a guardrail; it was precise, fast and passed its design requirements, including payload",
        ],
      },
      {
        title: "Business Intelligence & Automation Developer",
        org: "Oceania Distribution (part-time)",
        bullets: [
          "Built a Python pipeline to refresh Power BI dashboards; flagged over NZ$2M in potential lost sales",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Mechanical",
        school: "Charles Darwin University",
        note: "Faculty Academic Excellence Award for a thesis on off-grid thermal comfort for a remote community in Cape York, Australia",
      },
      {
        degree: "Bachelor of Engineering (Honours), Mechanical",
        school: "University of Technology Sydney",
        note: "Transferred to Charles Darwin University in 07.2025, credits recognised. Grades: Engineering Computations 90%, Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "English (Native), French (Native), German (A2, learning)",
  },

  fr: {
    headline: "Conception mécanique | Composites, calcul FEA et intégration véhicule",
    summary:
      "Trois ans de pratique de l'ingénierie en Formula Student, en Australie, aux Pays-Bas et en Allemagne, menés en parallèle d'un cursus complet. En dernière année d'études en génie mécanique (diplôme prévu en 06.2027), mes compétences couvrent la conception et la fabrication en fibre de carbone, le calcul FEA, Siemens NX, les essais et la validation, ainsi que l'automatisation en Python.",
    skills: [
      {
        area: "CAO et conception",
        detail:
          "Siemens NX (principal), SolidWorks (notions), mécanismes et actionnement, implantation, plans techniques",
      },
      {
        area: "Composites et fabrication",
        detail:
          "drapage de fibre de carbone, autoclave et cuisson de la résine, outillage de moules, imbrication des plis, FiberSim",
      },
      {
        area: "Calcul FEA et fondamentaux de l'ingénierie",
        detail:
          "calculs à la main, Altair HyperMesh / OptiStruct, dimensionnement des stratifiés, corrélation avec les données d'essais",
      },
      {
        area: "Essais et validation",
        detail: "flexion 3 points, essais de poinçonnement, bancs d'essai conçus sur mesure",
      },
      {
        area: "Intégration système",
        detail:
          "arbitrage des exigences entre sous-systèmes, travail à partir des règlements et des contraintes, documentation de la démarche",
      },
      {
        area: "Logiciels",
        detail: "Python, MATLAB, Power BI, Excel",
      },
    ],
    experience: [
      {
        title: "Ingénierie de conception structurelle (FEA)",
        org: "Écurie Aix, équipe Formula Student, RWTH Aachen",
        bullets: [
          "Responsable du développement de la rigidité en torsion du monocoque : +75 % de rigidité pour 35 % de masse en plus, en s'appuyant sur des calculs à la main pour définir le cas de charge FEA",
          "Le calcul FEA de l'aileron arrière a donné 11 % de masse en moins que l'année précédente, et le règlement a été respecté",
          "A repéré un risque de manque de résine grâce à des recherches personnelles et aux bonnes pratiques d'ingénierie",
          "A suivi une démarche d'ingénierie documentée, des exigences jusqu'aux contraintes et aux préférences",
        ],
      },
      {
        title: "Ingénierie de conception du châssis (composites)",
        org: "University Racing Eindhoven",
        bullets: [
          "A conçu un monocoque en fibre de carbone à partir d'une feuille blanche sous Siemens NX, en intégrant l'ergonomie et la position des harnais autour des autres systèmes",
          "A validé les calculs de stratifié lors d'essais réels de flexion 3 points sur des panneaux en fibre de carbone",
          "A réglé un problème d'intégration en réorientant les interrupteurs grâce aux rayons de courbure fournis par l'équipe électrique",
          "A conçu l'outillage de moulage pour garantir le démoulage (dépouille de 3°, éléments d'alignement)",
        ],
      },
      {
        title: "Responsable de l'équipe aérodynamique",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "A fabriqué un diffuseur en fibre de carbone et Kevlar, en tenant compte du comportement des matériaux sous les charges de rebond et lors des contacts du fond plat avec la piste",
        ],
      },
      {
        title: "Système d'actionnement linéaire pour un robot",
        org: "Mechanical Design Fundamentals Studio, University of Technology Sydney",
        bullets: [
          "A conçu et construit un actionneur linéaire à moteur à courant continu avec garde-corps : précis et rapide, il a satisfait au cahier des charges, charge utile comprise",
        ],
      },
      {
        title: "Développement en business intelligence et automatisation",
        org: "Oceania Distribution (temps partiel)",
        bullets: [
          "A construit un pipeline Python qui actualise les tableaux de bord Power BI ; a mis en évidence plus de 2 M NZ$ de ventes potentiellement perdues",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, génie mécanique",
        school: "Charles Darwin University",
        note: "Prix d'excellence académique de la faculté pour un mémoire sur le confort thermique hors réseau d'une communauté isolée du Cape York, en Australie",
      },
      {
        degree: "Bachelor of Engineering (Honours), génie mécanique",
        school: "University of Technology Sydney",
        note: "Transfert à la Charles Darwin University en 07.2025, avec reconnaissance des crédits. Résultats : Engineering Computations 90 %, Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages:
      "Anglais (langue maternelle), français (langue maternelle), allemand (A2, en apprentissage)",
  },

  de: {
    headline: "Maschinenbau-Konstruktion | Verbundwerkstoffe, FEM und Fahrzeugintegration",
    summary:
      "Drei Jahre praktische Formula-Student-Ingenieurarbeit in Australien, den Niederlanden und Deutschland, neben einem vollständigen Studium. Als Maschinenbaustudierende im letzten Studienjahr (Abschluss 06.2027) deckt mein Kompetenzprofil Konstruktion und Fertigung in Carbon, FEM, Siemens NX, Prüfung und Validierung sowie Automatisierung mit Python ab.",
    skills: [
      {
        area: "CAD und Konstruktion",
        detail:
          "Siemens NX (Hauptwerkzeug), SolidWorks (Grundkenntnisse), Mechanismen und Aktorik, Package, technische Zeichnungen",
      },
      {
        area: "Verbundwerkstoffe und Fertigung",
        detail:
          "Carbon-Laminieren, Autoklav und Harzaushärtung, Formenbau, Zuschnittoptimierung der Lagen, FiberSim",
      },
      {
        area: "FEM und ingenieurwissenschaftliche Grundlagen",
        detail:
          "Handrechnungen, Altair HyperMesh / OptiStruct, Laminatauslegung, Abgleich mit Versuchsdaten",
      },
      {
        area: "Prüfung und Validierung",
        detail: "3-Punkt-Biegeversuche, Durchdrückversuche, eigens gebaute Prüfstände",
      },
      {
        area: "Systemintegration",
        detail:
          "Anforderungen über Subsysteme hinweg abwägen, Arbeiten auf Basis von Reglement und Randbedingungen, Dokumentation des Vorgehens",
      },
      {
        area: "Software",
        detail: "Python, MATLAB, Power BI, Excel",
      },
    ],
    experience: [
      {
        title: "Strukturkonstruktion (FEM)",
        org: "Écurie Aix, Formula-Student-Team, RWTH Aachen",
        bullets: [
          "Verantwortung für die Entwicklung der Torsionssteifigkeit des Monocoques: 75 % mehr Steifigkeit bei 35 % mehr Masse, wobei Handrechnungen den FEM-Lastfall festlegten",
          "Die FEM-Auslegung des Heckflügels ergab 11 % weniger Masse als im Vorjahr und bestand die Reglementprüfung",
          "Ein Risiko für Harzmangel wurde durch eigene Recherche und gute Ingenieurpraxis erkannt",
          "Arbeit nach einem dokumentierten Entwicklungsprozess, von den Anforderungen bis zu Randbedingungen und Präferenzen",
        ],
      },
      {
        title: "Chassis-Konstruktion (Verbundwerkstoffe)",
        org: "University Racing Eindhoven",
        bullets: [
          "Ein Carbon-Monocoque in Siemens NX von Grund auf neu konstruiert und dabei Ergonomie und Gurtpositionen um die übrigen Systeme herum untergebracht",
          "Laminatberechnungen in realen 3-Punkt-Biegeversuchen an Carbonplatten bestätigt",
          "Ein Integrationsproblem gelöst, indem die Schalter anhand der Biegeradien des Elektrik-Teams neu ausgerichtet wurden",
          "Formwerkzeuge entformungsgerecht ausgelegt (3° Entformungsschräge, Ausrichtelemente)",
        ],
      },
      {
        title: "Teamleitung Aerodynamik",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Einen Diffusor aus Carbon und Kevlar gefertigt und dabei das Materialverhalten bei Stoßlasten und Bodenberührungen berücksichtigt",
        ],
      },
      {
        title: "Linearaktuator für einen Roboter",
        org: "Mechanical Design Fundamentals Studio, University of Technology Sydney",
        bullets: [
          "Einen Linearaktuator mit Gleichstrommotor und Schutzgeländer konstruiert und gebaut; er arbeitete präzise und schnell und erfüllte die Anforderungen, einschließlich der Nutzlast",
        ],
      },
      {
        title: "Entwicklung in Business Intelligence und Automatisierung",
        org: "Oceania Distribution (Teilzeit)",
        bullets: [
          "Eine Python-Pipeline aufgebaut, die Power-BI-Dashboards aktualisiert; sie machte potenziell entgangene Umsätze von über 2 Mio. NZ$ sichtbar",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Maschinenbau",
        school: "Charles Darwin University",
        note: "Fakultätspreis für akademische Exzellenz für eine Arbeit zum netzunabhängigen thermischen Komfort einer abgelegenen Gemeinde in Cape York, Australien",
      },
      {
        degree: "Bachelor of Engineering (Honours), Maschinenbau",
        school: "University of Technology Sydney",
        note: "Wechsel an die Charles Darwin University im 07.2025, Leistungen anerkannt. Noten: Engineering Computations 90 %, Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "Englisch (Muttersprache), Französisch (Muttersprache), Deutsch (A2, in Lernphase)",
  },

  nl: {
    headline: "Werktuigbouwkundig ontwerp | Composieten, FEA en voertuigintegratie",
    summary:
      "Drie jaar praktische Formula Student-engineering in Australië, Nederland en Duitsland, naast een volledige opleiding. Als werktuigbouwkundestudent in het laatste jaar (afstuderen 06.2027) omvatten mijn vaardigheden ontwerp en productie van koolstofvezel, FEA, Siemens NX, testen en valideren, en automatisering met Python.",
    skills: [
      {
        area: "CAD en ontwerp",
        detail:
          "Siemens NX (hoofdpakket), SolidWorks (basis), mechanismen en aandrijving, inpassing, technische tekeningen",
      },
      {
        area: "Composieten en productie",
        detail:
          "koolstofvezel leggen, autoclaaf en uitharding van hars, matrijzenbouw, plylagen nesten, FiberSim",
      },
      {
        area: "FEA en technische basis",
        detail:
          "handberekeningen, Altair HyperMesh / OptiStruct, laminaatontwerp, correlatie met testdata",
      },
      {
        area: "Testen en valideren",
        detail: "driepuntsbuigproeven, doorduwproeven, speciaal gebouwde proefopstellingen",
      },
      {
        area: "Systeemintegratie",
        detail:
          "eisen afwegen over subsystemen heen, werken vanuit reglement en randvoorwaarden, het proces documenteren",
      },
      {
        area: "Software",
        detail: "Python, MATLAB, Power BI, Excel",
      },
    ],
    experience: [
      {
        title: "Constructieontwerper (FEA)",
        org: "Écurie Aix, Formula Student-team, RWTH Aachen",
        bullets: [
          "Verantwoordelijk voor de ontwikkeling van de torsiestijfheid van de monocoque: 75% stijver voor 35% meer massa, waarbij handberekeningen het FEA-belastinggeval bepaalden",
          "De FEA van de achtervleugel leverde 11% minder massa op dan het jaar ervoor en voldeed aan de reglementscontrole",
          "Een risico op harsgebrek werd opgespoord door eigen onderzoek en goede ingenieurspraktijk",
          "Werkte volgens een gedocumenteerd engineeringproces, van eisen tot randvoorwaarden en voorkeuren",
        ],
      },
      {
        title: "Chassisontwerper (composieten)",
        org: "University Racing Eindhoven",
        bullets: [
          "Een koolstofvezelmonocoque vanaf nul ontworpen in Siemens NX, met ergonomie en gordelposities ingepast rond de andere systemen",
          "Laminaatberekeningen gevalideerd in echte driepuntsbuigproeven op koolstofvezelpanelen",
          "Een integratieprobleem opgelost door schakelaars te heroriënteren aan de hand van buigradiusgegevens van het elektroteam",
          "Matrijzen ontworpen met oog voor ontvormbaarheid (3° ontwerphoek, uitlijnkenmerken)",
        ],
      },
      {
        title: "Teamleider aerodynamica",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Een diffuser van koolstofvezel en Kevlar gemaakt, rekening houdend met het materiaalgedrag bij hobbelbelasting en contact van de bodem met het wegdek",
        ],
      },
      {
        title: "Lineair aandrijfsysteem voor een robot",
        org: "Mechanical Design Fundamentals Studio, University of Technology Sydney",
        bullets: [
          "Een lineaire aandrijving met gelijkstroommotor en geleiderail ontworpen en gebouwd; die was nauwkeurig en snel en voldeed aan de ontwerpeisen, inclusief de lading",
        ],
      },
      {
        title: "Ontwikkelaar business intelligence en automatisering",
        org: "Oceania Distribution (parttime)",
        bullets: [
          "Een Python-pipeline gebouwd die Power BI-dashboards ververst; die signaleerde meer dan NZ$ 2 miljoen aan mogelijk gemiste verkoop",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, werktuigbouwkunde",
        school: "Charles Darwin University",
        note: "Faculty Academic Excellence Award voor een scriptie over thermisch comfort off-grid voor een afgelegen gemeenschap in Cape York, Australië",
      },
      {
        degree: "Bachelor of Engineering (Honours), werktuigbouwkunde",
        school: "University of Technology Sydney",
        note: "Overgestapt naar Charles Darwin University in 07.2025, vrijstellingen erkend. Resultaten: Engineering Computations 90%, Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages: "Engels (moedertaal), Frans (moedertaal), Duits (A2, aan het leren)",
  },
};
