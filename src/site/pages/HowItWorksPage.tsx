import type { CSSProperties } from "react";
import { BadgeCheck, Bike, Building2, Car, Check, Clock, MessageCircle, Repeat, Route, Venus } from "lucide-react";
import { PageHero } from "../components/Section";
import { ButtonLink } from "../components/Button";
import { RouteScene } from "../components/RouteScene";
import { Journey, Station } from "../components/Journey";
import { ChatScreen, Phone, SetupScreen, Avatar } from "../components/AppScreens";
import { CtaBand } from "../components/CtaBand";

const sw = 1.75;

function MatchCriteria() {
  return (
    <div className="criteria" aria-hidden="true">
      <div className="crit">
        <span className="crit-head">
          <Route size={18} strokeWidth={sw} /> Route
        </span>
        <svg viewBox="0 0 240 90" className="crit-route">
          <path d="M12 74 C 50 74 64 46 100 44" className="crit-a" />
          <path d="M20 14 C 56 14 70 40 100 44" className="crit-b" />
          <path d="M100 44 C 140 42 170 44 228 40" className="crit-shared" />
          <circle cx="12" cy="74" r="5" className="crit-dot-a" />
          <circle cx="20" cy="14" r="5" className="crit-dot-b" />
          <circle cx="228" cy="40" r="6" className="crit-dot-end" />
        </svg>
        <small>Your paths overlap for most of the journey.</small>
      </div>
      <div className="crit">
        <span className="crit-head">
          <Clock size={18} strokeWidth={sw} /> Time
        </span>
        <div className="crit-time">
          <div className="crit-scale">
            <span>7:45</span>
            <span>8:15</span>
            <span>8:45</span>
          </div>
          <div className="crit-bar">
            <i style={{ left: "18%", width: "46%" }} />
          </div>
          <div className="crit-bar is-b">
            <i style={{ left: "34%", width: "44%" }} />
          </div>
        </div>
        <small>Your departure windows line up.</small>
      </div>
      <div className="crit">
        <span className="crit-head">
          <BadgeCheck size={18} strokeWidth={sw} /> Trust
        </span>
        <div className="crit-trust">
          <Avatar initials="SK" tone="mint" />
          <span>
            <b>Sadia Karim</b>
            <small>
              <BadgeCheck size={14} strokeWidth={sw} /> ID and workplace verified
            </small>
          </span>
        </div>
        <small>Both of you are verified, and your preferences match.</small>
      </div>
    </div>
  );
}

function Modes() {
  return (
    <div className="modes">
      <div className="mode">
        <span className="mode-icon">
          <Car size={24} strokeWidth={sw} />
        </span>
        <h3 className="j-h3">Carpool</h3>
        <p>A car owner shares one to three empty seats with commuters on the same route.</p>
        <div className="mode-seats" aria-label="Up to three shared seats">
          <i className="is-owner" />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="mode">
        <span className="mode-icon">
          <Bike size={24} strokeWidth={sw} />
        </span>
        <h3 className="j-h3">Bike-pool</h3>
        <p>A motorbike owner offers a single pillion seat on the ride they already make.</p>
        <div className="mode-seats" aria-label="One shared seat">
          <i className="is-owner" />
          <i />
        </div>
      </div>
    </div>
  );
}

function MonthPlan() {
  // A generic five-week grid: Sun–Thu ride days, Fri–Sat off.
  const cells = Array.from({ length: 35 }, (_, i) => i);
  return (
    <div className="month" aria-hidden="true">
      <div className="month-head">
        <b>Monthly commute</b>
        <span className="j-tag">Sun–Thu · 8:15 AM</span>
      </div>
      <div className="month-days">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="month-grid">
        {cells.map((i) => {
          const day = i % 7;
          const on = day <= 4 && i > 1 && i < 33;
          return <span key={i} className={on ? "is-on" : undefined} style={{ "--c": i } as CSSProperties} />;
        })}
      </div>
      <div className="month-foot">
        <span>
          <Repeat size={16} strokeWidth={sw} /> Same people, same time
        </span>
        <span>
          <Check size={16} strokeWidth={sw} /> Planned once
        </span>
      </div>
    </div>
  );
}

