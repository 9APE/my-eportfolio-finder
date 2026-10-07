/** CV content, transcribed from public/Aurelien_Pons_CV.pdf. Section titles live in i18n/ui.ts. */

export type CvRole = {
  title: string;
  org: string;
  /** Start as printed on the CV, e.g. "09.2025". */
  start: string;
  /** End as printed, or null for a role that is still current. */
  end: string | null;
  note?: string;
  bullets: string[];
};

export const cv = {
  name: "Aurélien Pons",
  headline: "Mechanical Engineering – Composites, Structural Analysis, Design & Integration",
  location: "Aachen, Germany",
  phone: "+49 152 33570697",
  email: "ariimoanapons@gmail.com",
  linkedin: "https://linkedin.com/in/aurelienpons2004",
  pdf: "/Aurelien_Pons_CV.pdf",

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
      detail: "Siemens NX (primary), SolidWorks (basic), packaging, engineering drawings, documentation",
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
      start: "09.2025",
      end: null,
      note: "2nd at Formula Student Germany 2026",
      bullets: [
        "Raised monocoque torsional stiffness by 75% (4,000 to 7,020 Nm/deg) for 35% more mass",
        "Ran FEA in Altair HyperMesh, checking every run with hand calculations first",
        "Correlated FEA to physical test data within 150 Nm/deg (~2% error)",
        "Found a resin-starvation risk by cross-sectioning a sample",
        "Rear wing FEA gave 11% less mass than the previous year and passed the rules check",
        "Resolved a packaging conflict between the structures and electrical sub-teams",
      ],
    },
    {
      title: "Chassis Design Engineer (Composites)",
      org: "University Racing Eindhoven",
      start: "09.2024",
      end: "02.2025",
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
      start: "06.2023",
      end: "03.2024",
      bullets: [
        "Led a 25-person team designing aero components, including a rear diffuser, in Siemens NX with CFD",
      ],
    },
    {
      title: "Business Intelligence & Automation Developer",
      org: "Oceania Distribution (part-time)",
      start: "2023",
      end: null,
      bullets: [
        "Built a Python pipeline and Power BI dashboards; the analysis tool flagged over NZ$2M in potential lost sales",
      ],
    },
  ] satisfies CvRole[],

  education: [
    {
      degree: "Bachelor of Engineering, Mechanical",
      school: "Charles Darwin University, Australia",
      start: "07.2025",
      end: "06.2027",
      expected: true,
      note: "Faculty Academic Excellence Award, ENG423 (CDU), for an off-grid thermal comfort system for a remote community in Cape York",
    },
    {
      degree: "Bachelor of Engineering (Honours), Mechanical",
      school: "University of Technology Sydney, Australia",
      start: "02.2023",
      end: "07.2025",
      expected: false,
      note: "Transferred to Charles Darwin University in 07.2025, credits recognised. Relevant coursework: Engineering Computations (High Distinction, 90), Materials and Manufacturing Engineering A (High Distinction), Mechanical Design Fundamentals Studio 1 (High Distinction)",
    },
  ],

  languages: "English (Native), French (Native), German (A2, learning)",
  citizenship: "French and Australian",
};
