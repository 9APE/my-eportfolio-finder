import monoFeaHero from "@/assets/mono-fea-hero.jpg";
import monoFea1 from "@/assets/mono-fea-1.jpg";

import monoFea3 from "@/assets/mono-fea-3.jpg";
import monoFea4 from "@/assets/mono-fea-4.jpg";
import monoFea5 from "@/assets/mono-fea-5.jpg";
import monoFea6 from "@/assets/mono-fea-6.jpg";
import aeroHero from "@/assets/aero-hero.jpg";

import aero2 from "@/assets/aero-2.jpg";
import aero3 from "@/assets/aero-3.jpg";
import aero4 from "@/assets/aero-4.jpg";
import manuHero from "@/assets/manu-hero.jpg";
import manu1 from "@/assets/manu-1.jpg";
import manu2 from "@/assets/manu-2.jpg";
import manu3 from "@/assets/manu-3.jpg";
import manu4 from "@/assets/manu-4.jpg";
import manu5 from "@/assets/manu-5.jpg";
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
import carIsometric from "@/assets/car-isometric.png.asset.json";
import rearWingPhoto from "@/assets/rear-wing-photo.jpg.asset.json";
import warmanPrototypeFront from "@/assets/warman-prototype-front.png.asset.json";
import warmanPrototypeSide from "@/assets/warman-prototype-side.png.asset.json";
import warmanCadRender from "@/assets/warman-cad-render.png.asset.json";
import monoFeaMeshTop from "@/assets/mono-fea-mesh-top.png.asset.json";

import monoFeaStiffnessCalc from "@/assets/mono-fea-stiffness-calc.png.asset.json";

export type Project = {
  slug: string; category: string; title: string; team: string;
  tags: string[]; image: string; hoverImage?: string; gallery: string[];
  what: string; how: string[]; result: string[];
  spec: { label: string; value: string }[]; skills: string[];
};

