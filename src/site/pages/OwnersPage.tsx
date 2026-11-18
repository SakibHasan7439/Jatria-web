import type { CSSProperties } from "react";
import { BadgeCheck, Car, Star, CarFront, IdCard, Leaf, Phone as PhoneIcon, Repeat, Route, Wallet } from "lucide-react";
import { PageHero, SectionIntro } from "../components/Section";
import { ButtonLink } from "../components/Button";
import { Reveal, InView } from "../components/Reveal";
import { SeatRoute } from "../components/SeatRoute";
import { Phone, RequestsScreen } from "../components/AppScreens";
import { CtaBand } from "../components/CtaBand";

const sw = 1.75;

const reasons = [
  {
    Icon: Route,
    title: "You’re making the trip anyway",
    text: "Nothing about your route changes. Commuters who travel your way join you along it.",
  },
  {
    Icon: Wallet,
    title: "Recover part of your costs",
    text: "Riders share the cost of the journey, which helps with fuel and running costs.",
  },
  {
    Icon: Leaf,
    title: "Fewer cars on Dhaka’s roads",
    text: "Every filled seat is one less vehicle making the same trip at the same time.",
  },
];

const steps = [
  { title: "Add your route", text: "Your home, workplace, days and departure time." },
  { title: "Set your seats", text: "Cars can offer one to three seats; bikes offer one pillion seat." },
  { title: "Review requests", text: "See verified commuters who want to join — and where they’ll be picked up." },
  { title: "Accept and ride", text: "Agree on details in chat, then ride together on repeat." },
];

export function OwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For car and bike owners"
        title="Your empty seats can make someone’s commute better."
        lead="Share the route you already drive with verified office commuters going the same way. You keep control of your route, your seats and who rides with you."
        actions={
          <>
            <ButtonLink to="/register?role=driver" size="lg" arrow>
              Share your ride
            </ButtonLink>
            <ButtonLink to="/how-it-works" size="lg" variant="secondary">
              How it works
            </ButtonLink>
          </>
        }
        visual={<SeatRoute />}
      />

      <section className="section reasons-section" aria-labelledby="why-title">
        <div className="j-container">
          <SectionIntro
            id="why-title"
            eyebrow="Why share"
            title="A seat that would travel empty, put to good use."
          />
          <div className="reasons">
            {reasons.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i} className="reason">
                <Icon size={26} strokeWidth={sw} aria-hidden />
                <h3 className="j-h3">{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section owner-flow" aria-labelledby="flow-title">
        <div className="j-container split-feature">
          <div>
            <SectionIntro
              id="flow-title"
              eyebrow="Finding commuters"
              title="Commuters on your route come to you."
              lead="Jatriya shows your route to verified commuters whose journey overlaps with it. You decide who joins."
            />
            <InView as="ol" className="numbered">
              {steps.map((step, i) => (
                <li key={step.title} style={{ "--i": i } as CSSProperties}>
                  <span className="numbered-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <b>{step.title}</b>
                    <p>{step.text}</p>
                  </span>
                </li>
              ))}
            </InView>
          </div>
          <Reveal className="split-feature-visual" variant="fade">
            <Phone label="Seat requests from verified commuters">
              <RequestsScreen />
            </Phone>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="terms-title">
        <div className="j-container">
          <h2 className="sr-only" id="terms-title">
            Recurring journeys and costs
          </h2>
          <div className="pair">
            <Reveal className="pair-item">
              <Repeat size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Recurring journeys</h3>
              <p>
                Agree a weekly or monthly arrangement with the same commuters. Your
                seats are planned ahead, so there is no daily searching or waiting.
              </p>
            </Reveal>
            <Reveal className="pair-item" delay={1}>
              <Wallet size={24} strokeWidth={sw} aria-hidden />
              <h3 className="j-h3">Costs, shared openly</h3>
              <p>
                Riders share the cost of the trip and pay in the app. Jatriya is a
                cost-sharing platform — not a taxi service — so it is about recovering
                commuting costs, not guaranteed earnings.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section verify-section" aria-labelledby="verify-title">
        <div className="j-container">
          <SectionIntro
            id="verify-title"
            align="center"
            eyebrow="Verification"
            title="Trust runs both ways."
            lead="Owners and riders both verify who they are, so everyone knows who is sharing the journey."
          />
          <div className="verify-cols">
            <Reveal className="verify-col">
              <span className="verify-col-head">
                <CarFront size={22} strokeWidth={sw} aria-hidden /> What owners provide
              </span>
              <ul className="j-checks">
                <li>
                  <IdCard size={18} strokeWidth={sw} aria-hidden /> Driving licence number
                </li>
                <li>
                  <Car size={18} strokeWidth={sw} aria-hidden /> Vehicle make, model and colour
                </li>
                <li>
                  <BadgeCheck size={18} strokeWidth={sw} aria-hidden /> Number plate
                </li>
                <li>
                  <PhoneIcon size={18} strokeWidth={sw} aria-hidden /> A phone number
                </li>
              </ul>
            </Reveal>
            <Reveal className="verify-col" delay={1}>
              <span className="verify-col-head">
                <BadgeCheck size={22} strokeWidth={sw} aria-hidden /> What you see about riders
              </span>
              <ul className="j-checks">
                <li>
                  <BadgeCheck size={18} strokeWidth={sw} aria-hidden /> Identity and workplace verification
                </li>
                <li>
                  <Route size={18} strokeWidth={sw} aria-hidden /> Their pickup point on your route
                </li>
                <li>
                  <Repeat size={18} strokeWidth={sw} aria-hidden /> Whether they want weekly or monthly rides
                </li>
                <li>
                  <Star size={18} strokeWidth={sw} aria-hidden /> Ratings from previous trips
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Turn your daily drive into a shared commute."
        lead="Create an owner account with your licence and vehicle details. It takes a few minutes."
        actions={
          <>
            <ButtonLink to="/register?role=driver" size="lg" arrow>
              Share your ride
            </ButtonLink>
            <ButtonLink to="/help" size="lg" variant="secondary">
              Owner questions
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
