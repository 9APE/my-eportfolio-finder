# Écurie Aix feedback submission sequence

Enhance the existing feedback form with a playful car animation while keeping email delivery, accessibility, and retry behavior reliable.

## What will change

1. **Transparent car asset**
   - Create a clean transparent cutout from the supplied side-profile Écurie Aix car photo.
   - Keep the full car legible at desktop and mobile sizes without covering form controls while idle.

2. **Hover teaser**
   - When the pointer rests on “Send feedback,” reveal the car’s nosecone from the far-right viewport edge.
   - Use a spring-like forward/retract motion; keyboard focus receives the same preview.
   - Disable the teaser on touch layouts and when reduced motion is requested.

3. **Successful submission animation**
   - Keep the existing Web3Forms submission and preserve the visitor’s text on failure.
   - On submit, bring the car from the right into the center while the form content compresses into a small glowing data-packet icon.
   - Once Web3Forms confirms success, drop the packet into the cockpit, pause briefly, then accelerate the car off the left edge.
   - If sending fails, restore the form instead of showing a false success message.

4. **Full-screen thank-you state**
   - After the car exits, reveal a clean full-screen overlay with:
     - “I APPRECIATE YOUR FEEDBACK.”
     - “Your input helps me continuously improve my engineering process.”
     - “Return to Site” control
   - Restore page scrolling and focus when the visitor returns.

5. **Polish and verification**
   - Add semantic animation tokens and reduced-motion fallbacks.
   - Prevent duplicate submissions and accidental closing during the sequence.
   - Verify hover, successful animation timing, failure recovery, keyboard behavior, and desktop/mobile layouts in the live preview.

## Technical details

- Extend the existing feedback widget with explicit `idle`, `sending`, `packet`, `driving`, and `thank-you` visual phases.
- Use CSS transforms and opacity for smooth, low-cost motion; no new animation dependency.
- The animation begins on click, but the packet drop and thank-you state occur only after a successful email response.
