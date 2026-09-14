# Make the portfolio more interactive

Goal: make the site feel alive and fun to browse for employers, without changing the clean technical look or any content.

## 1. Animated stats & scroll reveals
- Hero stats (+75%, −11%, 100%) count up from zero when they scroll into view.
- Project cards, section headers, and detail-page sections gently fade/slide in on scroll (staggered per card).
- Respects `prefers-reduced-motion`.

## 2. Livelier hero slideshow
- Add a visible progress bar showing the 7s auto-cycle timing.
- Slide/crossfade transition between projects instead of an instant swap.
- Project caption below the image updates per slide; clicking the image still scrolls to the grid.

## 3. Interactive skill explorer
- New "Tools & Software" strip on the homepage (Siemens NX, Altair HyperMesh, CATIA, GD&T, SolidWorks, etc., derived from project tags/software).
- Hovering (or tapping) a tool highlights every project card that used it; others dim.
- Clicking a tool filters the grid or scrolls to the matching projects.

## 4. 3D tilt & image zoom
- Project card images get a subtle 3D tilt/parallax following the mouse (disabled on touch devices and reduced-motion).
- Lightbox gets scroll/pinch zoom and drag-to-pan so employers can inspect fine CAD detail; double-click toggles zoom.

## Technical notes
- New: `src/hooks/use-in-view.ts` (IntersectionObserver), `src/components/SkillExplorer.tsx`; edits to `src/routes/index.tsx`, `src/components/Lightbox.tsx`, `src/routes/projects.$slug.tsx`.
- Pure CSS transforms/transitions for tilt and reveals — no new heavy animation libraries.
- All animations gated behind a reduced-motion check.
