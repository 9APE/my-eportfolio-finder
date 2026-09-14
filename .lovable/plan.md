# Finalising the portfolio for employers

Three parts: clean up the fake drawing references, replace the documentation stat with the two competition results, and make it impossible to miss that there are seven projects below the fold.

## 1. Remove the drawing-office references

Delete everywhere they appear:

- "Ref. AP-00 / Assembly View" above the main heading
- "Drawn by: A. Pons" in the top right of the showcase image
- "Ref. AP-BOM / Project Index" above the Engineering Projects heading
- "Ref. AP-NEXT / Other Projects" on the detail pages
- The "AP-01"…"AP-07" badge on each project card, the reference line under the showcase image (keeps just the project title), the "Ref. AP-0x ·" prefix in the detail page header, and the badge on the related-project tiles at the bottom of a detail page.

The `ref` field is removed from the project data entirely so nothing can bring it back.

## 2. Replace the third statistic with your results

The top strip becomes four cells:

- +75% torsional rigidity increase
- −11% rear-wing weight
- 2nd place — Formula Student World Rankings 2026
- 2nd place — Formula Student Germany 2026

The two placings render as "2nd" with the competition name underneath, in the same counting-up style as the other numbers. On narrow screens the four cells wrap to two rows. The "Scored 100% on engineering process documentation" bullet and the "Documentation score 100%" spec row on the Warman project page are removed too, so nothing contradicts the new strip.

## 3. Make the projects below impossible to miss

- **Wording**: the link under each project becomes plain "More details".
- **Live project counter in the hero**: the "Scroll to see 7 Engineering Projects" button gets stronger treatment — a bordered pill with a gently pulsing down-arrow that stays visible until the visitor scrolls past the hero, then fades out.
- **Sticky top bar after scrolling**: once the hero leaves the screen, a slim bar appears at the top with your name, a "7 projects" counter showing which one you are level with (e.g. "03 / 07"), and email + LinkedIn links. It keeps contact details one click away anywhere on the page.
- **Side progress rail**: on wide screens, a thin vertical column of seven ticks on the right edge of the project grid. The tick for the project in view fills in, and hovering a tick shows that project's title; clicking scrolls to it. Gives an instant read of how much is left.
- **Staggered card reveals stay**, but each card also gets a thin accent line that draws across the top as it enters view, so the grid feels alive as you scroll rather than static.
- **End-of-grid marker**: after the last card, a full-width rule reading "End of index — 7 projects" plus a "Back to top" control, so a visitor knows they have seen everything.
- **Keyboard/reduced-motion**: all new motion respects the reduced-motion setting and every new control is reachable by keyboard.

## Technical notes

- `src/data/projects.ts`: drop `ref` from the `Project` type and all seven records; remove the documentation bullet and spec row from the Warman entry.
- `src/routes/index.tsx`: stat array becomes four entries with an optional non-numeric display value handled inside `StatCell`; new `StickyBar`, `ProgressRail`, and `EndOfIndex` components; hero scroll cue driven by the existing `useInView` hook on the hero section; card link text changed to "More details".
- `src/routes/projects.$slug.tsx`: remove ref usages in the header, related-projects labels, and tiles.
- `src/styles.css`: add keyframes for the card accent line and the scroll-cue pulse, both gated behind `prefers-reduced-motion`.
- No backend or data-model changes.
