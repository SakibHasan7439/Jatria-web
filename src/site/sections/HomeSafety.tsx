import {
  BadgeCheck,
  Building2,
  LocateFixed,
  Siren,
  Star,
  Venus,
} from "lucide-react";
import { SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { TextLink } from "../components/Button";
import { LiveTripScreen, Phone } from "../components/AppScreens";

const sw = 1.75;

const safetyFeatures = [
  { Icon: BadgeCheck, title: "ID verification", text: "Members confirm who they are before they can ride." },
  { Icon: Building2, title: "Workplace verification", text: "Jatriya is for office commuters — workplaces are confirmed too." },
  { Icon: Star, title: "Ratings and reviews", text: "Both sides rate each trip, so trust builds over time." },
  { Icon: LocateFixed, title: "Live location sharing", text: "Let chosen contacts follow your journey in real time." },
  { Icon: Siren, title: "Emergency SOS", text: "Press and hold to alert your emergency contacts." },
  { Icon: Venus, title: "Female-only matching", text: "Women can choose to be matched only with women." },
];

export function HomeSafety() {
  return (
    <section className="section safety-band" aria-labelledby="safety-title">
      <div className="j-container safety-grid">
        <div>
          <SectionIntro
            id="safety-title"
            tone="dark"
            eyebrow="Safety and trust"
            title="Trust is the product."
            lead="Verification, ratings, live location and SOS are visible in every screen — not hidden in a settings menu."
          />
          <ul className="safety-list">
            {safetyFeatures.map(({ Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i}>
                  <Icon size={22} strokeWidth={sw} aria-hidden />
                  <b>{title}</b>
                  <p>{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <TextLink to="/safety" tone="mint">
              How Jatriya keeps you safe
            </TextLink>
          </Reveal>
        </div>
        <Reveal className="safety-visual" variant="fade">
          <Phone label="Live trip screen with location sharing and SOS">
            <LiveTripScreen />
          </Phone>
          <div className="safety-sos-card" aria-hidden="true">
            <span className="sos-ring">SOS</span>
            <span>
              <b>Emergency SOS</b>
              <small>Hold for 3 seconds. Your contacts get your live location.</small>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
