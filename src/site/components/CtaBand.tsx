import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Closing conversion band. Carries the oversized, cropped symbol — the one
 * supporting graphic device in the brand system, used once per layout.
 */
export function CtaBand({
  title,
  lead,
  actions,
}: {
  title: ReactNode;
  lead: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="j-container">
        <Reveal className="cta-panel">
          <img className="cta-symbol" src="/brand/jatria-symbol.svg" alt="" aria-hidden="true" />
          <div className="cta-copy">
            <h2 className="j-h2" id="cta-title">
              {title}
            </h2>
            <p className="j-lead">{lead}</p>
            <div className="j-actions">{actions}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
