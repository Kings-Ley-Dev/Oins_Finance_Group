import { useRef, useState, useEffect } from "react";

// Reveals children with a fade + rise + slight scale as they scroll into view,
// mirroring the Webflow layout76 entrance (translate3d up + scale3d + opacity).
// By default it re-triggers every time the element enters the viewport so the
// animation is clearly tied to scrolling. Pass `once` to play it a single time.
export default function Reveal({ children, delay = 0, once = false, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) ob.disconnect();
        } else if (!once) {
          setShown(false); // reset so it can replay on the next scroll-in
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms", willChange: "transform, opacity" }}
      className={`h-full transform-gpu transition-all duration-[800ms] ease-out ${
        shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
