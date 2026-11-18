import { useEffect, useId, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

/*
 * The shared J. Geometry is copied verbatim from the official asset
 * public/brand/jatria-symbol.svg — never redraw, recolour or distort it.
 *
 * The optional reveal follows Brand Guidelines §11: strokes draw, the dot
 * settles last, 900 ms in total. It is a mask over the untouched official
 * shapes, so the resting state is the official symbol pixel for pixel.
 */
const BIG_J =
  "M73 13A6 6 0 0 1 85 13V52A37 37 0 0 1 11 52A6 6 0 0 1 23 52A25 25 0 0 0 73 52Z";
const SMALL_J =
  "M55 37A6 6 0 0 1 67 37V52A19 19 0 0 1 29 52A6 6 0 0 1 41 52A7 7 0 0 0 55 52Z";
// Centre lines of each stroke — used only to drive the reveal mask.
const BIG_J_SPINE = "M79 13V52A31 31 0 0 1 17 52";
const SMALL_J_SPINE = "M61 37V52A13 13 0 0 1 35 52";

export function LogoMark({
  size = 28,
  animate = false,
  className = "",
}: {
  size?: number;
  animate?: boolean;
  className?: string;
}) {
  const maskId = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<"idle" | "play" | "done">(() =>
    animate && !prefersReducedMotion() ? "idle" : "done",
  );

  useEffect(() => {
    if (phase !== "idle") return;
    const start = requestAnimationFrame(() => setPhase("play"));
    const end = window.setTimeout(() => setPhase("done"), 1000);
    return () => {
      cancelAnimationFrame(start);
      window.clearTimeout(end);
    };
    // Runs once per mount; later phases never restart the reveal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const masked = phase !== "done";
  return (
    <svg
      className={`logo-mark logo-${phase} ${className}`}
      viewBox="0 0 74 82"
      height={size}
      width={(size * 74) / 82}
      aria-hidden="true"
      focusable="false"
    >
      {masked && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
            <path className="logo-spine logo-spine-big" d={BIG_J_SPINE} pathLength={1} />
            <path className="logo-spine logo-spine-small" d={SMALL_J_SPINE} pathLength={1} />
          </mask>
        </defs>
      )}
      <g transform="translate(-11 -7)">
        <g mask={masked ? `url(#${maskId})` : undefined}>
          <path d={BIG_J} fill="#087F8C" />
          <path d={SMALL_J} fill="#25C6B2" />
        </g>
        <circle className="logo-dot" cx="61" cy="14" r="7" fill="#25C6B2" />
      </g>
    </svg>
  );
}

/**
 * Primary combination: symbol + brand name.
 * NOTE: the custom wordmark artwork is not in the repository yet, so the name
 * is set in Inter Display Bold (the brand typeface for the brand name).
 * Swap this span for the official wordmark SVG when it is added.
 */
export function Logo({
  size = 28,
  animate = false,
}: {
  size?: number;
  animate?: boolean;
}) {
  return (
    <span className="logo" style={{ fontSize: size * 0.82 }}>
      <LogoMark size={size} animate={animate} />
      <span className="logo-word">Jatriya</span>
    </span>
  );
}
