import type { Lang } from "@/i18n/config";

export type SkillCategoryId = "structural-analysis" | "fea" | "vehicle-integration";

/**
 * A skill lens. Adding a fourth category = append one object here and add its id to each
 * project's `relevance` map in projects.ts. No other structural change is needed.
 *
 * label / introFragment / keywords are per-language because the site runs in EN/FR/DE/NL;
 * keywords must match the wording that actually appears in each language's project copy,
 * so they are not translations of each other so much as equivalents.
 */
export type SkillCategory = {
  id: SkillCategoryId;
  label: Record<Lang, string>;
  introFragment: Record<Lang, string>;
  keywords: Record<Lang, string[]>;
  /**
   * Reserved. The hero showcase is the project list itself (each slide is a project and is
   * clickable), so filtering reorders those slides rather than swapping in a loose image
   * pool. Populate this only if the hero is ever decoupled from the projects.
   */
  heroImageIds: string[];
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
    introFragment: {
      en: "a focus on structural analysis, turning simulation into proven, signed-off components",
      fr: "le calcul de structure, qui transforme la simulation en composants validés et approuvés",
      de: "Strukturberechnung, bei der aus Simulation abgenommene, belastbare Bauteile werden",
      nl: "constructieve analyse, waarbij simulatie uitmondt in bewezen, goedgekeurde onderdelen",
    },
    keywords: {
      en: [
        "torsional stiffness",
        "structural sign-off",
        "hand-calculation",
        "FSG T8.3.1",
        "FSG T8.3.2",
        "load case",
      ],
      fr: [
        "rigidité en torsion",
        "cas de charge",
        "calculs analytiques",
        "simulation structurelle",
      ],
      de: [
        "Torsionssteifigkeit",
        "Lastfall",
        "Lastfälle",
        "Handrechnungen",
        "Strukturberechnung",
      ],
      nl: [
        "torsiestijfheid",
        "belastinggeval",
        "belastinggevallen",
        "handberekeningen",
        "constructieve simulatie",
      ],
    },
    heroImageIds: [],
  },
  {
    id: "fea",
    label: { en: "FEA", fr: "FEA", de: "FEM", nl: "FEA" },
    introFragment: {
      en: "deep hands-on FEA work in Altair HyperMesh and OptiStruct, correlated against real physical test data",
      fr: "un travail approfondi de calcul par éléments finis sous Altair HyperMesh et OptiStruct, corrélé à des données d'essais réelles",
      de: "fundierte praktische FEM-Arbeit in Altair HyperMesh und OptiStruct, korreliert mit realen Prüfstandsdaten",
      nl: "diepgaand praktisch FEA-werk in Altair HyperMesh en OptiStruct, gecorreleerd aan echte testdata",
    },
    keywords: {
      en: [
        "FEA",
        "Altair HyperMesh",
        "OptiStruct",
        "finite element",
        "correlation",
        "correlated",
        "strain gauge",
        "load cell",
      ],
      fr: [
        "calcul éléments finis",
        "éléments finis",
        "Altair HyperMesh",
        "OptiStruct",
        "corrélé",
        "corrélée",
        "FEA",
      ],
      de: ["FEM", "FE-Modell", "Altair HyperMesh", "OptiStruct", "korreliert"],
      nl: ["FEA", "EEM-model", "Altair HyperMesh", "OptiStruct", "gecorreleerd"],
    },
    heroImageIds: [],
  },
  {
    id: "vehicle-integration",
    label: {
      en: "Vehicle Integration",
      fr: "Intégration véhicule",
      de: "Fahrzeugintegration",
      nl: "Voertuigintegratie",
    },
    introFragment: {
      en: "a strong thread of vehicle integration, managing packaging, ergonomics, and interfaces across systems",
      fr: "l'intégration véhicule, avec la gestion du package, de l'ergonomie et des interfaces entre systèmes",
      de: "Fahrzeugintegration mit Package, Ergonomie und Schnittstellen über alle Systeme hinweg",
      nl: "voertuigintegratie, met package, ergonomie en interfaces tussen systemen",
    },
    keywords: {
      en: [
        "packaging",
        "packaged",
        "interface management",
        "ergonomics",
        "harness",
        "integration",
        "integrated",
        "driver field-of-view",
        "subsystem",
        "subsystems",
      ],
      fr: [
        "intégration",
        "intégré",
        "ergonomie",
        "poste de pilotage",
        "sous-système",
        "sous-systèmes",
        "package",
      ],
      de: [
        "Package",
        "Integration",
        "integrierte",
        "Ergonomie",
        "Subsystem",
        "Subsysteme",
        "Fahrerpaket",
      ],
      nl: [
        "package",
        "integratie",
        "geïntegreerd",
        "ergonomie",
        "subsysteem",
        "subsystemen",
        "coureurpakket",
      ],
    },
    heroImageIds: [],
  },
];

export const skillCategoryIds = skillCategories.map((c) => c.id);

export function getSkillCategory(id: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.id === id);
}
