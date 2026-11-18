import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "on-dark";

/** Router link styled as a Jatriya button. Arrow nudges forward on hover. */
export function ButtonLink({
  to,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg" | "sm";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`jb jb-${variant} jb-${size}${className ? ` ${className}` : ""}`}
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="jb-arrow" size={18} strokeWidth={1.75} aria-hidden />}
    </Link>
  );
}

/** Inline text link with a directional arrow. */
export function TextLink({
  to,
  children,
  tone = "teal",
}: {
  to: string;
  children: ReactNode;
  tone?: "teal" | "mint";
}) {
  return (
    <Link to={to} className={`jlink jlink-${tone}`}>
      <span>{children}</span>
      <ArrowRight className="jb-arrow" size={16} strokeWidth={1.75} aria-hidden />
    </Link>
  );
}
