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
 * - body      the rest of the paragraph shown while this lens is active (first-person)
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
      en: "I'm a final-year Mechanical Engineering student who takes structures from requirement to proof. I raised a carbon-fibre monocoque's torsional stiffness by 75% for only 35% more mass, checking every iteration by hand calculation before simulating it, and I verified a rear wing against the competition load cases. I correlated my predictions with physical test data to within about 2%, so each result is proven, not just calculated.",
      fr: "Je suis étudiant en dernière année de génie mécanique et je mène les structures de l'exigence à la preuve. J'ai augmenté la rigidité en torsion d'un monocoque en fibre de carbone de 75 % pour seulement 35 % de masse en plus, en vérifiant chaque itération par calculs analytiques avant de la simuler, et j'ai validé un aileron arrière face aux cas de charge de la compétition. J'ai corrélé mes prédictions avec des données d'essais physiques à environ 2 % près, si bien que chaque résultat est prouvé, et pas seulement calculé.",
      de: "Ich bin Student im letzten Jahr des Maschinenbaus und führe Strukturen von der Anforderung bis zum Nachweis. Ich habe die Torsionssteifigkeit eines Carbon-Monocoques um 75 % gesteigert, bei nur 35 % mehr Masse, habe jede Iteration vor der Simulation per Handrechnung geprüft und einen Heckflügel gegen die Wettbewerbslastfälle verifiziert. Ich habe meine Vorhersagen mit physikalischen Prüfdaten auf etwa 2 % korreliert, damit jedes Ergebnis belegt ist und nicht nur berechnet.",
      nl: "Ik ben student in het laatste jaar werktuigbouwkunde en neem structuren van eis tot bewijs. Ik heb de torsiestijfheid van een koolstofvezelmonocoque met 75% verhoogd voor slechts 35% extra massa, controleerde elke iteratie met handberekeningen voordat ik ging simuleren en heb een achtervleugel tegen de wedstrijdlastgevallen gevalideerd. Ik corrigeerde mijn voorspellingen met fysieke testdata op ongeveer 2% nauwkeurig, zodat elk resultaat bewezen is en niet alleen berekend.",
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
      en: "I build and iterate finite element models in Altair HyperMesh and OptiStruct for carbon-fibre chassis and wing structures. I benchmark every laminate iteration (core thickness, ply count, layup) against a stiffness target, model bolt-insert connections and honeycomb cores, and correlate my results with physical strain gauge and load cell data to within 2%. I don't trust a simulation until it has been checked against hand calculations and real test data.",
      fr: "Je construis et fais évoluer des modèles éléments finis sous Altair HyperMesh et OptiStruct pour des châssis et des ailes en fibre de carbone. Je confronte chaque itération de stratifié (épaisseur du cœur, nombre de plis, drapage) à un objectif de rigidité, je modélise les connexions boulon-insert et les nids d'abeilles, et je corrèle mes résultats avec des données de jauges de déformation et de cellules de charge à 2 % près. Je ne fais pas confiance à une simulation tant qu'elle n'a pas été vérifiée par des calculs à la main et des données d'essais réelles.",
      de: "Ich baue FE-Modelle in Altair HyperMesh und OptiStruct für Carbon-Chassis und Flügelstrukturen auf und iteriere sie. Ich messe jede Laminat-Iteration (Kerndicke, Lageanzahl, Layup) an einem Steifigkeitsziel, modelliere Schraub-Insert-Verbindungen und Wabenkerne und korreliere meine Ergebnisse mit Dehnungsmessstreifen- und Kraftmessdosendaten auf 2 % genau. Einer Simulation vertraue ich erst, wenn sie mit Handrechnungen und echten Prüfdaten abgeglichen wurde.",
      nl: "Ik bouw en itereer eindige-elementenmodellen in Altair HyperMesh en OptiStruct voor koolstofvezelchassis en vleugelstructuren. Ik toets elke laminaatiteratie (kerndikte, aantal lagen, legging) aan een stijfheidsdoel, modelleer bout-insertverbindingen en honingraatkernen en corrigeer mijn resultaten met rekstrookjes- en krachtopnemerdata tot op 2%. Een simulatie vertrouw ik pas als die is gecontroleerd met handberekeningen en echte testdata.",
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
      en: "In Siemens NX I designed and packaged a carbon-fibre monocoque from a clean sheet, including driver ergonomics, harness positioning and mould tooling with draft angles and alignment features, and I produced technical drawings to DIN, ANSI and IS standards. I also designed aerodynamic components such as a rear diffuser, and I moved from SolidWorks to NX in about two weeks when a team needed it.",
      fr: "Sous Siemens NX, j'ai conçu et intégré un monocoque en fibre de carbone depuis la feuille blanche, avec l'ergonomie pilote, le positionnement du harnais et des outillages de moule avec dépouilles et repérages, et j'ai produit des dessins techniques aux normes DIN, ANSI et IS. J'ai aussi conçu des éléments aérodynamiques comme un diffuseur arrière, et je suis passé de SolidWorks à NX en environ deux semaines quand une équipe l'a demandé.",
      de: "In Siemens NX habe ich ein Carbon-Monocoque von Grund auf entworfen und gepackt, mit Fahrerergonomie, Gurtpositionierung und Formwerkzeugen mit Konizität und Positioniermerkmalen, und technische Zeichnungen nach DIN-, ANSI- und IS-Normen erstellt. Zusätzlich habe ich Aerodynamikbauteile wie einen Heckdiffusor konstruiert und bin in etwa zwei Wochen von SolidWorks auf NX umgestiegen, als ein Team es brauchte.",
      nl: "In Siemens NX heb ik een koolstofvezelmonocoque vanaf nul ontworpen en gepackt, met coureursergonomie, harnaspositionering en matrijzen met hellinghoeken en positioneringskenmerken, en technische tekeningen volgens DIN-, ANSI- en IS-normen gemaakt. Daarnaast ontwierp ik aerodynamische onderdelen zoals een achterdiffuser en stapte ik in ongeveer twee weken van SolidWorks over op NX toen een team dat nodig had.",
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
      en: "I take carbon-fibre parts from material choice to finished component: laminate design, drapability simulation in Fibersim, ply cutting, layup, cure and mould tooling designed for demoulding. When I suspected resin starvation from consecutive unidirectional plies, I confirmed it by cross-sectioning the part. I care as much about whether a part can be built as whether it performs.",
      fr: "Je mène des pièces en fibre de carbone du choix des matériaux au composant fini : conception du stratifié, simulation de drapabilité dans Fibersim, découpe des plis, drapage, cuisson et outillage de moule conçu pour le démoulage. Quand j'ai suspecté un manque de résine dû à des plis unidirectionnels consécutifs, je l'ai confirmé par coupe transversale de la pièce. Je me soucie autant de la fabricabilité d'une pièce que de ses performances.",
      de: "Ich begleite Carbonbauteile von der Materialauswahl bis zum fertigen Bauteil: Laminataufbau, Drapierbarkeitssimulation in Fibersim, Lagenzuschnitt, Laminieren, Aushärten und entformungsgerechte Formwerkzeuge. Als ich durch aufeinanderfolgende unidirektionale Lagen Harzmangel vermutete, habe ich es per Querschnitt des Bauteils bestätigt. Für mich zählt genauso, ob sich ein Bauteil fertigen lässt, wie es leistet.",
      nl: "Ik breng koolstofvezeldelen van materiaalkeuze tot eindproduct: laminaatontwerp, drapeerbaarheidssimulatie in Fibersim, lagen snijden, lamineren, uitharden en matrijzen ontworpen om schoon te lossen. Toen ik harsarmoede vermoedde door opeenvolgende unidirectionele lagen, bevestigde ik dat via een doorsnede van het onderdeel. Ik hecht evenveel waarde aan de maakbaarheid van een onderdeel als aan zijn prestaties.",
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
      en: "I take subsystems end to end, from first-principles requirements through analysis, manufacturing and testing. I keep a personal engineering logbook of decisions, mistakes and results that nobody asked me to write, so the next engineer can build on it. I own my numbers: I verify inputs myself, check each iteration by hand calculation, and stay transparent about what worked and what did not.",
      fr: "Je mène des sous-systèmes de bout en bout, des exigences issues des premiers principes jusqu'à l'analyse, la fabrication et les essais. Je tiens un carnet d'ingénieur personnel consignant décisions, erreurs et résultats, que personne ne m'a demandé d'écrire, pour que l'ingénieur suivant puisse s'appuyer dessus. J'assume mes chiffres : je vérifie moi-même les données d'entrée, je contrôle chaque itération par calcul à la main, et je reste transparent sur ce qui a fonctionné et ce qui a échoué.",
      de: "Ich führe Subsysteme von Grund auf durch, von den Anforderungen bis zu Analyse, Fertigung und Prüfung. Ich führe ein persönliches Ingenieurslogbuch mit Entscheidungen, Fehlern und Ergebnissen, das niemand von mir verlangt hat, damit der nächste Ingenieur darauf aufbauen kann. Ich übernehme die Verantwortung für meine Zahlen: Ich prüfe Eingaben selbst, kontrolliere jede Iteration per Handrechnung und bleibe transparent darüber, was funktioniert hat und was nicht.",
      nl: "Ik neem subsystemen van begin tot eind voor mijn rekening, van eisen op basis van eerste principes tot analyse, productie en testen. Ik houd een persoonlijk engineeringlogboek bij met beslissingen, fouten en resultaten, dat niemand mij vroeg, zodat de volgende ingenieur erop kan voortbouwen. Ik sta voor mijn cijfers: ik verifieer invoergegevens zelf, controleer elke iteratie met handberekeningen en blijf transparant over wat werkte en wat niet.",
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
      en: "I learn by building. I took a mecanum-base robot through five CAD revisions with 3D-printed parts, made mould tooling for carbon-fibre components, and used a purpose-built ergonomics rig to test driver fit before committing to the final design. I iterate quickly, test early and let the results change the design.",
      fr: "J'apprends en construisant. J'ai fait évoluer un robot à base mecanum à travers cinq révisions CAO avec des pièces imprimées en 3D, fabriqué des outillages de moule pour des composants en fibre de carbone, et utilisé un banc d'ergonomie dédié pour valider la position du pilote avant de figer la conception finale. J'itère vite, je teste tôt et je laisse les résultats changer la conception.",
      de: "Ich lerne durch Bauen. Ich habe einen Mecanum-Roboter durch fünf CAD-Revisionen mit 3D-gedruckten Teilen geführt, Formwerkzeuge für Carbonbauteile angefertigt und einen eigens gebauten Ergonomieprüfstand genutzt, um die Sitzposition des Fahrers zu prüfen, bevor ich die endgültige Konstruktion festlegte. Ich iteriere schnell, teste früh und lasse die Ergebnisse die Konstruktion verändern.",
      nl: "Ik leer door te bouwen. Ik nam een mecanumrobot door vijf CAD-revisies met 3D-geprinte onderdelen, maakte matrijzen voor koolstofvezelonderdelen en gebruikte een speciaal gebouwde ergonomieopstelling om de zit van de coureur te testen voordat ik het definitieve ontwerp vastlegde. Ik itereer snel, test vroeg en laat de resultaten het ontwerp veranderen.",
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
      en: "I validate designs against real data: 3-point bending and push-through tests on carbon-fibre panels, driver ergonomics checked on an adjustable rig, and FEA-to-test correlation against physical strain gauge and load cell results to within about 2%. Testing is how I decide whether a design is good, and cross-sectioning a laminate is how I found a hidden resin-starvation risk.",
      fr: "Je valide les conceptions avec des données réelles : flexion trois points et essais de poinçonnement sur panneaux carbone, ergonomie pilote vérifiée sur un banc réglable, et corrélation FEA-essais contre des jauges de déformation et des cellules de charge à environ 2 % près. Les essais me disent si une conception est bonne, et la coupe transversale d'un stratifié m'a révélé un risque de manque de résine jusque-là invisible.",
      de: "Ich validiere Konstruktionen mit echten Daten: Drei-Punkt-Biegung und Durchdrückversuche an Carbonplatten, Fahrerergonomie geprüft auf einem verstellbaren Prüfstand, und die Abstimmung von FEM und Versuch mit Messergebnissen aus Dehnungsmessstreifen und Kraftmessdosen auf etwa 2 % genau. Testen zeigt mir, ob eine Konstruktion gut ist, und der Querschnitt eines Laminats hat mir ein verstecktes Harzmangel-Risiko offenbart.",
      nl: "Ik valideer ontwerpen met echte data: driepuntsbuiging en doordruktests op koolstofvezelpanelen, coureursergonomie gecontroleerd op een verstelbare opstelling, en FEA-testcorrelatie tegen rekstrookjes- en krachtopnemerresultaten tot op ongeveer 2%. Testen vertelt me of een ontwerp goed is, en een doorsnede van een laminaat bracht een verborgen harsarmoede aan het licht.",
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
      en: "I led a 25-person aerodynamics team, resolved a packaging conflict between the structures and electrical sub-teams without compromising performance, and worked directly with manufacturing on ply schedules and tooling. I ask for help early: an alumnus with F1 simulation experience reviewed my FEA, and I value feedback and adapting to it.",
      fr: "J'ai dirigé une équipe aérodynamique de 25 personnes, résolu un conflit d'intégration entre les sous-équipes structure et électronique sans compromettre la performance, et travaillé directement avec la fabrication sur les séquences de plis et les outillages. Je demande de l'aide tôt : un ancien élève expérimenté en simulation F1 a relu mon FEA, et je valorise les retours et ma capacité à m'y adapter.",
      de: "Ich habe ein 25-köpfiges Aerodynamikteam geleitet, einen Package-Konflikt zwischen den Struktur- und Elektrik-Subteams ohne Leistungseinbußen gelöst und direkt mit der Fertigung an Lagenaufbauten und Werkzeugen gearbeitet. Ich bitte früh um Hilfe: Ein Alumnus mit F1-Simulationserfahrung hat mein FEM geprüft, und ich schätze Feedback und die Fähigkeit, mich danach zu richten.",
      nl: "Ik leidde een aerodynamicateam van 25 personen, loste een packageconflict op tussen de constructie- en elektrische subteams zonder prestatieverlies en werkte rechtstreeks samen met productie aan lagenopbouw en matrijzen. Ik vraag vroeg om hulp: een alumnus met F1-simulatie-ervaring heeft mijn FEA nagekeken, en ik waardeer feedback en me erop aanpassen.",
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
