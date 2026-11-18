import type { CSSProperties } from "react";
import { BadgeCheck, Bike, Car, Repeat, Venus } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { RouteScene } from "../components/RouteScene";
import { CommuteScreen, Phone, Avatar } from "../components/AppScreens";

const h = (n: number) => ({ "--h": n }) as CSSProperties;

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="j-container hero-grid">
        <div className="hero-text">
          <p className="j-pill hero-in" style={h(0)}>
            <BadgeCheck size={16} strokeWidth={1.75} aria-hidden />
            Verified office commuters only
          </p>
          <h1 className="j-display hero-in" id="hero-title" style={h(1)}>
            Share the commute you already make.
          </h1>
          <p className="j-lead hero-lead hero-in" style={h(2)}>
            Jatriya connects you with verified commuters travelling your route.
            Plan recurring rides, share the cost, and make every journey smarter.
          </p>
          <div className="j-actions hero-in" style={h(3)}>
            <ButtonLink to="/register" size="lg" arrow>
              Find your commute
            </ButtonLink>
            <ButtonLink to="/how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <ul className="hero-facts hero-in" style={h(4)} aria-label="Ways to ride">
            <li>
              <Car size={18} strokeWidth={1.75} aria-hidden /> Carpool
            </li>
            <li>
              <Bike size={18} strokeWidth={1.75} aria-hidden /> Bike-pool
            </li>
            <li>
              <Repeat size={18} strokeWidth={1.75} aria-hidden /> Weekly or monthly
            </li>
            <li>
              <Venus size={18} strokeWidth={1.75} aria-hidden /> Female-only option
            </li>
          </ul>
        </div>

        <div className="hero-stage">
          <div className="hero-map is-live">
            <RouteScene tone="teal" />
            <Phone className="hero-phone" label="Jatriya app home screen showing a recurring Uttara to Gulshan 1 commute">
              <CommuteScreen />
            </Phone>
          </div>
          <div className="hero-note" role="img" aria-label="Notification: Tanvir accepted your seat request for tomorrow at 8:15 AM">
            <Avatar initials="TA" />
            <span>
              <b>Tanvir accepted your request</b>
              <small>Tomorrow · 8:15 AM · Sun–Thu</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
