import type { CSSProperties } from "react";
import { Building2, Home, Clock, Check } from "lucide-react";
import { InView } from "../components/Reveal";
import { SectionIntro } from "../components/Section";
import { Avatar } from "../components/AppScreens";
import { TextLink } from "../components/Button";

const sw = 1.75;

function RouteInputs() {
  return (
    <div className="vg vg-inputs" aria-hidden="true">
      <span>
        <Home size={16} strokeWidth={sw} /> Uttara Sector 7
      </span>
      <span>
        <Building2 size={16} strokeWidth={sw} /> Gulshan 1
      </span>
      <span>
        <Clock size={16} strokeWidth={sw} /> 8:15 AM – 6:00 PM
      </span>
    </div>
  );
}

function MatchStack() {
  return (
    <div className="vg vg-match" aria-hidden="true">
      <div className="vg-match-row">
        <Avatar initials="TA" />
        <span>
          <b>Tanvir Ahmed</b>
          <small>Carpool · leaves 8:10</small>
        </span>
        <em>Same route</em>
      </div>
      <div className="vg-match-row">
        <Avatar initials="SK" tone="mint" />
        <span>
          <b>Sadia Karim</b>
          <small>Carpool · leaves 8:20</small>
        </span>
        <em>Female-only</em>
      </div>
    </div>
  );
}

function Week() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="vg vg-week" aria-hidden="true">
      {days.map((d, i) => (
        <span key={d} className={i < 5 ? "is-on" : undefined}>
          <small>{d}</small>
          {i < 5 ? <Check size={14} strokeWidth={2} /> : <i />}
        </span>
      ))}
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Tell us your route",
    text: "Enter your home, workplace and the hours you travel. You only do this once.",
    visual: <RouteInputs />,
  },
  {
    n: "02",
    title: "Match with commuters",
    text: "Discover verified people travelling along similar routes and schedules.",
    visual: <MatchStack />,
  },
  {
    n: "03",
    title: "Ride on repeat",
    text: "Connect, arrange recurring rides, share costs and manage your commute in one place.",
    visual: <Week />,
  },
];

export function HomeSteps() {
  return (
    <section className="section steps-section" id="how" aria-labelledby="steps-title">
      <div className="j-container">
        <SectionIntro
          id="steps-title"
          align="split"
          eyebrow="How Jatriya works"
          title="Three steps to a shared commute."
          lead="Jatriya is planned, not on-demand. Set your commute once and ride with the same people week after week."
        >
          <TextLink to="/how-it-works">The full journey, explained</TextLink>
        </SectionIntro>

        <InView className="steps">
          <span className="steps-line" aria-hidden="true" />
          <ol className="steps-list">
          {steps.map((step, i) => (
            <li className="step" key={step.n} style={{ "--i": i } as CSSProperties}>
              <span className="step-node" aria-hidden="true" />
              <span className="step-n">{step.n}</span>
              <h3 className="j-h3">{step.title}</h3>
              <p>{step.text}</p>
              {step.visual}
            </li>
          ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