export const projects: Project[] = [
  {
    slug: "cad-monocoque-design-packaging",
    category: "CAD & Packaging",
    title: "CAD Monocoque Design & Packaging",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Packaging", "RPCs"],
    image: urePkgHero,
    gallery: [urePkg1, urePkg2, urePkg3, urePkg4],
    what: "During a six-month placement at University Racing Eindhoven, I designed the monocoque geometry in Siemens NX and packaged every subsystem into one integrated chassis surface.",
    how: [
      "Modelled the monocoque geometry and allocated subsystem volumes.",
      "Negotiated requirements, constraints, and preferences (RPCs) across subsystems to ensure correct integration.",
      "Resolved clearances in a full-vehicle assembly and released the outer surface for tooling.",
    ],
    result: [
      "One integrated chassis surface carrying all load paths and mounting interfaces.",
      "Package validated against the full vehicle before manufacture.",
      "Design handed off to the tooling and composites teams.",
      "100% grade on engineering documentation.",
    ],
    spec: [
      { label: "Duration", value: "6-month placement" },
      { label: "Scope", value: "Full subsystem packaging" },
      { label: "RPCs negotiated", value: "Hundreds, across all subsystems" },
      { label: "Output", value: "Surface released for tooling" },
    ],
    skills: [
      "Siemens NX",
      "CAD Packaging",
      "Requirements Management",
      "Systems Integration",
      "Cross-Functional Collaboration",
    ],
  },
  {
    slug: "ergonomics-driver-fitment",
    category: "Ergonomics",
    title: "Ergonomics & Driver Fitment",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Ergonomics", "Driver Fitment", "Validation"],
    image: ureErgoHero,
    gallery: [ureErgo1, ureErgo2, ureErgo3],
    what: "Set the driver package, sightline, reach, and pedal-box adjustability, so every target driver fits the car correctly.",
    how: [
      "Built driver eye-point, sightline, and reach geometry in Siemens NX to size the cockpit.",
      "Set pedal-box and seating adjustability to cover the full range of team drivers.",
      "Validated the driver package on a physical fitment rig.",
    ],
    result: [
      "Confirmed correct sightline and reach for all drivers.",
      "Full driver range accommodated, with adjustable pedals.",
      "Package validated on the fitment rig before build.",
    ],
    spec: [
      { label: "Sightline", value: "Validated for full driver range" },
      { label: "Adjustability", value: "Pedal box + seating" },
      { label: "Validation method", value: "Physical fitment rig" },
      { label: "Outcome", value: "All target drivers fit" },
    ],
    skills: [
      "Siemens NX",
      "Ergonomics",
      "Driver Fitment",
      "Human Factors",
      "Physical Rig Validation",
    ],
  },
  {
    slug: "cad-tooling-design",
    category: "Tooling Design",
    title: "CAD Tooling Design",
    team: "University Racing Eindhoven · Netherlands",
    tags: ["Siemens NX", "Tooling", "DFM"],
    image: ureToolHero,
    gallery: [ureTool1, ureTool2, ureTool3, ureTool4],
    what: "Designed the monocoque moulds to their own requirements, so the cured part demoulds cleanly and the chassis builds to the correct geometry. Design driven by **manufacturing** reality, working directly with the team machining the plugs and **open to feedback** at every review.",
    how: [
      "Designed tooling in Siemens NX with a minimum 3° draft angle on every face for clean demoulding.",
      "Matched split-line and alignment features so mould halves, and the resulting chassis, locate correctly.",
      "Exported part files for CNC-milled balsa-wood plugs used to form the negative moulds.",
    ],
    result: [
      "Demouldable moulds that hold chassis alignment.",
      "3° draft and alignment achieved on all faces.",
      "Plugs CNC-milled and used directly to lay up the monocoque.",
    ],
    spec: [
      { label: "Draft angle", value: "Min. 3° on all faces" },
      { label: "Alignment", value: "Split-line matched, mould halves locate correctly" },
      { label: "Manufacturing", value: "CNC-milled balsa plugs" },
      { label: "Outcome", value: "Clean, repeatable demoulding" },
    ],
    skills: [
      "Siemens NX",
      "Tooling Design",
      "DFM",
      "Mould Design",
      "Manufacturing Coordination",
    ],
  },
  {
    slug: "chassis-torsional-stiffness",
    category: "Structural Simulation",
    title: "Chassis Torsional Stiffness Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["HyperMesh", "FEA", "First Principles"],
    image: carIsometric.url,
    hoverImage: monoFeaHero,
    gallery: [monoFeaHero, monoFea1, monoFea3, monoFea4, monoFea5, monoFea6, monoFeaMeshTop.url, monoFeaStiffnessCalc.url],
    what: "The previous-year chassis (EXO4) wasn't stiff enough, causing the monocoque to act as an unintended third spring between the front and rear suspension. I took **ownership** of the stiffness target from first principles, **learning by doing**: I picked up FEA in Altair HyperMesh and delivered a validated result within a matter of months, **open to feedback** from the suspension department and drivers throughout.",
    how: [
      "Derived the stiffness target by weighing lap-time gains against the mass penalty of a stiffer structure, informed by suspension-department and driver feedback.",
      "A 0.8% mechanical-balance tolerance set the minimum torsional stiffness target.",
      "Built the monocoque FE model in Altair HyperMesh, applied the torsion load case, and extracted deflection to calculate stiffness.",
    ],
    result: [
      "Raised torsional stiffness by 75%, while mass increased by only 35%.",
      "Correlated the FEA prediction against the team's prior-year physical test bench data to within ~2% error.",
      "Delivered within all constraints, including a frame mass target under 23 kg.",
    ],
    spec: [
      { label: "Target", value: "Met (0.8% balance tolerance)" },
      { label: "Stiffness gain", value: "+75%" },
      { label: "Validated", value: "~2% error vs. test" },
      { label: "Frame mass", value: "< 23 kg (+35%)" },
    ],
    skills: [
      "FEA",
      "Altair HyperMesh",
      "Torsional Stiffness Analysis",
      "Hand Calculations",
      "Requirements Derivation",
      "Structural Simulation",
    ],
  },
  {
    slug: "aero-devices-fea",
    category: "Structural Simulation",
    title: "FEA Aerodynamic Devices Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["FEA", "Composites Layup", "Rules Compliance"],
    image: rearWingPhoto.url,
    hoverImage: aeroHero,
    gallery: [aeroHero, aero2, aero3, aero4],
    what: "Every aerodynamic device had to be light, stiff, and compliant with Formula Student Germany's (FSG) structural rules. I aligned the aero and structural design process so each device was validated in FEA against the rulebook loads before manufacture.",
    how: [
      "Applied FSG's aero-device load cases in FEA: 200 N distributed over ≥225 cm², and a 50 N point load at any position.",
      "Optimised the composite layup to hold deflection limits while removing material carrying no load.",
      "Iterated wing and mounting geometry until stress and deflection cleared the rules with margin.",
    ],
    result: [
      "Reduced rear-wing weight by 11% versus the previous year.",
      "All aerodynamic devices passed FSG's stability and strength rules.",
      "Met structural and aerodynamic requirements in a single validated design.",
    ],
    spec: [
      { label: "Weight", value: "−11% vs. prior year" },
      { label: "Load case A", value: "200 N / ≥225 cm²" },
      { label: "Load case B", value: "50 N, any point" },
      { label: "Outcome", value: "All FSG rules passed" },
    ],
    skills: [
      "FEA",
      "Altair HyperMesh",
      "Composite Layup Optimisation",
      "Rules Compliance",
      "Load Case Analysis",
    ],
  },
  {
    slug: "composite-manufacturing",
    category: "Manufacturing / DFM",
    title: "Composite Manufacturing & Drapability Simulation",
    team: "Écurie Aix · RWTH Aachen Formula Student",
    tags: ["Fibersim", "Drapability", "Ply Book"],
    image: manuHero,
    gallery: [manu1, manu2, manu3, manu4, manu5],
    what: "Turning the monocoque's CAD surface into a repeatable, low-waste carbon-fibre part meant simulating drapability and planning every ply before the mould was touched. Hands-on **manufacturing** work on the shop floor, **learning by doing** alongside peers laying up the parts.",
    how: [
      "Defined ply zones and drop-offs on the monocoque surface in Siemens NX / Fibersim.",
      "Ran drapability simulation to verify fibre orientation, then nested plies to reduce waste and exported flat patterns for cutting.",
      "Created a ply book to standardise manufacturing and layup quality.",
    ],
    result: [
      "Consistent, quality-controlled manufacturing process.",
      "Reduced material waste and layup errors.",
      "Clean cured monocoque with minimal fibre-orientation deviation.",
    ],
    spec: [
      { label: "Method", value: "Drapability simulation → ply nesting → flat pattern export" },
      { label: "Output", value: "Ply book" },
      { label: "Result", value: "Minimal fibre-orientation deviation" },
      { label: "Waste", value: "Reduced via nested ply layout" },
    ],
    skills: [
      "Siemens Fibersim",
      "Drapability Simulation",
      "Ply Nesting",
      "Composite Manufacturing",
      "DFM",
    ],
  },
  {
    slug: "warman-challenge-robot",
    category: "Mechatronics / 3D Print",
    title: "Warman Challenge Robot",
    team: "University of Technology Sydney",
    tags: ["SolidWorks", "Mechatronics", "3D Print"],
    image: warmanCadRender.url,
    gallery: [warmanCadRender.url, warmanPrototypeFront.url, warmanPrototypeSide.url, mdfs1, mdfs2, mdfs3, mdfs4],
    what: "Designed, prototyped and fully documented a mobile robot to retrieve and transport payloads across a defined course for Warman Challenge Australia. I took **ownership** of the mechanism end to end, **growing** the design through **prototyping** and **testing** rather than on paper alone.",
    how: [
      "Designed a stepper-driven linear actuation mechanism on a mecanum-wheel base, with a rotating turret arm and gripper.",
      "Built a physical **prototype** of the drive and gripper in 3D-printed PLA, then developed it through successive revisions based on what the **testing** showed.",
      "Iterated the CAD through five revisions (REV A–E), detailing 3D-printed PLA parts with slide-fit vs. interference-fit tolerances.",
      "Produced a full engineering drawing pack, assembly and component-level.",
    ],
    result: [
      "Fully integrated drive, actuation, and end-effector in one machine.",
      "Complete, manufacturable drawing set.",
    ],
    spec: [
      { label: "CAD iterations", value: "REV A–E" },
      { label: "Tolerancing", value: "Slide-fit / interference-fit" },
      { label: "Output", value: "Full assembly + component drawing pack" },
    ],
    skills: [
      "SolidWorks",
      "Mechatronics",
      "3D Printing",
      "GD&T",
      "Engineering Drawings",
      "Stepper Motor Systems",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
