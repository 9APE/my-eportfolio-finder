import type { Lang } from "@/i18n/config";

export type SkillCategoryId =
  | "structural-analysis"
  | "fea"
  | "cad"
  | "manufacturing"
  | "ownership"
  | "prototyping"
  | "testing"
  | "teamwork";

/**
 * A skill lens.
 *
 * Adding a ninth category = append one object here and add its id to every project's
 * `relevance` map in projects.ts. Nothing else changes: the chips, the sorting, the hero
 * pool, the intro copy and the keyword bolding all derive from this list.
 *
 * Every text field is per-language because the site runs in EN/FR/DE/NL.
 * - label     chip text, Title Case
 * - name      prose form, used inside "filtered by ..."
 * - body      the rest of the paragraph shown while this lens is active
 * - keywords  wording that actually appears in that language's project copy, so matched
 *             terms get emboldened on the cards. Equivalents, not translations.
 */
export type SkillCategory = {
  id: SkillCategoryId;
  label: Record<Lang, string>;
  name: Record<Lang, string>;
  body: Record<Lang, string>;
  keywords: Record<Lang, string[]>;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "structural-analysis",
    label: {
      en: "Structural Analysis",
      fr: "Calcul de structure",
      de: "Strukturberechnung",
      nl: "Constructieve analyse",
    },
    name: {
      en: "structural analysis",
      fr: "calcul de structure",
      de: "Strukturberechnung",
      nl: "constructieve analyse",
    },
    body: {
      en: "He developed torsional stiffness targets for a carbon-fibre monocoque, verified every design iteration by hand calculation before committing to simulation, and correlated final predictions against physical test data, taking ownership of a component's full structural story, not just one stage of it.",
      fr: "Il a défini les objectifs de rigidité en torsion d'un monocoque en fibre de carbone, vérifié chaque itération de conception par calculs analytiques avant de passer à la simulation, puis corrélé les prédictions finales à des données d'essais physiques — en assumant toute l'histoire structurelle d'un composant, et pas une seule étape.",
      de: "Er hat die Torsionssteifigkeitsziele für ein Carbon-Monocoque hergeleitet, jede Konstruktionsiteration vor der Simulation per Handrechnung geprüft und die endgültigen Vorhersagen mit physikalischen Prüfstandsdaten korreliert – er verantwortet die gesamte strukturelle Kette eines Bauteils, nicht nur eine Stufe davon.",
      nl: "Hij stelde de torsiestijfheidsdoelen voor een koolstofvezelmonocoque op, controleerde elke ontwerpiteratie met handberekeningen voordat hij aan simulatie begon en correleerde de uiteindelijke voorspellingen met fysieke testdata — hij neemt het hele constructieve verhaal van een onderdeel op zich, niet slechts één stap daarvan.",
    },
    keywords: {
      en: [
        "torsional stiffness",
        "stiffness",
        "stiff",
        "structural",
        "first principles",
        "load case",
        "load paths",
      ],
      fr: [
        "rigidité en torsion",
        "rigidité",
        "rigide",
        "structurelle",
        "structurel",
        "premiers principes",
        "cas de charge",
      ],
      de: [
        "Torsionssteifigkeit",
        "Steifigkeitsziel",
        "steif",
        "strukturelle",
        "Struktur",
        "Lastfall",
        "Handrechnung",
      ],
      nl: [
        "torsiestijfheid",
        "stijfheidsdoelstelling",
        "stijf",
        "constructieve",
        "constructief",
        "constructiereglement",
        "handberekeningen",
      ],
    },
  },
  {
    id: "fea",
    label: { en: "FEA", fr: "FEA", de: "FEM", nl: "FEA" },
    name: { en: "FEA", fr: "FEA", de: "FEM", nl: "FEA" },
    body: {
      en: "He's built and iterated finite element models in Altair HyperMesh and OptiStruct for carbon-fibre chassis and aerodynamic structures, benchmarking each laminate iteration against a stiffness target, then correlating predictions against physical strain gauge and load cell data to within 2% error.",
      fr: "Il a construit et fait évoluer des modèles éléments finis sous Altair HyperMesh et OptiStruct pour des châssis et des éléments aérodynamiques en carbone, en confrontant chaque itération de stratifié à un objectif de rigidité, puis en corrélant les prédictions à des mesures physiques par jauges de déformation et cellules de charge, à 2 % près.",
      de: "Er hat FE-Modelle in Altair HyperMesh und OptiStruct für Carbon-Chassis und Aerodynamikstrukturen aufgebaut und iteriert, jede Laminat-Iteration gegen ein Steifigkeitsziel gemessen und die Vorhersagen anschließend mit Dehnungsmessstreifen- und Kraftmessdosendaten auf 2 % genau korreliert.",
      nl: "Hij bouwde en itereerde eindige-elementenmodellen in Altair HyperMesh en OptiStruct voor koolstofvezelchassis en aerodynamische structuren, toetste elke laminaatiteratie aan een stijfheidsdoel en correleerde de voorspellingen vervolgens tot op 2% met fysieke rekstrookjes- en krachtopnemerdata.",
    },
    keywords: {
      en: [
        "Altair HyperMesh",
        "HyperMesh",
        "OptiStruct",
        "finite element",
        "FEA",
        "simulation",
        "simulating",
        "correlated",
      ],
      fr: [
        "calcul éléments finis",
        "éléments finis",
        "Altair HyperMesh",
        "HyperMesh",
        "OptiStruct",
        "simulation",
        "simuler",
        "corrélé",
        "FEA",
      ],
      de: [
        "FEM-Berechnung",
        "FE-Modell",
        "FEM",
        "Altair HyperMesh",
        "HyperMesh",
        "OptiStruct",
        "Simulation",
        "simuliert",
        "korreliert",
      ],
      nl: [
        "eindige-elementenmodellen",
        "EEM-model",
        "FEA",
        "Altair HyperMesh",
        "HyperMesh",
        "OptiStruct",
        "simuleren",
        "simulatie",
        "gecorreleerd",
      ],
    },
  },
  {
    id: "cad",
    label: { en: "CAD", fr: "CAO", de: "CAD", nl: "CAD" },
    name: { en: "CAD", fr: "CAO", de: "CAD", nl: "CAD" },
    body: {
      en: "He's designed chassis geometry, tooling, and aerodynamic components from a clean sheet in Siemens NX, always working within tight packaging and manufacturability constraints, and adapted between SolidWorks and NX in under two weeks when a new team required it.",
      fr: "Il a conçu des géométries de châssis, des outillages et des éléments aérodynamiques depuis la feuille blanche sous Siemens NX, toujours sous de fortes contraintes d'intégration et de fabricabilité, et est passé de SolidWorks à NX en moins de deux semaines lorsqu'une nouvelle équipe l'a exigé.",
      de: "Er hat Chassisgeometrien, Formwerkzeuge und Aerodynamikbauteile von Grund auf in Siemens NX konstruiert – stets unter engen Package- und Fertigungsrandbedingungen – und ist in weniger als zwei Wochen von SolidWorks auf NX umgestiegen, als ein neues Team es verlangte.",
      nl: "Hij ontwierp chassisgeometrie, matrijzen en aerodynamische onderdelen vanaf nul in Siemens NX, altijd binnen strakke package- en produceerbaarheidseisen, en stapte in minder dan twee weken van SolidWorks over op NX toen een nieuw team dat vroeg.",
    },
    keywords: {
      en: [
        "Siemens NX",
        "SolidWorks",
        "CAD surface",
        "CAD",
        "geometry",
        "packaging",
        "packaged",
        "clearances",
        "surface",
      ],
      fr: [
        "Siemens NX",
        "SolidWorks",
        "surface CAO",
        "CAO",
        "géométrie",
        "intégration",
        "intégré",
        "surface",
      ],
      de: [
        "Siemens NX",
        "SolidWorks",
        "CAD-Fläche",
        "CAD",
        "Geometrie",
        "Package",
        "konstruiert",
        "Konstruktion",
        "Fläche",
      ],
      nl: [
        "Siemens NX",
        "SolidWorks",
        "CAD-oppervlak",
        "CAD",
        "monocoquegeometrie",
        "geometrie",
        "package",
        "oppervlak",
        "ontwierp",
      ],
    },
  },
  {
    id: "manufacturing",
    label: { en: "Manufacturing", fr: "Fabrication", de: "Fertigung", nl: "Productie" },
    name: { en: "manufacturing", fr: "fabrication", de: "Fertigung", nl: "productie" },
    body: {
      en: "He's worked end-to-end on carbon-fibre parts: material selection, laminate design, drapability simulation, ply cutting, layup, cure, and mould tooling designed for demouldability, diagnosing a resin-starvation risk through cross-sectioning rather than visual inspection alone.",
      fr: "Il a travaillé de bout en bout sur des pièces en fibre de carbone : choix des matériaux, conception du stratifié, simulation de drapabilité, découpe des plis, drapage, cuisson et outillage de moule conçu pour le démoulage — en diagnostiquant un risque de manque de résine par coupe transversale plutôt que par simple inspection visuelle.",
      de: "Er hat Carbonbauteile durchgängig begleitet: Materialauswahl, Laminataufbau, Drapierbarkeitssimulation, Lagenzuschnitt, Laminieren, Aushärten und entformungsgerechte Formwerkzeuge – und ein Harzmangel-Risiko per Querschnitt statt nur per Sichtprüfung diagnostiziert.",
      nl: "Hij werkte van begin tot eind aan koolstofvezeldelen: materiaalkeuze, laminaatontwerp, drapeerbaarheidssimulatie, lagen snijden, lamineren, uitharden en matrijzen ontworpen om schoon te lossen — en diagnosticeerde een risico op harsarmoede via doorsneden in plaats van alleen visuele inspectie.",
    },
    keywords: {
      en: [
        "manufacturing",
        "manufactured",
        "manufacturable",
        "manufacture",
        "drapability",
        "carbon-fibre",
        "demoulds",
        "moulds",
        "mould",
        "plies",
        "ply",
        "layup",
        "cured",
        "3D-printed",
        "DFM",
      ],
      fr: [
        "fabrication",
        "fabriqués",
        "drapabilité",
        "drapage",
        "moules",
        "moule",
        "démoule",
        "fibre de carbone",
        "carbone",
        "plis",
        "pli",
        "cuite",
        "usinait",
      ],
      de: [
        "Fertigungsrealität",
        "Fertigungsarbeit",
        "Fertigung",
        "Drapierbarkeit",
        "entformen",
        "Formen",
        "Form",
        "Carbonbauteil",
        "Carbon",
        "Lagen",
        "Lage",
        "ausgehärtete",
        "gefräst",
      ],
      nl: [
        "productiepraktijk",
        "productiewerk",
        "productie",
        "drapeerbaarheid",
        "matrijzen",
        "matrijs",
        "koolstofvezeldeel",
        "koolstofvezel",
        "lamineerden",
        "lagen",
        "laag",
        "uitgeharde",
        "freesde",
      ],
    },
  },
  {
    id: "ownership",
    label: { en: "Ownership", fr: "Responsabilité", de: "Verantwortung", nl: "Eigenaarschap" },
    name: { en: "ownership", fr: "responsabilité", de: "Verantwortung", nl: "eigenaarschap" },
    body: {
      en: "He takes subsystems from first-principles requirements through to manufactured, tested parts, keeping a personal engineering logbook on every project, something nobody asked him to do, to carry process knowledge forward and keep his work transparent to the next person.",
      fr: "Il mène des sous-systèmes des exigences fondamentales jusqu'à des pièces fabriquées et testées, en tenant un carnet d'ingénieur personnel sur chaque projet — une démarche que personne ne lui a demandée — pour transmettre le savoir-faire et garder son travail transparent pour la personne suivante.",
      de: "Er führt Subsysteme von den Grundanforderungen bis zum gefertigten, getesteten Bauteil und führt auf jedem Projekt ein persönliches Ingenieurslogbuch – von niemandem verlangt –, um Prozesswissen weiterzugeben und seine Arbeit für die nächste Person nachvollziehbar zu halten.",
      nl: "Hij brengt subsystemen van basiseisen tot geproduceerde, geteste onderdelen en houdt op elk project een persoonlijk engineeringlogboek bij — door niemand gevraagd — om proceskennis mee te nemen en zijn werk navolgbaar te houden voor de volgende.",
    },
    keywords: {
      en: [
        "took ownership",
        "ownership",
        "end to end",
        "end-to-end",
        "first-principles",
        "first principles",
        "transparency",
        "logbook",
      ],
      fr: [
        "pris la responsabilité",
        "responsabilité",
        "bout en bout",
        "premiers principes",
        "transparence",
        "carnet",
      ],
      de: [
        "Verantwortung",
        "von Anfang bis Ende",
        "von Grund auf",
        "Transparenz",
        "Logbuch",
      ],
      nl: [
        "verantwoordelijkheid",
        "van begin tot eind",
        "vanaf de basis",
        "transparant",
        "logboek",
      ],
    },
  },
  {
    id: "prototyping",
    label: { en: "Prototyping", fr: "Prototypage", de: "Prototyping", nl: "Prototypen" },
    name: { en: "prototyping", fr: "prototypage", de: "Prototyping", nl: "prototypen" },
    body: {
      en: "From a mecanum-base robot built through five CAD revisions to carbon-fibre mould tooling and driver ergonomics rigs, he learns by building, iterating hardware quickly and testing early rather than waiting for a perfect first design.",
      fr: "D'un robot à base mecanum développé en cinq révisions CAO jusqu'aux outillages de moule carbone et aux bancs d'ergonomie pilote, il apprend en construisant : itérer vite sur le matériel et tester tôt plutôt que d'attendre une conception parfaite du premier coup.",
      de: "Vom Mecanum-Roboter über fünf CAD-Revisionen bis zu Carbon-Formwerkzeugen und Fahrer-Ergonomieprüfständen lernt er durch Bauen: schnell an der Hardware iterieren und früh testen, statt auf den perfekten ersten Entwurf zu warten.",
      nl: "Van een mecanumrobot in vijf CAD-revisies tot koolstofvezelmatrijzen en ergonomieopstellingen voor de coureur: hij leert door te bouwen, itereert snel op hardware en test vroeg in plaats van te wachten op een perfect eerste ontwerp.",
    },
    keywords: {
      en: [
        "prototyping",
        "prototyped",
        "prototype",
        "revisions",
        "iterated",
        "learning by doing",
        "3D-printed",
        "rig",
      ],
      fr: [
        "prototypage",
        "prototype",
        "révisions",
        "apprenant en faisant",
        "itérer",
        "banc",
      ],
      de: [
        "Prototypenbau",
        "Prototyping",
        "Prototyp",
        "Revisionen",
        "durch Machen gelernt",
        "iteriert",
        "Prüfstand",
      ],
      nl: [
        "geprototypet",
        "prototypen",
        "prototype",
        "revisies",
        "door te doen",
        "itereren",
        "opstelling",
      ],
    },
  },
  {
    id: "testing",
    label: { en: "Testing", fr: "Essais", de: "Testen", nl: "Testen" },
    name: { en: "testing", fr: "essais", de: "Testen", nl: "testen" },
    body: {
      en: "He's validated designs against real data throughout: 3-point bending and push-through testing on carbon-fibre panels, physical strain gauge and load cell correlation against FEA, and ergonomics validated on a purpose-built adjustable rig.",
      fr: "Il a validé ses conceptions sur des données réelles tout du long : flexion trois points et essais de poinçonnement sur panneaux carbone, corrélation par jauges de déformation et cellules de charge face au calcul éléments finis, et ergonomie validée sur un banc réglable dédié.",
      de: "Er hat Konstruktionen durchgehend an realen Daten validiert: Drei-Punkt-Biege- und Durchdrückversuche an Carbonplatten, Korrelation von Dehnungsmessstreifen- und Kraftmessdosendaten mit der FEM, und Ergonomie auf einem eigens gebauten, verstellbaren Prüfstand.",
      nl: "Hij valideerde ontwerpen doorlopend met echte data: driepuntsbuiging en doordruktests op koolstofvezelpanelen, correlatie van rekstrookjes- en krachtopnemerdata met FEA, en ergonomie gevalideerd op een speciaal gebouwde verstelbare opstelling.",
    },
    keywords: {
      en: ["testing", "tested", "test", "validated", "validation", "correlated", "quality", "rig"],
      fr: ["essais", "testé", "validée", "validés", "validé", "corrélé", "qualité", "banc"],
      de: ["Testen", "getestet", "validiertes", "validiert", "korreliert", "Qualität", "Prüfstand"],
      nl: ["testen", "getest", "gevalideerd", "gecorreleerd", "kwaliteit", "opstelling"],
    },
  },
  {
    id: "teamwork",
    label: { en: "Teamwork", fr: "Travail en équipe", de: "Teamarbeit", nl: "Teamwork" },
    name: { en: "teamwork", fr: "travail en équipe", de: "Teamarbeit", nl: "teamwork" },
    body: {
      en: "He's led a 25-person interdisciplinary aerodynamics team, resolved packaging conflicts between structures and electrical sub-teams without compromising performance, and values learning from others and adapting to feedback as much as working independently.",
      fr: "Il a dirigé une équipe aérodynamique pluridisciplinaire de 25 personnes, résolu des conflits d'intégration entre les sous-équipes structure et électronique sans compromettre la performance, et accorde autant de valeur à apprendre des autres et tenir compte des retours qu'à travailler en autonomie.",
      de: "Er hat ein interdisziplinäres Aerodynamikteam mit 25 Personen geleitet, Package-Konflikte zwischen Struktur- und Elektrik-Subteams ohne Leistungseinbußen gelöst und schätzt das Lernen von anderen und das Aufnehmen von Feedback genauso wie eigenständiges Arbeiten.",
      nl: "Hij leidde een interdisciplinair aerodynamicateam van 25 personen, loste packageconflicten tussen de constructie- en elektrische subteams op zonder prestatieverlies, en vindt leren van anderen en feedback verwerken even belangrijk als zelfstandig werken.",
    },
    keywords: {
      en: [
        "open to feedback",
        "feedback",
        "cross-functional",
        "collaboration",
        "negotiated",
        "department",
        "subsystems",
        "subsystem",
        "peers",
        "teams",
        "team",
      ],
      fr: [
        "ouvert aux retours",
        "retours",
        "collaboration",
        "négocié",
        "département",
        "sous-systèmes",
        "sous-système",
        "camarades",
        "équipes",
        "équipe",
      ],
      de: [
        "offen für Feedback",
        "Feedback",
        "Zusammenarbeit",
        "Abstimmung",
        "Abteilung",
        "Subsysteme",
        "Subsystem",
        "Kommilitonen",
        "Teams",
        "Team",
      ],
      nl: [
        "open voor feedback",
        "feedback",
        "samenwerking",
        "overleg",
        "afdeling",
        "subsystemen",
        "subsysteem",
        "medestudenten",
        "teams",
        "team",
      ],
    },
  },
];

export const skillCategoryIds = skillCategories.map((c) => c.id);

export function getSkillCategory(id: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.id === id);
}
