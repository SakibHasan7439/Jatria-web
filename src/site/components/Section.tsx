import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  children,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center" | "split";
  tone?: "light" | "dark";
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal className={`intro intro-${align} intro-${tone}`}>
      <div className="intro-head">
        {eyebrow && <p className="j-eyebrow">{eyebrow}</p>}
        <h2 className="j-h2" id={id}>
          {title}
        </h2>
      </div>
      {(lead || children) && (
        <div className="intro-body">
          {lead && <p className="j-lead">{lead}</p>}
          {children}
        </div>
      )}
    </Reveal>
  );
}

/** Small page hero used by secondary pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  visual,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section className={`phero phero-${tone}${visual ? " has-visual" : ""}`}>
      <div className="j-container phero-grid">
        <div className="phero-copy">
          <p className="j-eyebrow hero-in" style={{ "--h": 0 } as CSSProperties}>
            {eyebrow}
          </p>
          <h1 className="j-h1 hero-in" style={{ "--h": 1 } as CSSProperties}>
            {title}
          </h1>
          <p className="j-lead hero-in" style={{ "--h": 2 } as CSSProperties}>
            {lead}
          </p>
          {actions && (
            <div className="j-actions hero-in" style={{ "--h": 3 } as CSSProperties}>
              {actions}
            </div>
          )}
        </div>
        {visual && <div className="phero-visual">{visual}</div>}
      </div>
    </section>
  );
}
