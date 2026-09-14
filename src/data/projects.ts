import monocoque from "@/assets/monocoque.jpg";
import monocoqueZones from "@/assets/monocoque-zones.jpg";
import monocoqueHardpoints from "@/assets/monocoque-hardpoints.jpg";
import monocoqueSection from "@/assets/monocoque-section.jpg";
import feaChart from "@/assets/fea-chart.jpg";
import feaContour from "@/assets/fea-contour.jpg";
import feaSetup from "@/assets/fea-setup.jpg";
import mfgDrape from "@/assets/mfg-drape.jpg";
import mfgNesting from "@/assets/mfg-nesting.jpg";
import mfgCutting from "@/assets/mfg-cutting.jpg";
import warmanRobot from "@/assets/warman-robot.jpg";
import warmanHv from "@/assets/warman-hv.jpg";
import warmanIdp from "@/assets/warman-idp.jpg";

export type Project = {
  slug: string;
  ref: string;
  category: string;
  title: string;
  tags: string[];
  image: string;
  gallery: string[];
  what: string;
  how: string[];
  result: string[];
  spec: { label: string; value: string }[];
  software: string[];
};

export const projects: Project[] = [
  {
    slug: "monocoque-integration",
    ref: "AP-01",
    category: "Structural Design",
    title: "Monocoque Design & Vehicle Integration",
    tags: ["Siemens NX", "Packaging", "Composites"],
    image: monocoque,
    gallery: [monocoqueZones, monocoqueHardpoints, monocoqueSection],
    what:
      "Designed the mechanical geometry of a carbon-fibre monocoque from scratch, packaging every subsystem — suspension hardpoints, driver cell and structural inserts — into a single load-bearing surface for Écurie Aix, RWTH Aachen's Formula Student team.",
    how: [
      "Modelled the full monocoque geometry in Siemens NX, the team's primary 3D CAD tool.",
      "Packaged suspension pickup points, cockpit and inserts, resolving clearance conflicts with surrounding components.",
      "Produced detailed engineering drawings for manufacture and handed them to the composites sub-team.",
    ],
    result: [
      "One integrated chassis surface carrying all load paths and mounting interfaces.",
      "Frame mass kept under 23 kg.",
      "Design released to manufacturing with drawings and tolerances.",
    ],
    spec: [
      { label: "Structure", value: "Carbon-fibre monocoque" },
      { label: "Primary CAD", value: "Siemens NX" },
      { label: "Frame mass", value: "< 23 kg" },
      { label: "Scope", value: "Geometry + packaging" },
    ],
    software: ["Siemens NX", "Fibersim"],
  },
  {
    slug: "fea-torsional-stiffness",
    ref: "AP-02",
    category: "Structural Validation",
    title: "FEA & Torsional Stiffness",
    tags: ["HyperMesh", "FEA", "First Principles"],
    image: feaContour,
    gallery: [feaChart, feaContour, feaSetup],
    what:
      "Set a chassis torsional-stiffness target from first principles so that chassis flex could not corrupt the intended mechanical balance, then verified the monocoque met it through FEA.",
    how: [
      "Treated the chassis as a torsional spring in series between the front and rear suspension.",
      "Allowed only 0.8% mechanical-balance deviation, which set a minimum stiffness target of 7,000 Nm/°.",
      "Built the monocoque FE model in Altair HyperMesh, applied the torsion load case and extracted deflection to derive stiffness.",
    ],
    result: [
      "Torsional stiffness raised from ~2,000 to 7,020 Nm/° (+200%).",
      "FEA correlated to within 150 Nm/° of the team's physical test bench.",
      "Requirement met without over-building mass.",
    ],
    spec: [
      { label: "Target", value: "7,000 Nm/° min" },
      { label: "Achieved", value: "7,020 Nm/°" },
      { label: "Correlation", value: "±150 Nm/° to test" },
      { label: "Gain", value: "+200% rigidity" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "composite-manufacturing",
    ref: "AP-03",
    category: "Manufacturing / DFM",
    title: "Composite Manufacturing & DFM",
    tags: ["Fibersim", "DFM", "Ply Book"],
    image: mfgNesting,
    gallery: [mfgDrape, mfgNesting, mfgCutting],
    what:
      "Made the monocoque manufacturable and material- and cost-efficient, translating the CAD surface into a repeatable composite layup.",
    how: [
      "Ran drapability simulations in Siemens Fibersim to verify fibre orientation and manufacturability.",
      "Nested plies to minimise material waste and exported flat patterns as DXF for CNC cutting.",
      "Built a ply book to standardise the layup process for the manufacturing team.",
    ],
    result: [
      "Reduced material waste and layup errors.",
      "Faster, more repeatable manufacturing.",
      "Minimal fibre-orientation deviation in the cured part.",
    ],
    spec: [
      { label: "Process", value: "Prepreg layup" },
      { label: "Output", value: "DXF flat patterns" },
      { label: "Cutting", value: "CNC ply cutter" },
      { label: "Docs", value: "Ply book" },
    ],
    software: ["Siemens Fibersim", "Siemens NX"],
  },
  {
    slug: "warman-robot",
    ref: "AP-04",
    category: "Mechatronics / 3D Print",
    title: "Warman Challenge Robot",
    tags: ["SolidWorks", "Mechatronics", "3D Print"],
    image: warmanRobot,
    gallery: [warmanRobot, warmanHv, warmanIdp],
    what:
      "Designed a mobile robot to retrieve and transport payloads across a constrained course for the national Warman Design & Build Challenge at the University of Technology Sydney.",
    how: [
      "Designed a stepper-motor-driven linear actuation mechanism on a mecanum-wheel base with a rotating turret arm and gripper.",
      "Detailed 3D-printed PLA parts with distinct slide-fit and interference-fit tolerances, iterating the Height Variation Mount to REV G.",
      "Integrated drive, actuation and end-effector into one machine and documented the full engineering process.",
    ],
    result: [
      "Achieved 100% on engineering process documentation.",
      "Iterated to REV G, applying DFM for additive manufacturing.",
      "Fully integrated drive, actuation and end-effector in a single build.",
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
