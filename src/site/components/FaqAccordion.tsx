import { useId, useState, type ReactNode } from "react";

export type Faq = { q: string; a: ReactNode; text: string };

/**
 * Accessible disclosure list (WAI-ARIA accordion pattern): each question is a
 * button with aria-expanded that controls a labelled region.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
            <h3 className="faq-q">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <i className="faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="faq-a" hidden={!isOpen}>
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
