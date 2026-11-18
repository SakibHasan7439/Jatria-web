import { Check } from "lucide-react";
import { SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { ButtonLink, TextLink } from "../components/Button";
import { SeatRoute } from "../components/SeatRoute";

const points = [
  "Share the route you already drive or ride",
  "Fill the seats that would otherwise travel empty",
  "Recover part of your commuting costs",
  "Ride with verified office commuters",
  "Arrange recurring weekly or monthly journeys",
];

export function HomeOwners() {
  return (
    <section className="section owners" aria-labelledby="owners-title">
      <div className="j-container owners-grid">
        <Reveal className="owners-visual" variant="fade">
          <SeatRoute />
        </Reveal>
        <div className="owners-copy">
          <SectionIntro
            id="owners-title"
            eyebrow="For car and bike owners"
            title="Your empty seats can make someone’s commute better."
            lead="Cars can offer one to three seats, bikes a single pillion. You set the route and the hours — Jatriya finds commuters going your way."
          />
          <Reveal>
            <ul className="j-checks">
              {points.map((point) => (
                <li key={point}>
                  <Check size={18} strokeWidth={2} aria-hidden /> {point}
                </li>
              ))}
            </ul>
            <div className="j-actions">
              <ButtonLink to="/register?role=driver" arrow>
                Share your ride
              </ButtonLink>
              <TextLink to="/vehicle-owners">Learn more for owners</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
