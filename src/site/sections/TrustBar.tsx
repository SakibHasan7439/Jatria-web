import { BadgeCheck, CalendarClock, ShieldCheck, Wallet } from "lucide-react";
import { Reveal } from "../components/Reveal";

const items = [
  { Icon: BadgeCheck, title: "Verified commuters", text: "Identity and workplace confirmed" },
  { Icon: CalendarClock, title: "Recurring journeys", text: "Same route, weekly or monthly" },
  { Icon: Wallet, title: "Transparent cost sharing", text: "Split openly, paid in the app" },
  { Icon: ShieldCheck, title: "Safety-first", text: "Live location and SOS on every trip" },
];

export function TrustBar() {
  return (
    <section className="trust" aria-label="What Jatriya is built on">
      <div className="j-container">
        <ul className="trust-list">
          {items.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i} className="trust-item">
                <Icon size={22} strokeWidth={1.75} aria-hidden />
                <span>
                  <b>{title}</b>
                  <small>{text}</small>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
