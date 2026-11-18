import { useEffect, useRef, useState } from "react";

/** True when the visitor asked the OS for reduced motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/**
 * Reports once when an element first enters the viewport. Elements never
 * re-animate on later scrolls — motion should guide, not repeat.
 */
export function useInView<T extends Element>(
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const ref = useRef<T>(null);
  // Without IntersectionObserver, show everything immediately.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.15 } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return [ref, inView] as const;
}
