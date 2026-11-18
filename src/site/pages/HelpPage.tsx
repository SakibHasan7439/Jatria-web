import { useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { LifeBuoy, PhoneCall, Search, X } from "lucide-react";
import { FaqAccordion, type Faq } from "../components/FaqAccordion";
import { Reveal } from "../components/Reveal";

type Group = { id: string; title: string; items: Faq[] };

const groups: Group[] = [
  {
    id: "about",
    title: "About Jatriya",
    items: [
      {
        q: "What is Jatriya?",
        text: "planned recurring carpooling bike-pooling office commuters dhaka verified same route same time",
        a: (
          <p>
            Jatriya is a planned, recurring carpooling and bike-pooling platform for
            office commuters in Dhaka. It connects verified commuters who travel the
            same route at the same time, so the cars and bikes already on the road
            carry more people.
          </p>
        ),
      },
      {
        q: "How is Jatriya different from ride-hailing?",
        text: "ride-hailing taxi on-demand difference cost sharing owner already making trip",
        a: (
          <>
            <p>
              Ride-hailing apps send a driver to you on demand, for a fare. Jatriya
              is different in three ways:
            </p>
            <ul>
              <li>It is planned — you set your commute once and ride on repeat.</li>
              <li>You share a trip the owner is already making to the same area.</li>
              <li>Costs are shared between commuters, rather than paid as a taxi fare.</li>
            </ul>
          </>
        ),
      },
      {
        q: "Who can join?",
        text: "who can join office commuters verified identity workplace",
        a: (
          <p>
            Jatriya is built for office commuters. Members confirm their identity and
            workplace when they join. Vehicle owners also add their driving licence
            and vehicle details.
          </p>
        ),
      },
      {
        q: "Do I need a car or a bike to use Jatriya?",
        text: "need car bike passenger rider without vehicle",
        a: (
          <p>
            No. You can join as a commuter looking for a seat, or as a car or bike
            owner offering seats on the route you already travel.
          </p>
        ),
      },
    ],
  },
  {
    id: "rides",
    title: "Matching and rides",
    items: [
      {
        q: "How does route matching work?",
        text: "route matching home workplace times overlap preferences carpool bike-pool",
        a: (
          <p>
            You add your home, workplace and the times you travel. Jatriya looks for
            commuters whose routes overlap with yours and whose departure times line
            up, and respects your preferences such as carpool, bike-pool or
            female-only matching. You always choose who you ride with.
          </p>
        ),
      },
      {
        q: "What is recurring carpooling?",
        text: "recurring weekly monthly same people same time",
        a: (
          <p>
            Instead of finding a ride every day, you arrange to ride with the same
            people on the same days and times for a week or a month. Everyone knows
            the plan in advance.
          </p>
        ),
      },
      {
        q: "What is the difference between carpool and bike-pool?",
        text: "carpool bike-pool difference seats pillion motorbike car",
        a: (
          <p>
            In a carpool, a car owner shares one to three empty seats. In a
            bike-pool, a motorbike owner offers a single pillion seat. Both work the
            same way: a seat on a trip that is already happening.
          </p>
        ),
      },
      {
        q: "How do I communicate with the people I ride with?",
        text: "chat message communicate pickup",
        a: (
          <p>
            After a seat request is accepted, you can message each other in the app
            to agree on pickup points and timings.
          </p>
        ),
      },
    ],
  },
  {
    id: "costs",
    title: "Costs and payment",
    items: [
      {
        q: "How does cost sharing work?",
        text: "cost sharing split equally paid in app cash bargaining price",
        a: (
          <p>
            The cost of a trip is split between the people travelling and paid
            through the app, so there is no cash and no bargaining. You see your
            share before you request a seat.
          </p>
        ),
      },
      {
        q: "Can vehicle owners earn money with Jatriya?",
        text: "owners earn money income profit recover costs",
        a: (
          <p>
            Jatriya is a cost-sharing platform. Owners recover part of the cost of a
            commute they are already making; it is not designed as a source of
            guaranteed income.
          </p>
        ),
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and trust",
    items: [
      {
        q: "Can I find female-only matches?",
        text: "female-only women matching",
        a: (
          <p>
            Yes. Women can choose to be matched only with other women. Once it is
            on, it applies to your searches and recurring plans.
          </p>
        ),
      },
      {
        q: "How does commuter verification work?",
        text: "verification identity workplace verified licence vehicle",
        a: (
          <p>
            Every member is asked to confirm their identity and their workplace.
            Vehicle owners also provide their driving licence number and vehicle
            details. Verification status appears on each profile, so you can check
            it before you ride.
          </p>
        ),
      },
      {
        q: "How does live location sharing work?",
        text: "live location sharing contacts track trip",
        a: (
          <p>
            During a trip, you can share your live location with contacts you choose.
            They can follow the journey until you arrive.
          </p>
        ),
      },
      {
        q: "How do I report a problem?",
        text: "report problem trip safety team emergency 999 sos",
        a: (
          <>
            <p>
              Use “Report this trip” on the trip screen. Reports go to the Jatriya
              safety team for review.
            </p>
            <p>
              If you are in danger, use SOS in the app and call <b>999</b>,
              Bangladesh’s national emergency service.
            </p>
          </>
        ),
      },
    ],
  },
];

export function HelpPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          items: q
            ? g.items.filter((item) => `${item.q} ${item.text}`.toLowerCase().includes(q))
            : g.items,
        }))
        .filter((g) => g.items.length > 0),
    [q],
  );
  const count = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <section className="phero help-hero">
        <div className="j-container help-hero-inner">
          <p className="j-eyebrow hero-in" style={{ "--h": 0 } as CSSProperties}>
            Help and FAQs
          </p>
          <h1 className="j-h1 hero-in" style={{ "--h": 1 } as CSSProperties}>
            How can we help?
          </h1>
          <p className="j-lead hero-in" style={{ "--h": 2 } as CSSProperties}>
            Answers about matching, recurring rides, costs and safety.
          </p>
          <div className="help-search hero-in" style={{ "--h": 3 } as CSSProperties}>
            <Search size={20} strokeWidth={1.75} aria-hidden />
            <label className="sr-only" htmlFor="faq-search">
              Search questions
            </label>
            <input
              id="faq-search"
              type="search"
              placeholder="Search questions, e.g. “female-only”"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={18} strokeWidth={1.75} />
              </button>
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {q ? `${count} matching questions` : ""}
          </p>
        </div>
      </section>

      <section className="section help-body" aria-label="Frequently asked questions">
        <div className="j-container help-grid">
          <nav className="help-nav" aria-label="FAQ topics">
            <p className="j-label">Topics</p>
            <ul>
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="help-groups">
            {filtered.length === 0 && (
              <div className="help-empty">
                <p>
                  No questions match “{query}”. Try a different word, or browse the
                  topics.
                </p>
              </div>
            )}
            {filtered.map((g) => (
              <Reveal key={g.id} className="help-group" variant="fade">
                <h2 className="j-h3" id={g.id}>
                  {g.title}
                </h2>
                <FaqAccordion items={g.items} />
              </Reveal>
            ))}

            <div className="help-more">
              <div className="help-more-item">
                <LifeBuoy size={22} strokeWidth={1.75} aria-hidden />
                <span>
                  <b>Still need help?</b>
                  <p>
                    Direct support contact details will be published here ahead of
                    launch. Members can message the people they ride with in the app,
                    and report a trip from the trip screen.
                  </p>
                </span>
              </div>
              <div className="help-more-item">
                <PhoneCall size={22} strokeWidth={1.75} aria-hidden />
                <span>
                  <b>In an emergency</b>
                  <p>
                    Call <b>999</b>. Read more about{" "}
                    <Link to="/safety">safety on Jatriya</Link>.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
