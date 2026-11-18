import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { useInView } from "../lib/motion";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Stagger index; each step adds 60 ms. */
  delay?: number;
  /** "up" (default) travels 24 px; "fade" only cross-fades. */
  variant?: "up" | "fade";
};

/** Fades and lifts its content into place the first time it is seen. */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  style,
  ...rest
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rv rv-${variant}${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, "--rv-i": delay } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Wrapper that only toggles `is-in` — children style their own entrance. */
export function InView({
  children,
  className = "",
  as = "div",
  ...rest
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "section" | "ol" | "ul";
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      className={`${className}${inView ? " is-in" : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
