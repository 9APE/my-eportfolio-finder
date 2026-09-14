import upright from "@/assets/upright.jpg";
import mechanism from "@/assets/mechanism.jpg";
import feaBracket from "@/assets/fea-bracket.jpg";
import gearbox from "@/assets/gearbox.jpg";

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
    slug: "wheel-upright",
    ref: "AP-01",
    category: "Structural Design",
    title: "Formula Student — Wheel Upright",
    tags: ["FEA", "GD&T", "NX"],
    image: upright,
    gallery: [upright, feaBracket, gearbox],
    what:
      "Designed and validated the rear wheel upright for a Formula Student race car — the single component carrying vertical, lateral and braking loads from the tyre contact patch into the suspension and drivetrain.",
    how: [
      "Modelled the full upright assembly in Siemens NX, integrating bearing housings, caliper mount and five suspension pickup points within a 1.5 mm packaging envelope.",
      "Ran linear static FEA in HyperMesh to peak von Mises stress under combined cornering + braking load cases, targeting a 2.0 safety factor against 7075-T6 yield.",
      "Applied a full GD&T scheme on the 2D drawing — true position on bearing bores (Ø0.02), perpendicularity on pickup faces.",
    ],
    result: [
      "Mass reduced 18% versus the team's previous generation while maintaining a 2.3× yield safety factor.",
      "Zero bearing-fit failures across a full endurance season; part machined from a single billet on a 3-axis CNC.",
    ],
    spec: [
      { label: "Material", value: "Aluminium 7075-T6" },
      { label: "Safety factor", value: "2.3 × yield" },
      { label: "Mass", value: "612 g (−18%)" },
      { label: "Tolerance", value: "Ø0.02 true position" },
    ],
    software: ["Siemens NX", "Altair HyperMesh", "ANSYS"],
  },
  {
    slug: "delivery-mechanism",
    ref: "AP-02",
    category: "Mechanism Design",
    title: "Warman Challenge — Delivery Mechanism",
    tags: ["Kinematics", "Mech", "SolidWorks"],
    image: mechanism,
    gallery: [mechanism, upright],
    what:
      "A spring-loaded linkage mechanism for the national Warman Design & Build Challenge, engineered to collect, transport and deposit a payload across a constrained course within a single actuation stroke.",
    how: [
      "Iterated four-bar and cam-driven concepts in SolidWorks, optimising transmission angle to avoid toggle dead-points through the full motion range.",
      "Validated kinematics in MATLAB to map torque demand against the available spring energy budget, then sized the trigger release for a repeatable 0.4 s cycle.",
      "Rapid-prototyped the full linkage in laser-cut acrylic and 3D-printed PLA, tuning clearances from measured backlash on the bench.",
    ],
    result: [
      "Placed top-three in the regional final on payload delivered per cycle.",
      "Mechanism completed 40+ test cycles with no linkage failure or spring set.",
    ],
    spec: [
      { label: "Type", value: "Four-bar linkage" },
      { label: "Cycle time", value: "0.4 s" },
      { label: "Test cycles", value: "40+ no failure" },
      { label: "Prototype", value: "Acrylic / PLA" },
    ],
    software: ["SolidWorks", "MATLAB"],
  },
  {
    slug: "topology-bracket",
    ref: "AP-03",
    category: "Structural Validation",
    title: "Structural Bracket — Topology Optimization",
    tags: ["FEA", "Topology", "HyperMesh"],
    image: feaBracket,
    gallery: [feaBracket, upright],
    what:
      "Topology-optimised a mounting bracket to strip every gram that wasn't carrying load, then revalidated the organic result as a machinable part.",
    how: [
      "Defined design and non-design spaces in HyperMesh, then ran an OptiStruct topology study under a 12 kN pull-off load with a 35% volume fraction target.",
      "Smoothed the lattice-like result back into a manufacturable solid, adding machined flanges and bolt bosses the optimizer couldn't see.",
      "Ran a final linear-static FEA pass and a bolt-preload study to confirm the optimized geometry still cleared the 2.5× safety factor.",
    ],
    result: [
      "Mass cut by 41% against the original machined bracket at equal stiffness.",
      "Part passed the full validation load case on the first physical test.",
    ],
    spec: [
      { label: "Load case", value: "12 kN pull-off" },
      { label: "Volume fraction", value: "35% target" },
      { label: "Mass", value: "−41%" },
      { label: "Safety factor", value: "2.5 ×" },
    ],
    software: ["Altair HyperMesh", "OptiStruct"],
  },
  {
    slug: "two-stage-gearbox",
    ref: "AP-04",
    category: "Detailed Design",
    title: "Two-Stage Gearbox — Assembly & GD&T",
    tags: ["GD&T", "Assembly", "NX"],
    image: gearbox,
    gallery: [gearbox, upright],
    what:
      "Detailed a two-stage reduction gearbox from the housing out, with a GD&T scheme designed so the shafts, bearings and gearset assemble without fit-up rework.",
    how: [
      "Built the full BOM and assembly tree in Siemens NX, modelling shafts, bearings, gearset and housing as a single constrained assembly.",
      "Ran a tolerance stack-up across the two shaft centre distances to keep backlash inside the 0.08–0.15 mm window across worst-case manufacturing.",
      "Drew a full GD&T scheme — true position on bores, runout on shaft seats — and produced a complete set of 2D detail drawings for fabrication.",
    ],
    result: [
      "First physical prototype assembled with zero fit-up issues; backlash measured 0.11 mm, mid-window.",
      "Drawing pack adopted as the team's template for follow-on gearbox projects.",
    ],
    spec: [
      { label: "Stages", value: "Two-stage reduction" },
      { label: "Backlash", value: "0.11 mm measured" },
      { label: "Window", value: "0.08 – 0.15 mm" },
      { label: "Deliverable", value: "Full 2D drawing pack" },
    ],
    software: ["Siemens NX", "GD&T (ASME Y14.5)"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
