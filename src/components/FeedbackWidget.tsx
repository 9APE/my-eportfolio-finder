import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronRight, X } from "lucide-react";

import carCutout from "@/assets/ecurie-aix-car-cutout.png";
import frontWing from "@/assets/ecurie-front-wing.jpg.asset.json";
import { Button } from "@/components/ui/button";

const ACCESS_KEY = "b566c164-ac8d-4287-b322-130930e8ba60";
const SESSION_KEY = "feedback-prompt-shown";
const AUTO_OPEN_MS = 180_000;

const ROLES = [
  "Recruiter / Hiring Manager",
  "Engineering Peer",
  "Industry Professional",
  "Other",
] as const;

type Status = "idle" | "sending" | "error";
type Sequence = "idle" | "entering" | "packet" | "squat" | "driving" | "thanks";

const QUICK_REASONS = [
  "💼 Open to Chat / Roles",
  "💡 Portfolio Feedback",
  "👋 Just Saying Hi",
  "⚙️ Other",
] as const;

const OTHER_REASON = "⚙️ Other";

const label =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sequence, setSequence] = useState<Sequence>("idle");
  const [teasing, setTeasing] = useState(false);
  const [role, setRole] = useState<string>(ROLES[0]);
  const [identity, setIdentity] = useState("");
  const [message, setMessage] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showOther, setShowOther] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);
  const returnRef = useRef<HTMLButtonElement | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const later = useCallback((callback: () => void, milliseconds: number) => {
    const timer = window.setTimeout(callback, milliseconds);
    timersRef.current.push(timer);
  }, []);

  const openModal = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (sequence !== "idle") return;
    setTeasing(false);
    setOpen(false);
    setStatus("idle");
  }, [sequence]);

  const returnToSite = useCallback(() => {
    clearTimers();
    setOpen(false);
    setStatus("idle");
    setSequence("idle");
    setTeasing(false);
    setIdentity("");
    setMessage("");
    setOtherReason("");
    setShowOther(false);
    setRole(ROLES[0]);
  }, [clearTimers]);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyShown = true;
    }
    if (alreadyShown) return;
    const timer = window.setTimeout(() => openModal(), AUTO_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, [openModal]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (sequence === "thanks") returnRef.current?.focus();
    else if (sequence === "idle") firstFieldRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && sequence === "idle") {
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, select, input, textarea, a[href], [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables.item(0);
      const last = focusables.item(focusables.length - 1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, sequence, closeModal]);

  const finishSequence = useCallback(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setSequence("thanks");
      return;
    }
    setSequence("packet");
    later(() => setSequence("squat"), 850);
    later(() => setSequence("driving"), 1_000);
    later(() => setSequence("thanks"), 1_475);
  }, [later]);

  const addQuickReason = (reason: string) => {
    if (reason === OTHER_REASON) {
      setShowOther((current) => !current);
      return;
    }
    setMessage((current) => {
      if (current.includes(reason)) return current;
      return current ? `${current}\n${reason}` : reason;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "sending" || sequence !== "idle") return;
    setStatus("sending");
    setTeasing(false);
    setSequence("entering");
    const arrivalStartedAt = performance.now();

    const trimmedIdentity = identity.trim();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !trimmedIdentity || trimmedMessage.length > 2000 || trimmedIdentity.length > 200) {
      setStatus("error");
      setSequence("idle");
      return;
    }
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentity);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
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
            ...(otherReason.trim() ? [`Other reason: ${otherReason.trim()}`] : []),
            "",
            trimmedMessage,
          ].join("\n"),
        }),
      });
      const data = (await response.json()) as { success?: boolean };
      if (!response.ok || !data.success) throw new Error("Submission failed");
      const arrivalRemaining = Math.max(0, 1_200 - (performance.now() - arrivalStartedAt));
      if (arrivalRemaining > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, arrivalRemaining));
      }
      finishSequence();
    } catch {
      setStatus("error");
      setSequence("idle");
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-foreground/15";
  const sequenceActive = sequence !== "idle" && sequence !== "thanks";

  return (
    <>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center px-6 py-8 sm:px-10">
          <Button type="button" variant="outline" onClick={openModal} className={`${label} h-auto rounded-full px-5 py-2.5`}>
            Feedback would be very much appreciated
          </Button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-foreground/20 p-4 backdrop-blur-sm motion-safe:animate-fade-in sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={sequence === "thanks" ? "feedback-thanks-title" : "feedback-title"}
            className={`relative z-20 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-border/70 bg-background/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 motion-safe:animate-scale-in sm:p-8 ${
              sequenceActive ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100"
            } ${sequence === "thanks" ? "pointer-events-none opacity-0" : ""}`}
          >
            <div className="feedback-wing-accent -mx-6 -mt-6 mb-6 h-28 overflow-hidden border-b border-border/70 sm:-mx-8 sm:-mt-8 sm:h-32">
              <img src={frontWing.url} alt="Écurie Aix race car front wing" className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h2 id="feedback-title" className="text-xl font-semibold text-foreground">
                  Leave your thoughts &amp; connect
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Any feedback is welcome, whether it's thoughts on the portfolio, project suggestions, or opportunities to connect.
                </p>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={closeModal} aria-label="Dismiss feedback" className="-mr-1 -mt-1 shrink-0 rounded-full text-muted-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <p className={label}>Quick reason</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_REASONS.map((reason) => (
                    <Button key={reason} type="button" variant="outline" size="sm" onClick={() => addQuickReason(reason)} disabled={status === "sending"} className="h-8 rounded-full px-3 text-xs font-normal">
                      {reason}
                    </Button>
                  ))}
                </div>
                {showOther && (
                  <input
                    value={otherReason}
                    onChange={(event) => setOtherReason(event.target.value)}
                    maxLength={120}
                    placeholder="Tell me your reason"
                    aria-label="Your reason"
                    className={`${field} motion-safe:animate-fade-in`}
                    disabled={status === "sending"}
                  />
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="feedback-role" className={label}>Who are you?</label>
                <select id="feedback-role" ref={firstFieldRef} value={role} onChange={(event) => setRole(event.target.value)} className={field} disabled={status === "sending"}>
                  {ROLES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="feedback-identity" className={label}>Your name, email, or LinkedIn</label>
                <input id="feedback-identity" value={identity} onChange={(event) => setIdentity(event.target.value)} required maxLength={200} placeholder="e.g. Aurelien Pons · aurelien.pons@example.com or LinkedIn URL" className={field} disabled={status === "sending"} />
                <p className="text-xs text-muted-foreground">Leave your info so I can thank you directly or follow up.</p>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="feedback-message" className={label}>Your feedback</label>
                <textarea id="feedback-message" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={5} placeholder="What worked, what didn't, what you'd change..." className={`${field} resize-none`} disabled={status === "sending"} />
              </div>
              {status === "error" && <p className="text-sm text-destructive">That didn't go through. Your feedback is still here, so you can try again.</p>}
              <div className="flex items-center justify-end gap-3 pt-1">
                <Button type="button" variant="ghost" onClick={closeModal} className="rounded-full text-muted-foreground">Dismiss</Button>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  onMouseEnter={() => setTeasing(true)}
                  onMouseLeave={() => setTeasing(false)}
                  onFocus={() => setTeasing(true)}
                  onBlur={() => setTeasing(false)}
                  className="rounded-full px-5"
                >
                  {status === "sending" ? "Sending..." : "Submit Feedback 🏁"}
                </Button>
              </div>
            </form>
          </div>

          <div className={`feedback-car-layer ${teasing && sequence === "idle" ? "is-teasing" : ""} ${sequenceActive ? `is-${sequence}` : ""}`} aria-hidden="true">
            <img src={carCutout} alt="" className="feedback-car" />
            {(sequence === "packet" || sequence === "squat") && (
              <span className="feedback-packet"><span /><span /><span /></span>
            )}
          </div>

          {sequence === "thanks" && (
            <div ref={panelRef} className="fixed inset-0 z-40 flex items-center justify-center bg-background px-6 text-center motion-safe:animate-fade-in">
              <div className="max-w-3xl">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border text-chart-2">
                  <Check className="h-6 w-6" />
                </span>
                <h2 id="feedback-thanks-title" className="mt-8 text-4xl font-bold text-foreground sm:text-6xl">I APPRECIATE YOUR FEEDBACK.</h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Your input helps me continuously improve.</p>
                <Button ref={returnRef} type="button" variant="outline" onClick={returnToSite} className="mt-10 rounded-full px-6">
                  Return to Site <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}