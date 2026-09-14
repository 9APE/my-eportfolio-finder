import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

/** Wraps children in a container that tilts in 3D following the cursor. Respects prefers-reduced-motion. */
export function TiltWrapper({ children, className, maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 300ms ease-out", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
