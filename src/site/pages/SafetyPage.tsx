import type { CSSProperties } from "react";
import {
  BadgeCheck,
  Building2,
  Flag,
  Info,
  LocateFixed,
  MessageCircle,
  PhoneCall,
  Siren,
  Star,
  Venus,
} from "lucide-react";
import { PageHero, SectionIntro } from "../components/Section";
import { ButtonLink } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Avatar, LiveTripScreen, Phone, ProfileScreen } from "../components/AppScreens";
import { CtaBand } from "../components/CtaBand";

const sw = 1.75;

function TrustStack() {
  return (
    <div className="trust-stack" aria-hidden="true">
      <div className="ts-card ts-profile">
        <Avatar initials="SK" tone="mint" size="lg" />
        <span>
          <b>Sadia Karim</b>
          <small>Commuter · Uttara → Banani</small>
        </span>
      </div>
      <ul className="ts-checks">
        <li style={{ "--i": 0 } as CSSProperties}>
          <BadgeCheck size={18} strokeWidth={sw} /> Identity verified
        </li>
        <li style={{ "--i": 1 } as CSSProperties}>
          <Building2 size={18} strokeWidth={sw} /> Workplace verified
        </li>
        <li style={{ "--i": 2 } as CSSProperties}>
          <Venus size={18} strokeWidth={sw} /> Female-only matching on
        </li>
        <li style={{ "--i": 3 } as CSSProperties}>
          <Star size={18} strokeWidth={sw} /> Rated after every trip
        </li>
      </ul>
    </div>
  );
}

const before = [
  {
    Icon: BadgeCheck,
    title: "Identity verification",
    text: "Members confirm who they are before they can offer or request a seat.",
  },
  {
    Icon: Building2,
    title: "Workplace verification",
    text: "Jatriya is built for office commuters, so workplaces are confirmed as part of joining.",
  },
  {
    Icon: Star,
    title: "Ratings and reviews",
    text: "After each trip, both sides can rate and review. A profile shows its history before you ride.",
  },
];

const during = [
  {
    Icon: LocateFixed,
    title: "Live location sharing",
    text: "Share your trip in real time with the contacts you choose, from pickup to drop-off.",
  },
  {
    Icon: Siren,
    title: "Emergency SOS",
    text: "Press and hold for three seconds to alert your emergency contacts and share your live location.",
  },
  {
    Icon: MessageCircle,
    title: "Safe communication",
    text: "Plan pickups in the in-app chat with people you have matched with — no need to exchange personal numbers first.",
  },
];

export function SafetyPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Safety and trust"
        title="Know who you ride with. Every time."
        lead="Sharing a commute only works when you trust the people beside you. That is why verification, ratings, live location and SOS are part of every Jatriya journey."
        actions={
          <ButtonLink to="/register" size="lg" variant="accent" arrow>
            Join Jatriya
          </ButtonLink>
        }
        visual={<TrustStack />}
      />

      <section className="section" aria-labelledby="before-title">
        <div className="j-container split-feature">
          <div>
            <SectionIntro
              id="before-title"
              eyebrow="Before the ride"
              title="Trust is built before anyone gets in."
              lead="Every profile tells you who someone is, where they work, and how past trips went."
            />
            <ul className="feature-list">
              {before.map(({ Icon, title, text }, i) => (
                <li key={title}>
                  <Reveal delay={i} className="feature-row">
                    <span className="feature-icon">
                      <Icon size={22} strokeWidth={sw} aria-hidden />
                    </span>
                    <span>
                      <b>{title}</b>
                      <p>{text}</p>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="split-feature-visual" variant="fade">
            <Phone label="A verified commuter profile with ratings and reviews">
              <ProfileScreen />
            </Phone>
          </Reveal>
        </div>
      </section>

      <section className="section safety-band" aria-labelledby="during-title">
        <div className="j-container split-feature is-flip">
          <Reveal className="split-feature-visual" variant="fade">
            <Phone label="A live trip with location sharing and SOS">
              <LiveTripScreen />
            </Phone>
          </Reveal>
          <div>
            <SectionIntro
              id="during-title"
              tone="dark"
              eyebrow="During the ride"
              title="Help is always one press away."
              lead="Safety tools stay visible on the trip screen — never hidden in a menu."
            />
            <ul className="feature-list is-dark">
              {during.map(({ Icon, title, text }, i) => (
                <li key={title}>
                  <Reveal delay={i} className="feature-row">
                    <span className="feature-icon">
                      <Icon size={22} strokeWidth={sw} aria-hidden />
                    </span>
                    <span>
                      <b>{title}</b>
                      <p>{text}</p>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="emergency-note">
              <PhoneCall size={20} strokeWidth={sw} aria-hidden />
              <span>
                In an emergency, call <b>999</b>, Bangladesh’s national emergency service.
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="women-title">
        <div className="j-container">
          <Reveal className="women">
            <div className="women-copy">
              <span className="women-icon">
                <Venus size={26} strokeWidth={sw} aria-hidden />
              </span>
              <h2 className="j-h2" id="women-title">
                Female-only matching, whenever you want it.
              </h2>
              <p className="j-lead">
                Women can choose to be matched only with other women — as drivers,
                riders or both. Turn it on once and it applies to every search and
                every recurring plan.
              </p>
            </div>
            <div className="women-visual" aria-hidden="true">
              <div className="women-toggle">
                <span>
                  <b>Female-only matching</b>
                  <small>Show me women commuters only</small>
                </span>
                <i className="women-switch" />
              </div>
              <div className="women-row">
                <Avatar initials="SK" tone="mint" />
                <span>
                  <b>Sadia Karim</b>
                  <small>Carpool · leaves 8:20</small>
                </span>
                <span className="j-tag">Female-only</span>
              </div>
              <div className="women-row">
                <Avatar initials="NR" />
                <span>
                  <b>Nadia Rahman</b>
                  <small>Carpool · pickup 8:15</small>
                </span>
                <span className="j-tag">Female-only</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section after-section" aria-labelledby="after-title">
        <div className="j-container">
          <SectionIntro
            id="after-title"
            align="split"
            eyebrow="After the ride"
            title="Every trip makes the community safer."
            lead="Feedback is how trust grows over months of shared commuting."
          />
          <div className="after-grid">
            <Reveal className="after-item" delay={0}>
              <Star size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Rate and review</h3>
              <p>
                Rate the people you rode with and leave a short review. Ratings stay
                on profiles, so the next commuter can decide with confidence.
              </p>
            </Reveal>
            <Reveal className="after-item" delay={1}>
              <Flag size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Report a trip</h3>
              <p>
                If something felt wrong, use “Report this trip” on the trip screen.
                Reports go to the Jatriya safety team for review.
              </p>
            </Reveal>
          </div>

          <Reveal className="status-note">
            <Info size={20} strokeWidth={sw} aria-hidden />
            <p>
              <b>Where we are today.</b> Jatriya is in active development. The safety
              features on this page are core to the product and are being introduced
              as the app rolls out across Dhaka. We will keep this page up to date as
              each one goes live.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Commute with people you can verify."
        lead="Join Jatriya and set up your route in a few minutes."
        actions={
          <>
            <ButtonLink to="/register" size="lg" arrow>
              Get started with Jatriya
            </ButtonLink>
            <ButtonLink to="/help" size="lg" variant="secondary">
              Safety FAQs
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
