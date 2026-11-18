import { BadgeCheck, Building2, CalendarClock, ShieldCheck, Star, Wallet } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionIntro } from "../components/Section";
import { Avatar } from "../components/AppScreens";

const sw = 1.75;

function Schedule() {
  const rows = [
    { day: "Sun", out: "8:15", back: "18:00", on: true },
    { day: "Mon", out: "8:15", back: "18:00", on: true },
    { day: "Tue", out: "8:15", back: "18:00", on: true },
    { day: "Wed", out: "8:15", back: "18:00", on: true },
    { day: "Thu", out: "8:15", back: "17:30", on: true },
    { day: "Fri", out: "—", back: "—", on: false },
  ];
  return (
    <div className="sched" aria-hidden="true">
      <div className="sched-head">
        <span>Uttara → Gulshan 1</span>
        <span className="j-tag">Monthly</span>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.day} className={r.on ? "is-on" : undefined}>
            <b>{r.day}</b>
            <span className="sched-bar">
              <i />
            </span>
            <span className="sched-time">
              {r.out} <small>/</small> {r.back}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VerifyCard() {
  return (
    <div className="verify" aria-hidden="true">
      <div className="verify-top">
        <Avatar initials="TA" size="lg" />
        <span>
          <b>Tanvir Ahmed</b>
          <small>
            <Star size={13} strokeWidth={sw} /> 4.9 · Driver
          </small>
        </span>
      </div>
      <ul className="verify-list">
        <li>
          <BadgeCheck size={16} strokeWidth={sw} /> Identity verified
        </li>
        <li>
          <Building2 size={16} strokeWidth={sw} /> Workplace verified
        </li>
        <li>
          <Star size={16} strokeWidth={sw} /> Reviewed after each trip
        </li>
      </ul>
    </div>
  );
}

function SafetyMini() {
  return (
    <div className="safety-mini" aria-hidden="true">
      <div className="safety-mini-live">
        <i />
        <span>Sharing live location with 2 contacts</span>
      </div>
      <div className="safety-mini-sos">
        <span className="sos-ring">SOS</span>
        <small>Press and hold to alert</small>
      </div>
    </div>
  );
}

function CostSplit() {
  return (
    <div className="split" aria-hidden="true">
      <div className="split-total">
        <small>Trip cost, Uttara → Gulshan 1</small>
        <b>BDT 270</b>
      </div>
      <div className="split-bar">
        <span>
          <Avatar initials="TA" size="sm" />
          BDT 90
        </span>
        <span>
          <Avatar initials="NR" size="sm" tone="mint" />
          BDT 90
        </span>
        <span>
          <Avatar initials="SK" size="sm" tone="navy" />
          BDT 90
        </span>
      </div>
      <small className="split-note">
        <Wallet size={14} strokeWidth={sw} /> Paid in the app · illustrative example
      </small>
    </div>
  );
}

export function HomePromises() {
  return (
    <section className="section promises" aria-labelledby="promises-title">
      <div className="j-container">
        <SectionIntro
          id="promises-title"
          align="center"
          eyebrow="Why Jatriya"
          title="Built for the commute, not the one-off trip."
          lead="Four promises shape every screen of the product."
        />
        <div className="bento">
          <Reveal className="tile tile-wide" delay={0}>
            <div className="tile-copy">
              <CalendarClock className="tile-icon" size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Planned, not on-demand</h3>
              <p>
                Set your route and hours once. Ride with the same people every week
                or month — no last-minute searching at the kerb.
              </p>
            </div>
            <Schedule />
          </Reveal>
          <Reveal className="tile" delay={1}>
            <div className="tile-copy">
              <BadgeCheck className="tile-icon" size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">People you can verify</h3>
              <p>
                Every member confirms their identity and workplace. Ratings and
                reviews follow each trip.
              </p>
            </div>
            <VerifyCard />
          </Reveal>
          <Reveal className="tile tile-dark" delay={0}>
            <div className="tile-copy">
              <ShieldCheck className="tile-icon" size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Safety built in</h3>
              <p>
                Live location sharing and one-touch SOS on every journey.
                Female-only matching for women who want it.
              </p>
            </div>
            <SafetyMini />
          </Reveal>
          <Reveal className="tile tile-wide" delay={1}>
            <div className="tile-copy">
              <Wallet className="tile-icon" size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Fair, cashless sharing</h3>
              <p>
                Costs are split between riders and paid in the app. No bargaining,
                no cash changing hands.
              </p>
            </div>
            <CostSplit />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
