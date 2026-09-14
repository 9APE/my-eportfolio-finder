# Showing ownership, hands-on skill and learning by doing

Three changes: a new prototype step in the Warman robot's method, rewritten wording across the site so the qualities you want employers to notice come through, and those key terms picked out in bold wherever they appear.

## 1. Prototype step on the Warman robot

The robot's "How" list goes from 3 steps to 4. The new step 2 reads along the lines of:

> Built a physical prototype of the drive and gripper, then developed it through successive revisions based on what the testing showed.

Order becomes: design the mechanism → build the prototype → iterate through revisions REV A–E → produce the drawing pack. A photo slot is ready for you to drop in a prototype picture whenever you have one; until then the existing images stay.

## 2. Wording that shows ownership, manufacturing and learning by doing

Short, concrete edits — no invented achievements, just sharper phrasing of what you already did:

- **Homepage intro**: reworked so it names taking ownership of a project end to end, hands-on manufacturing experience, and learning by doing — while keeping the existing line about continuous learning, open to feedback and delivering impactful results.
- **Chassis torsional stiffness**: the summary says you took ownership of the stiffness target and learned FEA by doing, reaching a validated result within a few months.
- **Composite manufacturing** and **tooling design**: phrasing leans on hands-on manufacturing and working with the people who build the parts.
- **Warman robot**: summary mentions prototyping and testing, and growing the design through revisions.
- A short line near the top of the homepage stating you are ready for a hands-on internship where you can take ownership.

## 3. Bold key terms

These terms render in bold wherever they appear in project text and the homepage intro:

taking ownership · manufacturing · learning by doing · prototyping · testing · learning · growing · open to feedback

To do this cleanly, project text supports simple `**bold**` marks that render as bold on both the homepage cards and the detail pages, so the wording stays readable in one place and you can add or remove emphasis later yourself.

## Technical notes

- `src/data/projects.ts`: add the prototype step to the Warman `how` array; revise `what` text on the named projects; wrap key terms in `**…**`.
- Small `RichText` helper component that splits on `**` and renders `<strong>`; used for `what`, `how`, and `result` text in `src/routes/index.tsx` and `src/routes/projects.$slug.tsx`.
- Homepage intro paragraph edited in `src/routes/index.tsx`.
- No backend, data-model or layout changes.
