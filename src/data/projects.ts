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
    slug: "chassis-torsional-stiffness",
    ref: "AP-01",
    category: "Structural Simulation",
    title: "Chassis Torsional Stiffness Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEA", "First Principles"],
    image: monoFeaHero,
    gallery: [monoFea1, monoFea2, monoFea3, monoFea4, monoFea5, monoFea6],
    what: "Set the chassis torsional-stiffness target from lap-time simulation, research and input from the suspension department and drivers, so the monocoque holds the intended mechanical balance instead of acting as a third spring, then validated it by FEA.",
    how: [
      "Derived the stiffness target by trading lap-time-simulation gains against added mass, with suspension-department and driver input.",
      "Allowed only 0.8% mechanical-balance deviation, which set a minimum target of 7,000 Nm/°.",
      "Built the monocoque FE model in Altair HyperMesh, applied the torsion load case and extracted deflection to derive stiffness.",
    ],
    result: [
      "Raised torsional stiffness from ~4,000 to 7,020 Nm/° (~75%).",
      "Validated the simulation against the team's physical test bench to within ±150 Nm/°.",
      "Met the requirements and constraints, including frame mass under 23 kg.",
    ],
    spec: [
      { label: "Target", value: "7,000 Nm/° min" },
      { label: "Achieved", value: "7,020 Nm/°" },
      { label: "Validated", value: "±150 Nm/° vs test" },
      { label: "Frame mass", value: "< 23 kg" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "aero-devices-fea",
    ref: "AP-02",
    category: "Structural Simulation",
    title: "FEA Aerodynamic Devices Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEA", "Composites Layup", "Rules Compliance"],
    image: aeroHero,
    gallery: [aero1, aero2, aero3, aero4],
    what: "Made every aerodynamic device light, stiff and strong enough to pass the FSG structural rules by aligning the aerodynamic and structural design and validating each device in FEA.",
    how: [
      "Applied the FSG aero-device load cases in FEA — 200 N distributed over ≥225 cm², and a 50 N point load in any direction at any point.",
      "Optimised the composite layup to hold the deflection limits while removing material that carried no load.",
      "Iterated wing and mounting geometry until stress and deflection cleared the rules with margin.",
    ],
    result: [
      "Rear-wing weight reduced 11% versus the previous year.",
      "All aerodynamic devices passed the FSG stability & strength rules.",
      "Structural and aerodynamic requirements met in a single validated design.",
    ],
    spec: [
      { label: "Weight", value: "−11% vs prior year" },
      { label: "Load case A", value: "200 N / ≥225 cm²" },
      { label: "Load case B", value: "50 N, any point" },
      { label: "Outcome", value: "All rules passed" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "composite-manufacturing",
    ref: "AP-03",
    category: "Manufacturing / DFM",
    title: "Composite Manufacturing & Drapability Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Drapability", "Ply Book"],
    image: manuHero,
    gallery: [manu1, manu2, manu3, manu4],
    what: "Turned the monocoque CAD surface into a repeatable, low-waste carbon-fibre part by simulating drapability and planning every ply before the mould was touched.",
    how: [
      "Defined ply zones and drop-offs on the monocoque surface in Siemens NX / Fibersim.",
      "Ran drapability simulation to verify fibre orientation, then nested plies to cut waste and exported flat patterns for cutting.",
      "Created a ply book to fast-track manufacturing and ensure layup quality.",
    ],
    result: [
      "Ensured consistent, quality-controlled manufacturing.",
      "Reduced material waste and layup errors.",
      "Clean cured monocoque with minimal fibre-orientation deviation.",
    ],
    spec: [
      { label: "Method", value: "Prepreg layup" },
      { label: "Planning", value: "Ply zones + nesting" },
      { label: "Simulation", value: "Drapability" },
      { label: "Docs", value: "Ply book" },
    ],
    software: ["Siemens Fibersim", "Siemens NX"],
  },
  {
    slug: "cad-monocoque-design-packaging",
    ref: "AP-04",
    category: "CAD & Packaging",
    title: "CAD Monocoque Design & Packaging",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Packaging", "RPCs"],
    image: urePkgHero,
    gallery: [urePkg1, urePkg2, urePkg3, urePkg4],
    what: "Designed the monocoque geometry in Siemens NX and packaged every subsystem into one integrated chassis surface during a six-month internship at University Racing Eindhoven.",
    how: [
      "Modelled the monocoque geometry in Siemens NX and allocated subsystem volumes.",
      "Evaluated and negotiated hundreds of RPCs (Requirements, Constraints and Preferences) across subsystems to ensure correct chassis integration.",
      "Resolved clearances in a full-vehicle assembly and released the outer surface for tooling.",
    ],
    result: [
      "One integrated chassis surface carrying all load paths and mounting interfaces.",
      "Package validated against the full vehicle before manufacture.",
      "Design handed to the tooling and composites teams.",
    ],
    spec: [
      { label: "Primary CAD", value: "Siemens NX" },
      { label: "Integration", value: "100s of RPCs" },
      { label: "Scope", value: "Geometry + packaging" },
      { label: "Context", value: "6-month internship" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "ergonomics-driver-fitment",
    ref: "AP-05",
    category: "Ergonomics",
    title: "Ergonomics & Driver Fitment",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Ergonomics", "Driver Fitment", "Validation"],
    image: ureErgoHero,
    gallery: [ureErgo1, ureErgo2, ureErgo3],
    what: "Set the driver package — sightline, reach and pedal-box adjustability — so every target driver fits the car.",
    how: [
      "Built the driver eye-point, sightline and reach in Siemens NX to size the cockpit.",
      "Set pedal-box and seating adjustability to cover the full range of team drivers.",
      "Validated the driver package on a physical driver-fitment rig.",
    ],
    result: [
      "Correct sightline and reach confirmed for the drivers.",
      "All target drivers fit, with adjustable pedals across the range.",
      "Driver package validated on the fitment rig before build.",
    ],
    spec: [
      { label: "Method", value: "Siemens NX" },
      { label: "Validation", value: "Driver-fitment rig" },
      { label: "Package", value: "Sightline / reach / pedals" },
      { label: "Fit", value: "All target drivers" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "cad-tooling-design",
    ref: "AP-06",
    category: "Tooling Design",
    title: "CAD Tooling Design",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Tooling", "DFM"],
    image: ureToolHero,
    gallery: [ureTool1, ureTool2, ureTool3, ureTool4],
    what: "Designed the monocoque moulds to their own set of requirements so the cured part demoulds cleanly and the car is built to the correct geometry.",
    how: [
      "Designed the tooling in Siemens NX with a minimum 3° draft angle on every face for demouldability.",
      "Matched split-line and alignment features so the mould halves — and the resulting chassis — locate correctly.",
      "Exported part files to the mill manufacturer to CNC-mill balsa-wood plugs for the negative moulds.",
    ],
    result: [
      "Demountable moulds that hold chassis alignment.",
      "3° draft and alignment met on all faces.",
      "Plugs CNC-milled from balsa and used to lay up the monocoque.",
    ],
    spec: [
      { label: "Draft angle", value: "≥ 3° all faces" },
      { label: "Alignment", value: "Matched split-lines" },
      { label: "Plugs", value: "CNC-milled balsa" },
      { label: "Output", value: "Negative moulds" },
    ],
    software: ["Siemens NX"],
  },
  {
    slug: "warman-challenge-robot",
    ref: "AP-07",
    category: "Mechatronics / 3D Print",
    title: "Warman Challenge Robot",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mechatronics", "3D Print"],
    image: mdfsHero,
    gallery: [mdfs1, mdfs2, mdfs3, mdfs4],
    what: "Designed and fully documented a mobile robot that retrieves and transports payloads across a course defined by Warman Challenge Australia.",
    how: [
      "Designed a stepper-driven linear actuation mechanism on a mecanum-wheel base with a rotating turret arm and gripper.",
      "Iterated the CAD from REV A to REV E and detailed 3D-printed PLA parts with slide-fit vs interference-fit tolerances.",
      "Produced a full engineering drawing pack — assembly plus component details.",
    ],
    result: [
      "Scored 100% on the engineering process documentation.",
      "Fully integrated drive, actuation and end-effector in one machine.",
      "Complete, manufacturable drawing set.",
    ],
    spec: [
      { label: "Drive", value: "Mecanum wheels" },
      { label: "Actuation", value: "Stepper linear" },
      { label: "Material", value: "3D-printed PLA" },
      { label: "Grade", value: "100%" },
    ],
    software: ["SolidWorks", "3D Printing (PLA)"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
