# Feedback widget and pop-up

Add an Apple-style feedback pop-up to the portfolio, sending messages straight to ariimoanapons@gmail.com via Web3Forms.

## What you get

1. **Bottom-of-page invite** — a quiet line at the very bottom of every page: "Feedback would be very much appreciated", styled to match the existing clean/technical look. Clicking it opens the pop-up.
2. **Auto pop-up after 3 minutes** — opens itself once per visit after 180 seconds of browsing, then never nags again during that session (also skipped if the visitor already opened or submitted it).
3. **The pop-up itself** — frosted glass panel over a dimmed page, rounded corners, soft shadow, gentle fade/scale in.
   - Title: "I really value your feedback"
   - Short warm note asking for honest thoughts on the portfolio or projects
   - Close "X" in the corner; also closes on Escape or clicking the backdrop
4. **Fields**
   - "Who are you?" dropdown: Recruiter / Hiring Manager, Engineering Peer, Industry Professional, Other
   - "Name, Email, or LinkedIn (Optional)" with helper text saying it's optional
   - Spacious feedback text box (required)
   - Send button, disabled while sending
5. **Sending** — goes to your inbox with subject "Feedback from [name/email]" when they identify themselves, otherwise "Feedback from portfolio user (ePortfolio)". The visitor type is included in the message body.
6. **Confirmation** — the panel swaps to a subtle "Thank you for your feedback!" state with a checkmark, then closes itself after 2 seconds. If sending fails, an inline error appears and their text is kept so they can retry.

Accessibility and polish: focus moves into the panel, focus is trapped while open, page scroll locks, and all motion respects the reduced-motion setting already used across the site.

## Technical notes

- New `src/components/FeedbackWidget.tsx`: trigger line + modal + form state machine (`idle | sending | success | error`), rendered once in `src/routes/__root.tsx` so it appears on the home page and every project page.
- Submission: `POST https://api.web3forms.com/submit` (JSON) with the Web3Forms access key `b566c164-ac8d-4287-b322-130930e8ba60`. This is a publishable key, so it lives in the component file; no backend or server function needed.
- Payload: `access_key`, computed `subject`, `from_name`, `email` (falls back to a no-reply placeholder when the identity field is empty or isn't an email), and `message` containing visitor type, identity, and feedback text.
- Timer: `useEffect` with `setTimeout(180_000)`, guarded by `sessionStorage` key `feedback-prompt-shown`, set as soon as the modal opens by any route; cleared on unmount.
- Styling: Tailwind utilities plus existing semantic tokens only (`bg-background/70`, `border-border`, `text-muted-foreground`), `backdrop-blur-xl` for the glass effect (standard property only — no hand-written webkit prefix). No new colour literals.
- No new dependencies; reuses existing animation/reduced-motion patterns.
