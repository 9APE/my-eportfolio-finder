import monoFeaHero from "@/assets/mono-fea-hero.jpg";
import monoFea1 from "@/assets/mono-fea-1.jpg";
import monoFea2 from "@/assets/mono-fea-2.jpg";
import monoFea3 from "@/assets/mono-fea-3.jpg";
import monoFea4 from "@/assets/mono-fea-4.jpg";
import monoFea5 from "@/assets/mono-fea-5.jpg";
import monoFea6 from "@/assets/mono-fea-6.jpg";
import aeroHero from "@/assets/aero-hero.jpg";
import aero1 from "@/assets/aero-1.jpg";
import aero2 from "@/assets/aero-2.jpg";
import aero3 from "@/assets/aero-3.jpg";
import aero4 from "@/assets/aero-4.jpg";
import manuHero from "@/assets/manu-hero.jpg";
import manu1 from "@/assets/manu-1.jpg";
import manu2 from "@/assets/manu-2.jpg";
import manu3 from "@/assets/manu-3.jpg";
import manu4 from "@/assets/manu-4.jpg";
import urePkgHero from "@/assets/ure-pkg-hero.jpg";
import urePkg1 from "@/assets/ure-pkg-1.jpg";
import urePkg2 from "@/assets/ure-pkg-2.jpg";
import urePkg3 from "@/assets/ure-pkg-3.jpg";
import urePkg4 from "@/assets/ure-pkg-4.jpg";
import ureErgoHero from "@/assets/ure-ergo-hero.jpg";
import ureErgo1 from "@/assets/ure-ergo-1.jpg";
import ureErgo2 from "@/assets/ure-ergo-2.jpg";
import ureErgo3 from "@/assets/ure-ergo-3.jpg";
import ureToolHero from "@/assets/ure-tool-hero.jpg";
import ureTool1 from "@/assets/ure-tool-1.jpg";
import ureTool2 from "@/assets/ure-tool-2.jpg";
import ureTool3 from "@/assets/ure-tool-3.jpg";
import ureTool4 from "@/assets/ure-tool-4.jpg";
import mdfsHero from "@/assets/mdfs-hero.jpg";
import mdfs1 from "@/assets/mdfs-1.jpg";
import mdfs2 from "@/assets/mdfs-2.jpg";
import mdfs3 from "@/assets/mdfs-3.jpg";
import mdfs4 from "@/assets/mdfs-4.jpg";

export type Project = {
  slug: string; ref: string; category: string; title: string; team: string;
  tags: string[]; image: string; gallery: string[];
  what: string; how: string[]; result: string[];
  spec: { label: string; value: string }[]; software: string[];
};

