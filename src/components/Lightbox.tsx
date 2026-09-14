import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onIndexChange]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 animate-fade-in"
      onClick={onClose}
    >
      <span className="absolute left-5 top-6 font-mono text-[11px] tracking-[0.2em] text-background/60">
        REF. INSPECT — {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 p-2 text-background/70 transition-colors hover:text-background"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            className="absolute left-4 p-3 text-background/70 transition-colors hover:text-background"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            className="absolute right-4 p-3 text-background/70 transition-colors hover:text-background"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt="Project detail"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[86vh] max-w-[86vw] bg-background object-contain"
      />
    </div>
  );
}
