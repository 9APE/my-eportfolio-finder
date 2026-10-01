import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** Set once the prompt has been shown, so the timed auto-open fires at most once a session. */
export const FEEDBACK_SESSION_KEY = "feedback-prompt-shown";

type FeedbackContextValue = {
  open: boolean;
  /** Opens the dialog and marks the prompt as seen for this session. */
  openFeedback: () => void;
  setOpen: (open: boolean) => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

/**
 * Holds the feedback dialog's open state above the router outlet, so the trigger can live
 * anywhere in the page (it sits in the site footer) while <FeedbackWidget /> stays mounted
 * once at the root.
 */
export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openFeedback = useCallback(() => {
    try {
      sessionStorage.setItem(FEEDBACK_SESSION_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ open, openFeedback, setOpen }), [open, openFeedback]);

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used inside <FeedbackProvider>");
  return context;
}