export const projects: Project[] = [
  {
    slug: "monocoque-fea",
    ref: "AP-01",
    category: "Structural Validation",
    title: "Monocoque FEA & Torsional Stiffness",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEA", "First Principles"],
    image: monoFeaHero,
    gallery: [monoFea1, monoFea2, monoFea3, monoFea4, monoFea5, monoFea6],
    what: "Set a chassis torsional-stiffness target from first principles so chassis flex could not corrupt the intended mechanical balance, then verified the carbon-fibre monocoque met it through FEA.",
    how: [
      "Treated the chassis as a torsional spring in series between the front and rear suspension.",
      "Allowed only 0.8% mechanical-balance deviation, which set a minimum stiffness target of 7,000 Nm/°.",
      "Built the monocoque FE model in Altair HyperMesh, applied the torsion load case and extracted deflection to derive stiffness.",
    ],
    result: [
      "Torsional stiffness raised from ~4,000 to 7,020 Nm/° (~75% increase).",
      "FEA correlated to within 150 Nm/° of the team's physical test bench.",
      "Requirement met without over-building mass.",
    ],
    spec: [
      { label: "Target", value: "7,000 Nm/° min" },
      { label: "Achieved", value: "7,020 Nm/°" },
      { label: "Correlation", value: "±150 Nm/° to test" },
      { label: "Gain", value: "~75% rigidity" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "aero-devices-fea",
    ref: "AP-02",
    category: "Structural Validation",
    title: "Aerodynamic Devices FEA",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEA", "Composites Layup", "Rules Compliance"],
    image: aeroHero,
    gallery: [aero1, aero2, aero3, aero4],
    what: "Made every aerodynamic device light, stiff and strong enough to pass the FSG structural rules by aligning the aerodynamic and structural design and validating each device in FEA.",
    how: [
      "Applied the FSG aero-device load cases in FEA — a 200 N load distributed over ≥225 cm² and a 50 N point load in any direction at any point.",
      "Optimised the composite layup to hold the deflection limits while removing material where it carried no load.",
      "Iterated wing and mounting geometry until stress and deflection cleared the rules with margin.",
    ],
    result: [
      "Rear-wing weight reduced 11% versus the previous year.",
      "All aerodynamic devices passed the FSG stability & strength rules (RPCs).",
      "Structural and aerodynamic requirements met in a single validated design.",
    ],
    spec: [
      { label: "Weight", value: "−11% vs prior year" },
      { label: "Load case A", value: "200 N / ≥225 cm²" },
      { label: "Load case B", value: "50 N any direction" },
      { label: "Outcome", value: "All RPCs passed" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "composite-manufacturing",
    ref: "AP-03",
    category: "Manufacturing / DFM",
    title: "Composite Manufacturing & DFM",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Ply Book", "DFM"],
    image: manuHero,
    gallery: [manu1, manu2, manu3, manu4],
    what: "Turned the monocoque CAD surface into a repeatable, low-waste carbon-fibre part by planning the plies and layup before touching the mould.",
    how: [
      "Defined ply zones and drop-offs on the monocoque surface in Siemens NX / Fibersim.",
      "Nested the plies to minimise material waste and exported flat patterns for cutting.",
      "Built a ply book so the layup team could place every ply in the correct orientation and sequence.",
    ],
    result: [
      "Reduced material waste and layup errors.",
      "Repeatable, well-documented layup process.",
      "Clean cured monocoque with minimal fibre-orientation deviation.",
    ],
    spec: [
      { label: "Method", value: "Prepreg layup" },
      { label: "Planning", value: "Ply zones + nesting" },
      { label: "Output", value: "Flat patterns" },
      { label: "Docs", value: "Ply book" },
    ],
    software: ["Siemens Fibersim", "Siemens NX"],
  },
  {
    slug: "ure-packaging-integration",
    ref: "AP-04",
    category: "Design & Vehicle Integration",
    title: "Monocoque Design, Packaging & Vehicle Integration",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Packaging", "Integration"],
    image: urePkgHero,
    gallery: [urePkg1, urePkg2, urePkg3, urePkg4],
    what: "Designed the monocoque geometry and packaged every subsystem into one integrated chassis surface during a six-month internship at University Racing Eindhoven.",
    how: [
      "Modelled the monocoque geometry in Siemens NX and allocated subsystem volumes.",
      "Resolved clearances across suspension, driver cell and components in a full-vehicle assembly.",
      "Drove the outer surface and released it for tooling and manufacture.",
    ],
    result: [
      "One integrated chassis carrying all load paths and mounting interfaces.",
      "Package validated against the full vehicle before manufacture.",
      "Design handed to the tooling and composites teams.",
    ],
    spec: [
      { label: "Primary CAD", value: "Siemens NX" },
      { label: "Scope", value: "Geometry + packaging" },
      { label: "Context", value: "6-month internship" },
      { label: "Output", value: "Released surface" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "ure-ergonomics",
    ref: "AP-05",
    category: "Ergonomics & Decision-Making",
    title: "Ergonomics & Driver Integration",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Ergonomics", "Decision Matrix", "Validation"],
    image: ureErgoHero,
    gallery: [ureErgo1, ureErgo2, ureErgo3],
    what: "Fitted the driver correctly (sightline, reach, harness) and chose the shoulder-harness mounting through a structured, unbiased engineering decision.",
    how: [
      "Built the driver eye-point, sightline and reach in Siemens NX to size the cockpit.",
      "Weighed shoulder-harness mounting options in a morphological table and a weighted decision matrix.",
      "Validated the driver position and the chosen mounting on a physical seating buck.",
    ],
    result: [
      "Driver position and sightline met the rules and the drivers.",
      "The matrix-selected harness mounting was later tested and confirmed as the right choice.",
      "Design decisions traceable to objective criteria, not preference.",
    ],
    spec: [
      { label: "Method", value: "NX + seating buck" },
      { label: "Decision", value: "Weighted matrix" },
      { label: "Focus", value: "Sightline / reach / harness" },
      { label: "Validation", value: "Physical buck test" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "ure-tooling",
    ref: "AP-06",
    category: "Tooling & Mould Design",
    title: "Tooling & Mould Design",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Tooling", "DFM"],
    image: ureToolHero,
    gallery: [ureTool1, ureTool2, ureTool3, ureTool4],
    what: "Designed the monocoque moulds to their own set of requirements so the cured part demoulds cleanly and the car is built to the correct geometry.",
    how: [
      "Drew the tooling in Siemens NX with a minimum 3° draft angle on every face for demouldability.",
      "Matched split-line and alignment features so the mould halves — and the resulting chassis — locate correctly.",
      "Produced tooling drawings and released the moulds for machining.",
    ],
    result: [
      "Demountable moulds that hold chassis alignment.",
      "Draft and alignment requirements met across all faces.",
      "Moulds machined and used to lay up the monocoque.",
    ],
    spec: [
      { label: "Draft angle", value: "≥ 3° all faces" },
      { label: "Alignment", value: "Matched split-lines" },
      { label: "CAD", value: "Siemens NX" },
      { label: "Output", value: "Machined moulds" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "mdfs-robot",
    ref: "AP-07",
    category: "Mechatronics / 3D Print",
    title: "Warman Challenge Robot",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mechatronics", "3D Print"],
    image: mdfsHero,
    gallery: [mdfs1, mdfs2, mdfs3, mdfs4],
    what: "Designed and fully documented a mobile robot that retrieves and transports payloads across a course, delivered as a complete drawing pack.",
    how: [
      "Designed a stepper-motor linear actuation mechanism on a mecanum-wheel base with a rotating turret arm and gripper.",
      "Iterated the CAD from REV A to REV E and detailed 3D-printed PLA parts with slide-fit vs interference-fit tolerances.",
      "Produced a full engineering drawing pack (assembly + component details).",
    ],
    result: [
      "100% on engineering process documentation.",
      "Fully integrated drive, actuation and end-effector in one machine.",
      "Complete, manufacturable drawing set.",
    ],
    spec: [
      { label: "Drive", value: "Mecanum wheels" },
      { label: "Actuation", value: "Stepper linear" },
      { label: "Parts", value: "3D-printed PLA" },
      { label: "Process docs", value: "100%" },
    ],
    software: ["SolidWorks", "3D Printing (PLA)"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
