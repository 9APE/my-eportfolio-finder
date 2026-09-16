import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { prefersReducedMotion } from "@/hooks/use-in-view";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Reset zoom when the image changes
  useEffect(() => {
    resetView();
  }, [index, resetView]);

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const applyZoom = (z: number) => {
    const next = clampZoom(z);
    setZoom(next);
    if (next === 1) setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
      if (e.key === "+" || e.key === "=") applyZoom(zoom + 0.5);
      if (e.key === "-") applyZoom(zoom - 0.5);
      if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, zoom, onClose, onIndexChange, resetView]);

  const onWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    applyZoom(zoom - Math.sign(e.deltaY) * 0.4);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (zoom === 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    setPan({ x: drag.panX + (e.clientX - drag.startX), y: drag.panY + (e.clientY - drag.startY) });
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    applyZoom(zoom === 1 ? 2.5 : 1);
  };

  const zoomed = zoom > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 animate-fade-in"
      onClick={onClose}
    >
      <span className="absolute left-5 top-6 font-mono text-[11px] tracking-[0.2em] text-background/60">
        IMAGE {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        {zoomed && ` · ${zoom.toFixed(1)}×`}
      </span>

      <div className="absolute right-5 top-5 flex items-center gap-1">
        <button
          aria-label="Zoom out"
          onClick={(e) => {
            e.stopPropagation();
            applyZoom(zoom - 0.5);
          }}
          className="p-2 text-background/70 transition-colors hover:text-background"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          aria-label="Zoom in"
          onClick={(e) => {
            e.stopPropagation();
            applyZoom(zoom + 0.5);
          }}
          className="p-2 text-background/70 transition-colors hover:text-background"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          aria-label="Close"
          onClick={onClose}
          className="p-2 text-background/70 transition-colors hover:text-background"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + images.length) % images.length);
            }}
            className="absolute left-4 z-10 p-3 text-background/70 transition-colors hover:text-background"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % images.length);
            }}
            className="absolute right-4 z-10 p-3 text-background/70 transition-colors hover:text-background"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt="Project detail"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        draggable={false}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: dragging || prefersReducedMotion() ? "none" : "transform 200ms ease-out",
        }}
        className={`max-h-[86vh] max-w-[86vw] touch-none select-none bg-background object-contain ${
          zoomed ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
        }`}
      />

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.2em] text-background/50">
        Scroll or double-click to zoom · drag to pan
      </span>
    </div>
  );
}
