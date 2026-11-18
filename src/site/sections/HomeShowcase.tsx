import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import {
  CommuteScreen,
  FindRideScreen,
  LiveTripScreen,
  Phone,
  ProfileScreen,
  RideDetailsScreen,
} from "../components/AppScreens";

const screens = [
  {
    id: "commute",
    tab: "Your commute",
    title: "Your week at a glance",
    text: "Your saved route, the days you travel, and the next confirmed ride — the first thing you see each morning.",
    Screen: CommuteScreen,
  },
  {
    id: "find",
    tab: "Find a ride",
    title: "Search by route and time",
    text: "Filter by carpool, bike-pool or female-only, and compare commuters who already travel your way.",
    Screen: FindRideScreen,
  },
  {
    id: "profile",
    tab: "Commuter profile",
    title: "Know who you’re riding with",
    text: "Verification badges, ratings, reviews and vehicle details — before you ever request a seat.",
    Screen: ProfileScreen,
  },
  {
    id: "details",
    tab: "Ride details",
    title: "Every detail, agreed upfront",
    text: "Pickup point and time, seats left, vehicle and your share of the cost — clear before you commit.",
    Screen: RideDetailsScreen,
  },
  {
    id: "live",
    tab: "Live trip",
    title: "Safety on every journey",
    text: "Share your live location with chosen contacts and reach SOS with a single press-and-hold.",
    Screen: LiveTripScreen,
  },
];

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | null = null;
    if (event.key in keys) next = (active + keys[event.key] + screens.length) % screens.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = screens.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="section showcase" aria-labelledby="showcase-title">
      <div className="j-container">
        <SectionIntro
          id="showcase-title"
          align="split"
          eyebrow="The product"
          title="See how a shared commute actually works."
          lead="Representative screens from the Jatriya app. Everything you need to plan, verify and ride sits in one calm interface."
        />
        <Reveal className="showcase-grid">
          <div
            className="showcase-tabs"
            role="tablist"
            aria-label="App screens"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            style={{ "--active": active } as CSSProperties}
          >
            <span className="showcase-indicator" aria-hidden="true" />
            {screens.map((screen, i) => (
              <button
                key={screen.id}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${screen.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${screen.id}`}
                tabIndex={active === i ? 0 : -1}
                className={`showcase-tab${active === i ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="showcase-tab-label">{screen.tab}</span>
                <span className="showcase-tab-title">{screen.title}</span>
                <span className="showcase-tab-text">{screen.text}</span>
              </button>
            ))}
          </div>

          <div className="showcase-stage">
            <div className="showcase-backdrop" aria-hidden="true" />
            {screens.map(({ id, tab, Screen }, i) => (
              <div
                key={id}
                id={`panel-${id}`}
                role="tabpanel"
                aria-labelledby={`tab-${id}`}
                className={`showcase-panel${active === i ? " is-active" : ""}${i < active ? " is-before" : ""}`}
                inert={active !== i}
              >
                <Phone label={`${tab} screen`}>
                  <Screen />
                </Phone>
              </div>
            ))}
            <p className="showcase-caption" aria-live="polite">
              {screens[active].text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
