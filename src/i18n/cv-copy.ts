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
    headline: "Mechanical Design Engineer | Vehicle Structures, CAE, Composites",
    summary:
      "Three years of hands-on work as a structural and chassis design engineer in student racing initiatives, alongside my mechanical engineering degree. I take vehicle parts from CAD design to simulation, testing and manufacture: I designed a carbon fibre monocoque from a clean sheet, raised its torsional stiffness by 75% and validated my simulations against physical tests. I graduate in mid 2027. Portfolio of my work: eportfolioaurelien.today",
    skills: [
      {
        area: "CAD and design",
        detail:
          "Siemens NX with parametric modelling, packaging and integration, engineering drawing, design for manufacture",
      },
      {
        area: "CAE",
        detail:
          "FEA (Altair HyperMesh, OptiStruct), modal analysis, topology optimisation, CFD (Siemens Star-CCM+)",
      },
      {
        area: "Composites and test",
        detail:
          "carbon fibre laminate design, mould tooling, 3-point bending and push-through testing, test rigs",
      },
      {
        area: "Data and tools",
        detail: "MATLAB, Python, Excel, Power BI, technical documentation",
      },
    ],
    experience: [
      {
        title: "Aerodynamics Engineer",
        org: "Écurie Aix (Formula Student, Aachen, Germany)",
        bullets: [
          "Ran CFD on an aerodynamic cover and redesigned a surface discontinuity to stop flow separation.",
          "Coordinating a five-person full-car FEA model and teaching new members FEA.",
        ],
      },
      {
        title: "Structural Design Engineer (FEA)",
        org: "Écurie Aix (Formula Student, Aachen, Germany)",
        bullets: [
          "Optimised monocoque geometry and composite layup, increasing torsional stiffness by 75%.",
          "Validated the FEA against physical test data: results within a 2% error margin.",
          "Reduced rear wing mass by 11% with FEA while passing the competition structural rules.",
          "Introduced an engineering logbook system now used by the whole initiative.",
        ],
      },
      {
        title: "Chassis Design Engineer (Composites)",
        org: "University Racing Eindhoven (Netherlands)",
        bullets: [
          "Designed a carbon fibre monocoque from a clean sheet in Siemens NX.",
          "Designed the mould tooling for manufacture, with draft angles and pin alignment.",
          "Built test jigs and validated laminate calculations in 3-point bending tests.",
          "Ran interface meetings between engineering groups to solve packaging issues.",
        ],
      },
      {
        title: "Team Lead of Aerodynamics",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Manufactured a carbon fibre and Kevlar diffuser designed for bump loads and floor strikes.",
          "Recruited two team members and placed them in roles using skills tests.",
        ],
      },
      {
        title: "Business Intelligence & Automation Developer",
        org: "Oceania Distribution (part-time)",
        bullets: [
          "Built a Python pipeline that cleans raw sales data and refreshes Power BI reports on sales, forecasts and missed sales.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Mechanical",
        school: "Charles Darwin University, Australia",
        note: "Faculty Academic Excellence Award for my thesis on off-grid thermal comfort in Cape York, Australia.",
      },
      {
        degree: "Bachelor of Engineering (Honours), Mechanical",
        school: "University of Technology Sydney",
        note: "Credits transferred to Charles Darwin University in 07.2025. Relevant coursework: Engineering Computations (High Distinction), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages:
      "English (native), French (native), German (A2, learning). French and Australian citizen.",
  },

  fr: {
    headline: "Conception mécanique | Structures de véhicule, CAE, composites",
    summary:
      "Trois ans de travail concret dans des fonctions de conception structurelle et de châssis au sein d'initiatives de course étudiantes, en parallèle de mon cursus en génie mécanique. Je mène les pièces de véhicule de la conception CAO à la simulation, aux essais et à la fabrication : j'ai conçu un monocoque en fibre de carbone à partir d'une feuille blanche, augmenté sa rigidité en torsion de 75 % et validé mes simulations par des essais physiques. Je serai diplômé mi-2027. Portfolio de mes travaux : eportfolioaurelien.today",
    skills: [
      {
        area: "CAO et conception",
        detail:
          "Siemens NX avec modélisation paramétrique, implantation et intégration, plans techniques, conception pour la fabrication",
      },
      {
        area: "CAE",
        detail:
          "FEA (Altair HyperMesh, OptiStruct), analyse modale, optimisation topologique, CFD (Siemens Star-CCM+)",
      },
      {
        area: "Composites et essais",
        detail:
          "conception de stratifiés en fibre de carbone, outillage de moules, essais de flexion 3 points et de poinçonnement, bancs d'essai",
      },
      {
        area: "Données et outils",
        detail: "MATLAB, Python, Excel, Power BI, documentation technique",
      },
    ],
    experience: [
      {
        title: "Ingénierie aérodynamique",
        org: "Écurie Aix (Formula Student, Aix-la-Chapelle, Allemagne)",
        bullets: [
          "A réalisé des simulations CFD sur un carénage aérodynamique et repris une discontinuité de surface pour éviter le décollement de l'écoulement.",
          "Coordonne un modèle FEA du véhicule complet avec cinq personnes et forme les nouveaux membres à la FEA.",
        ],
      },
      {
        title: "Ingénierie de conception structurelle (FEA)",
        org: "Écurie Aix (Formula Student, Aix-la-Chapelle, Allemagne)",
        bullets: [
          "A optimisé la géométrie du monocoque et le drapage composite, augmentant la rigidité en torsion de 75 %.",
          "A validé la FEA avec des données d'essais physiques : résultats à moins de 2 % d'écart.",
          "A réduit de 11 % la masse de l'aileron arrière grâce à la FEA, tout en respectant le règlement structurel de la compétition.",
          "A introduit un système de journal d'ingénierie, désormais utilisé par toute l'initiative.",
        ],
      },
      {
        title: "Ingénierie de conception du châssis (composites)",
        org: "University Racing Eindhoven (Pays-Bas)",
        bullets: [
          "A conçu un monocoque en fibre de carbone à partir d'une feuille blanche sous Siemens NX.",
          "A conçu l'outillage de moulage en vue de la fabrication, avec dépouilles et alignement par pions.",
          "A construit des gabarits d'essai et validé les calculs de stratifié lors d'essais de flexion 3 points.",
          "A animé des réunions d'interface entre groupes d'ingénierie pour résoudre des problèmes d'implantation.",
        ],
      },
      {
        title: "Responsable de l'équipe aérodynamique",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "A fabriqué un diffuseur en fibre de carbone et Kevlar conçu pour les charges de rebond et les contacts du fond plat avec la piste.",
          "A recruté deux membres et les a placés dans des rôles à l'aide de tests de compétences.",
        ],
      },
      {
        title: "Développement en business intelligence et automatisation",
        org: "Oceania Distribution (temps partiel)",
        bullets: [
          "A construit un pipeline Python qui nettoie les données brutes de vente et actualise des rapports Power BI sur les ventes, les prévisions et les ventes manquées.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, génie mécanique",
        school: "Charles Darwin University, Australie",
        note: "Prix d'excellence académique de la faculté pour mon mémoire sur le confort thermique hors réseau dans le Cape York, en Australie.",
      },
      {
        degree: "Bachelor of Engineering (Honours), génie mécanique",
        school: "University of Technology Sydney",
        note: "Crédits reconnus par la Charles Darwin University en 07.2025. Cours pertinents : Engineering Computations (High Distinction), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages:
      "Anglais (langue maternelle), français (langue maternelle), allemand (A2, en apprentissage). Nationalités française et australienne.",
  },

  de: {
    headline: "Maschinenbau-Konstruktion | Fahrzeugstrukturen, CAE, Verbundwerkstoffe",
    summary:
      "Drei Jahre praktische Arbeit in der Struktur- und Chassis-Konstruktion in studentischen Rennsportinitiativen, neben meinem Maschinenbaustudium. Ich führe Fahrzeugteile von der CAD-Konstruktion über Simulation und Prüfung bis zur Fertigung: Ich habe ein Carbon-Monocoque von Grund auf neu konstruiert, seine Torsionssteifigkeit um 75 % gesteigert und meine Simulationen durch physische Versuche bestätigt. Mein Abschluss folgt Mitte 2027. Portfolio meiner Arbeiten: eportfolioaurelien.today",
    skills: [
      {
        area: "CAD und Konstruktion",
        detail:
          "Siemens NX mit parametrischer Modellierung, Package und Integration, technische Zeichnungen, fertigungsgerechte Konstruktion",
      },
      {
        area: "CAE",
        detail:
          "FEM (Altair HyperMesh, OptiStruct), Modalanalyse, Topologieoptimierung, CFD (Siemens Star-CCM+)",
      },
      {
        area: "Verbundwerkstoffe und Prüfung",
        detail:
          "Auslegung von Carbonlaminaten, Formenbau, 3-Punkt-Biege- und Durchdrückversuche, Prüfaufbauten",
      },
      {
        area: "Daten und Werkzeuge",
        detail: "MATLAB, Python, Excel, Power BI, technische Dokumentation",
      },
    ],
    experience: [
      {
        title: "Aerodynamik-Entwicklung",
        org: "Écurie Aix (Formula Student, Aachen, Deutschland)",
        bullets: [
          "CFD an einer aerodynamischen Verkleidung durchgeführt und eine Oberflächenunstetigkeit überarbeitet, um Strömungsablösung zu verhindern.",
          "Koordiniert ein FEM-Gesamtfahrzeugmodell mit fünf Personen und bringt neuen Mitgliedern FEM bei.",
        ],
      },
      {
        title: "Strukturkonstruktion (FEM)",
        org: "Écurie Aix (Formula Student, Aachen, Deutschland)",
        bullets: [
          "Monocoque-Geometrie und Laminataufbau optimiert und die Torsionssteifigkeit um 75 % gesteigert.",
          "Die FEM mit physischen Versuchsdaten abgeglichen: Ergebnisse innerhalb von 2 % Abweichung.",
          "Die Masse des Heckflügels per FEM um 11 % gesenkt und dabei das Strukturreglement des Wettbewerbs erfüllt.",
          "Ein Konstruktionslogbuch-System eingeführt, das heute die gesamte Initiative nutzt.",
        ],
      },
      {
        title: "Chassis-Konstruktion (Verbundwerkstoffe)",
        org: "University Racing Eindhoven (Niederlande)",
        bullets: [
          "Ein Carbon-Monocoque in Siemens NX von Grund auf neu konstruiert.",
          "Die Formwerkzeuge fertigungsgerecht ausgelegt, mit Entformungsschrägen und Stiftausrichtung.",
          "Prüfvorrichtungen gebaut und Laminatberechnungen in 3-Punkt-Biegeversuchen bestätigt.",
          "Schnittstellenbesprechungen zwischen den Ingenieurgruppen geleitet, um Package-Probleme zu lösen.",
        ],
      },
      {
        title: "Teamleitung Aerodynamik",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Einen Diffusor aus Carbon und Kevlar gefertigt, ausgelegt für Stoßlasten und Bodenberührungen.",
          "Zwei Teammitglieder gewonnen und mithilfe von Kompetenztests passenden Rollen zugeordnet.",
        ],
      },
      {
        title: "Entwicklung in Business Intelligence und Automatisierung",
        org: "Oceania Distribution (Teilzeit)",
        bullets: [
          "Eine Python-Pipeline gebaut, die rohe Verkaufsdaten bereinigt und Power-BI-Berichte zu Umsatz, Prognosen und entgangenem Umsatz aktualisiert.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, Maschinenbau",
        school: "Charles Darwin University, Australien",
        note: "Fakultätspreis für akademische Exzellenz für meine Arbeit zum netzunabhängigen thermischen Komfort in Cape York, Australien.",
      },
      {
        degree: "Bachelor of Engineering (Honours), Maschinenbau",
        school: "University of Technology Sydney",
        note: "Leistungen im 07.2025 an die Charles Darwin University übertragen. Relevante Fächer: Engineering Computations (High Distinction), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages:
      "Englisch (Muttersprache), Französisch (Muttersprache), Deutsch (A2, in Lernphase). Französische und australische Staatsangehörigkeit.",
  },

  nl: {
    headline: "Werktuigbouwkundig ontwerp | Voertuigstructuren, CAE, composieten",
    summary:
      "Drie jaar praktisch werk als constructie- en chassisontwerper in studentenraceteams, naast mijn opleiding werktuigbouwkunde. Ik breng voertuigonderdelen van CAD-ontwerp via simulatie en testen naar productie: ik ontwierp een koolstofvezelmonocoque vanaf nul, verhoogde de torsiestijfheid met 75% en valideerde mijn simulaties met fysieke tests. Ik studeer medio 2027 af. Portfolio van mijn werk: eportfolioaurelien.today",
    skills: [
      {
        area: "CAD en ontwerp",
        detail:
          "Siemens NX met parametrisch modelleren, inpassing en integratie, technische tekeningen, ontwerp voor productie",
      },
      {
        area: "CAE",
        detail:
          "FEA (Altair HyperMesh, OptiStruct), modale analyse, topologieoptimalisatie, CFD (Siemens Star-CCM+)",
      },
      {
        area: "Composieten en testen",
        detail:
          "laminaatontwerp in koolstofvezel, matrijzenbouw, driepuntsbuig- en doorduwproeven, proefopstellingen",
      },
      { area: "Data en tools", detail: "MATLAB, Python, Excel, Power BI, technische documentatie" },
    ],
    experience: [
      {
        title: "Aerodynamica-engineer",
        org: "Écurie Aix (Formula Student, Aken, Duitsland)",
        bullets: [
          "CFD uitgevoerd op een aerodynamische afdekking en een oppervlaktediscontinuïteit herontworpen om stromingsafscheiding te voorkomen.",
          "Coördineert een FEA-model van de hele auto met vijf personen en leert nieuwe leden FEA.",
        ],
      },
      {
        title: "Constructieontwerper (FEA)",
        org: "Écurie Aix (Formula Student, Aken, Duitsland)",
        bullets: [
          "Monocoquegeometrie en composietlay-up geoptimaliseerd, waardoor de torsiestijfheid met 75% steeg.",
          "De FEA gevalideerd met fysieke testdata: resultaten binnen 2% afwijking.",
          "De massa van de achtervleugel met FEA met 11% verlaagd en daarbij het constructiereglement van de wedstrijd gehaald.",
          "Een engineeringlogboeksysteem ingevoerd dat nu door de hele organisatie wordt gebruikt.",
        ],
      },
      {
        title: "Chassisontwerper (composieten)",
        org: "University Racing Eindhoven (Nederland)",
        bullets: [
          "Een koolstofvezelmonocoque vanaf nul ontworpen in Siemens NX.",
          "De matrijzen ontworpen voor productie, met ontwerphoeken en uitlijning met pennen.",
          "Testopstellingen gebouwd en laminaatberekeningen gevalideerd in driepuntsbuigproeven.",
          "Interfacebesprekingen tussen engineeringgroepen geleid om inpassingsproblemen op te lossen.",
        ],
      },
      {
        title: "Teamleider aerodynamica",
        org: "Formula SAE, University of Technology Sydney",
        bullets: [
          "Een diffuser van koolstofvezel en Kevlar gemaakt, ontworpen voor hobbelbelasting en contact van de bodem met het wegdek.",
          "Twee teamleden geworven en op basis van vaardigheidstests in rollen geplaatst.",
        ],
      },
      {
        title: "Ontwikkelaar business intelligence en automatisering",
        org: "Oceania Distribution (parttime)",
        bullets: [
          "Een Python-pipeline gebouwd die ruwe verkoopdata opschoont en Power BI-rapporten over verkoop, prognoses en gemiste verkoop ververst.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering, werktuigbouwkunde",
        school: "Charles Darwin University, Australië",
        note: "Faculty Academic Excellence Award voor mijn scriptie over thermisch comfort off-grid in Cape York, Australië.",
      },
      {
        degree: "Bachelor of Engineering (Honours), werktuigbouwkunde",
        school: "University of Technology Sydney",
        note: "Studiepunten in 07.2025 overgedragen aan Charles Darwin University. Relevante vakken: Engineering Computations (High Distinction), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
      },
    ],
    languages:
      "Engels (moedertaal), Frans (moedertaal), Duits (A2, aan het leren). Franse en Australische nationaliteit.",
  },
};
