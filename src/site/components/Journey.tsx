import type { ReactNode } from "react";
import { InView } from "./Reveal";

/**
 * A vertical route that runs through a page. Each station is a stop on the
 * journey; its rail segment draws in as the station comes into view.
 */
export function Journey({ children }: { children: ReactNode }) {
  return <ol className="journey">{children}</ol>;
}

export function Station({
  n,
  eyebrow,
  title,
  children,
  visual,
  id,
  flip = false,
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  visual?: ReactNode;
  id?: string;
  flip?: boolean;
}) {
  return (
    <li className="station-item" id={id}>
      <InView className={`station${flip ? " is-flip" : ""}${visual ? "" : " no-visual"}`}>
        <div className="station-rail" aria-hidden="true">
          <span className="station-dot" />
          <span className="station-line" />
        </div>
        <div className="station-copy">
          <p className="j-eyebrow">
            <span className="station-n">{n}</span> {eyebrow}
          </p>
          <h2 className="j-h2">{title}</h2>
          <div className="station-body">{children}</div>
        </div>
        {visual && <div className="station-visual">{visual}</div>}
      </InView>
    </li>
  );
}
