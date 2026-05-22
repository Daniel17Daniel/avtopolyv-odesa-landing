import { useEffect, useRef } from "react";

function isReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
}

export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.3) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isReducedMotion() || isTouchDevice()) return;

    el.style.transition = "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.willChange = "transform";

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = 100;
      if (dist < max) {
        const power = 1 - dist / max;
        el.style.transform = `translate(${dx * strength * power}px, ${dy * strength * power}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };
    const onLeave = () => { el.style.transform = "translate(0, 0)"; };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 8) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (isReducedMotion() || isTouchDevice()) return;

    card.style.transformStyle = "preserve-3d";
    card.style.transition = "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)";
    card.style.willChange = "transform";

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rx = ((y - cy) / cy) * -maxTilt;
      const ry = ((x - cx) / cx) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);
  return ref;
}