function CostFormula() {
  return (
    <div className="formula" aria-hidden="true">
      <div className="formula-row">
        <span className="formula-cell">
          <small>Trip cost</small>
          <b>BDT 270</b>
        </span>
        <span className="formula-op">÷</span>
        <span className="formula-cell">
          <small>Commuters</small>
          <b>3</b>
        </span>
        <span className="formula-op">=</span>
        <span className="formula-cell is-result">
          <small>Each</small>
          <b>BDT 90</b>
        </span>
      </div>
      <p className="formula-note">Illustrative example. Your share is shown before you request a seat.</p>
    </div>
  );
}

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="One route, planned once. Shared every week."
        lead="Jatriya matches office commuters who already travel the same way at the same time. Here is the full journey — from setting up your commute to sharing the cost."
        actions={
          <>
            <ButtonLink to="/register" size="lg" arrow>
              Find your commute
            </ButtonLink>
            <ButtonLink to="/help" size="lg" variant="secondary">
              Read the FAQs
            </ButtonLink>
          </>
        }
        visual={
          <div className="phero-map is-live">
            <RouteScene tone="navy" />
          </div>
        }
      />

      <section className="section journey-section" aria-label="The Jatriya journey">
        <div className="j-container">
          <Journey>
            <Station
              n="01"
              eyebrow="Create your commute"
              title="Tell Jatriya where and when you travel."
              visual={
                <Phone label="Setting up a commute in the Jatriya app">
                  <SetupScreen />
                </Phone>
              }
            >
              <p className="j-lead">
                Add your home and workplace, the days you go to the office and the
                times you leave and return. You do this once — Jatriya remembers it.
              </p>
              <ul className="j-checks">
                <li>
                  <Building2 size={18} strokeWidth={sw} aria-hidden /> Home and workplace locations
                </li>
                <li>
                  <Clock size={18} strokeWidth={sw} aria-hidden /> Working days and travel times
                </li>
                <li>
                  <Car size={18} strokeWidth={sw} aria-hidden /> Carpool, bike-pool, or either
                </li>
                <li>
                  <Venus size={18} strokeWidth={sw} aria-hidden /> Female-only matching, if you want it
                </li>
              </ul>
            </Station>

            <Station
              n="02"
              eyebrow="Route and schedule matching"
              title="Matched on route, time and trust."
              flip
              visual={<MatchCriteria />}
            >
              <p className="j-lead">
                Jatriya looks for commuters whose routes overlap with yours, whose
                departure times line up, and who are verified. Your preferences —
                like female-only matching — are respected in every result.
              </p>
              <p className="station-note">
                You always choose who to ride with. Matches are suggestions, never
                automatic bookings.
              </p>
            </Station>

            <Station n="03" eyebrow="Carpool and bike-pool" title="Two ways to share the road." visual={<Modes />}>
              <p className="j-lead">
                Whether a commuter drives a car or rides a motorbike, the idea is the
                same: an empty seat on a trip that is already happening.
              </p>
            </Station>

            <Station
              n="04"
              eyebrow="Connect and communicate"
              title="Request a seat, then plan together."
              flip
              visual={
                <Phone label="Chat between two matched commuters">
                  <ChatScreen />
                </Phone>
              }
            >
              <p className="j-lead">
                Send a seat request to the owner. Once they accept, you can chat in
                the app to agree on pickup points and timings — no need to swap
                personal numbers first.
              </p>
              <ul className="j-checks">
                <li>
                  <MessageCircle size={18} strokeWidth={sw} aria-hidden /> In-app messages with matched commuters
                </li>
                <li>
                  <Check size={18} strokeWidth={sw} aria-hidden /> See the status of every request at a glance
                </li>
              </ul>
            </Station>

            <Station n="05" eyebrow="Recurring journeys" title="Weekly or monthly, on repeat." visual={<MonthPlan />}>
              <p className="j-lead">
                Instead of searching for a ride every morning, arrange a recurring
                commute with the same people for a week or a month. Everyone knows
                the plan, and mornings get simpler.
              </p>
            </Station>

            <Station
              n="06"
              eyebrow="Sharing the cost"
              title="Costs split fairly, paid in the app."
              flip
              visual={<CostFormula />}
            >
              <p className="j-lead">
                Jatriya is cost-sharing, not a taxi fare. The cost of the trip is
                split between the people travelling and paid through the app — no
                cash, and no bargaining at the kerb.
              </p>
            </Station>
          </Journey>
        </div>
      </section>

      <CtaBand
        title="Ready to plan your first shared commute?"
        lead="Set up your route once. Jatriya will show you who is already going your way."
        actions={
          <>
            <ButtonLink to="/register" size="lg" arrow>
              Get started with Jatriya
            </ButtonLink>
            <ButtonLink to="/safety" size="lg" variant="secondary">
              How we keep you safe
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
