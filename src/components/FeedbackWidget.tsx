import { useCallback, useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const ACCESS_KEY = "b566c164-ac8d-4287-b322-130930e8ba60";
const SESSION_KEY = "feedback-prompt-shown";
const AUTO_OPEN_MS = 180_000;

const ROLES = [
  "Recruiter / Hiring Manager",
  "Engineering Peer",
  "Industry Professional",
  "Other",
] as const;

type Status = "idle" | "sending" | "success" | "error";

const label =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState<string>(ROLES[0]);
  const [identity, setIdentity] = useState("");
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);

  const openModal = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setStatus("idle");
  }, []);

  // Auto-open once per session after 3 minutes
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyShown = true;
    }
    if (alreadyShown) return;
    const t = window.setTimeout(() => openModal(), AUTO_OPEN_MS);
    return () => window.clearTimeout(t);
  }, [openModal]);

  // Escape, scroll lock, focus management
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, select, input, textarea, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const trimmedIdentity = identity.trim();
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentity);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: trimmedIdentity
            ? `Feedback from ${trimmedIdentity}`
            : "Feedback from portfolio user (ePortfolio)",
          from_name: trimmedIdentity || "Portfolio visitor",
          email: looksLikeEmail ? trimmedIdentity : "no-reply@eportfolioaurelien.today",
          message: [
            `Visitor type: ${role}`,
            `Identity: ${trimmedIdentity || "Not provided"}`,
            "",
            message.trim(),
          ].join("\n"),
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("Submission failed");
      setStatus("success");
      window.setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setIdentity("");
        setMessage("");
        setRole(ROLES[0]);
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-foreground/15";

  return (
    <>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center px-6 py-8 sm:px-10">
          <button
            type="button"
            onClick={openModal}
            className={`${label} rounded-full border border-border px-5 py-2.5 transition-colors hover:border-foreground/40 hover:text-foreground`}
          >
            Feedback would be very much appreciated
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-4 backdrop-blur-sm motion-safe:animate-fade-in sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            className="w-full max-w-lg rounded-3xl border border-border/70 bg-background/80 p-6 shadow-2xl backdrop-blur-xl motion-safe:animate-scale-in sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="feedback-title"
                  className="text-xl font-semibold tracking-tight text-foreground"
                >
                  I really value your feedback
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A few honest thoughts on the portfolio or any of the projects would
                  genuinely help me improve, from clarity to technical depth.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Dismiss feedback"
                className="-mr-1 -mt-1 rounded-full border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center motion-safe:animate-fade-in">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border">
                  <Check className="h-5 w-5 text-foreground" />
                </span>
                <p className="text-sm font-medium text-foreground">
                  Thank you for your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="feedback-role" className={label}>
                    Who are you?
                  </label>
                  <select
                    id="feedback-role"
                    ref={firstFieldRef}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={field}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="feedback-identity" className={label}>
                    Name, Email, or LinkedIn (Optional)
                  </label>
                  <input
                    id="feedback-identity"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    maxLength={200}
                    placeholder="Optional, only if you'd like a reply"
                    className={field}
                  />
                  <p className="text-xs text-muted-foreground">
                    Completely optional. Leave blank to stay anonymous.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="feedback-message" className={label}>
                    Your feedback
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={2000}
                    rows={5}
                    placeholder="What worked, what didn't, what you'd change…"
                    className={`${field} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    That didn't go through. Please try again in a moment.
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
