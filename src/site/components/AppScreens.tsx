import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  CalendarDays,
  Car,
  ChevronLeft,
  Home,
  MapPin,
  MessageCircle,
  Phone as PhoneIcon,
  Repeat,
  Search,
  Send,
  Share2,
  ShieldCheck,
  User,
  Venus,
  Flag,
  Building2,
  Clock,
} from "lucide-react";

/*
 * Representative, frontend-only renderings of the Jatriya app, drawn to the
 * brand guideline mockups (§09, §12, §13). Names and values are illustrative.
 * All sizes are in `em`; the phone frame scales the base size with its width.
 */

const sw = 1.75;

export function Phone({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`ph ${className}`} role="img" aria-label={label}>
      <div className="ph-screen" aria-hidden="true">
        <StatusBar />
        {children}
      </div>
    </figure>
  );
}

function StatusBar() {
  return (
    <div className="ph-status">
      <span>9:41</span>
      <span className="ph-island" />
      <span className="ph-sys">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function Avatar({
  initials,
  tone = "teal",
  size = "md",
}: {
  initials: string;
  tone?: "teal" | "mint" | "navy" | "sand";
  size?: "sm" | "md" | "lg";
}) {
  return <span className={`av av-${tone} av-${size}`}>{initials}</span>;
}

function TabBar({ active }: { active: "home" | "search" | "rides" | "chat" | "profile" }) {
  const tabs = [
    { id: "home", label: "Home", Icon: Home },
    { id: "search", label: "Search", Icon: Search },
    { id: "rides", label: "Rides", Icon: Car },
    { id: "chat", label: "Chat", Icon: MessageCircle },
    { id: "profile", label: "Profile", Icon: User },
  ] as const;
  return (
    <div className="ph-tabs">
      {tabs.map(({ id, label, Icon }) => (
        <span key={id} className={id === active ? "is-on" : undefined}>
          <Icon strokeWidth={sw} />
          {label}
        </span>
      ))}
    </div>
  );
}

function Verified({ text = "ID and workplace verified" }: { text?: string }) {
  return (
    <span className="ph-verified">
      <BadgeCheck strokeWidth={sw} />
      {text}
    </span>
  );
}

/* ---------------------------------------------------------------- Home */
export function CommuteScreen() {
  return (
    <div className="ph-body">
      <div className="ph-greet">
        <small>Good morning</small>
        <b>Nadia Rahman</b>
      </div>
      <div className="ph-card ph-commute">
        <div className="ph-row ph-between">
          <span className="ph-label">Your commute</span>
          <span className="ph-chip">Sun–Thu</span>
        </div>
        <div className="ph-route">
          Uttara <ArrowRight strokeWidth={sw} /> Gulshan 1
        </div>
        <small className="ph-muted">Leaves 8:15 AM · back 6:00 PM</small>
        <span className="ph-btn">Find matches</span>
      </div>
      <div className="ph-grid">
        <span className="ph-tile">
          <Car strokeWidth={sw} />
          <b>Carpool</b>
          <small>Share a car</small>
        </span>
        <span className="ph-tile">
          <Bike strokeWidth={sw} />
          <b>Bike-pool</b>
          <small>Share a bike</small>
        </span>
        <span className="ph-tile">
          <Repeat strokeWidth={sw} />
          <b>Recurring</b>
          <small>Weekly or monthly</small>
        </span>
        <span className="ph-tile">
          <Venus strokeWidth={sw} />
          <b>Female-only</b>
          <small>Women matched with women</small>
        </span>
      </div>
      <div className="ph-card ph-next">
        <div className="ph-row ph-between">
          <span className="ph-label">Next ride</span>
          <span className="ph-status-chip">Confirmed</span>
        </div>
        <div className="ph-row">
          <Avatar initials="TA" />
          <span className="ph-stack">
            <b>Tanvir Ahmed</b>
            <small className="ph-muted">Tomorrow · 8:15 AM · Carpool</small>
          </span>
        </div>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* -------------------------------------------------------------- Search */
const matches = [
  { i: "TA", name: "Tanvir Ahmed", time: "8:10 AM", price: 90, tags: ["Carpool", "Recurring"], tone: "teal" as const },
  { i: "SK", name: "Sadia Karim", time: "8:20 AM", price: 95, tags: ["Carpool", "Female-only"], tone: "mint" as const },
  { i: "FH", name: "Farhan Hossain", time: "8:05 AM", price: 90, tags: ["Bike-pool"], tone: "navy" as const },
];

export function FindRideScreen() {
  return (
    <div className="ph-body">
      <div className="ph-title">Find a ride</div>
      <div className="ph-card ph-search">
        <span className="ph-field">
          <i className="ph-dot ph-dot-hollow" /> Uttara Sector 7
        </span>
        <span className="ph-field">
          <i className="ph-dot" /> Gulshan 1
        </span>
        <div className="ph-row ph-gap">
          <span className="ph-chip">Sun–Thu</span>
          <span className="ph-chip">8:15 AM</span>
        </div>
      </div>
      <div className="ph-filters">
        <span className="is-on">All</span>
        <span>Carpool</span>
        <span>Bike-pool</span>
        <span>Female-only</span>
      </div>
      <div className="ph-count">3 commuters share this route</div>
      <div className="ph-list">
        {matches.map((m) => (
          <div className="ph-card ph-match" key={m.i}>
            <Avatar initials={m.i} tone={m.tone} />
            <span className="ph-stack">
              <b>{m.name}</b>
              <small className="ph-muted">Leaves Uttara {m.time}</small>
              <span className="ph-row ph-gap">
                {m.tags.map((t) => (
                  <span className="ph-tag" key={t}>
                    {t}
                  </span>
                ))}
              </span>
            </span>
            <span className="ph-price">
              <b>BDT {m.price}</b>
              <small className="ph-muted">per trip</small>
            </span>
          </div>
        ))}
      </div>
      <TabBar active="search" />
    </div>
  );
}

/* ------------------------------------------------------------- Profile */
export function ProfileScreen() {
  return (
    <div className="ph-body">
      <div className="ph-top">
        <ChevronLeft strokeWidth={sw} />
        <span>Profile</span>
        <span />
      </div>
      <div className="ph-profile">
        <Avatar initials="TA" size="lg" />
        <b>Tanvir Ahmed</b>
        <small className="ph-muted">Driver · Car owner</small>
        <div className="ph-row ph-gap ph-center">
          <span className="ph-badge">
            <BadgeCheck strokeWidth={sw} /> ID verified
          </span>
          <span className="ph-badge">
            <Building2 strokeWidth={sw} /> Workplace verified
          </span>
        </div>
      </div>
      <div className="ph-stats">
        <span>
          <b>4.9</b>
          <small>Rating</small>
        </span>
        <span>
          <b>126</b>
          <small>Shared trips</small>
        </span>
        <span>
          <b>2025</b>
          <small>Member since</small>
        </span>
      </div>
      <div className="ph-card">
        <span className="ph-label">Vehicle</span>
        <div className="ph-row ph-between">
          <b className="ph-strong">Sedan · 3 shared seats</b>
          <Car strokeWidth={sw} className="ph-ico" />
        </div>
        <small className="ph-ok">
          <ShieldCheck strokeWidth={sw} /> Registration verified
        </small>
      </div>
      <div className="ph-card">
        <span className="ph-label">Reviews</span>
        <div className="ph-review">
          <Avatar initials="NR" tone="mint" size="sm" />
          <span className="ph-stack">
            <b>Nadia Rahman</b>
            <small className="ph-muted">Always on time and a calm driver.</small>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Maps */
export function MiniMap({ live = false }: { live?: boolean }) {
  return (
    <svg className="ph-map" viewBox="0 0 300 340" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="340" fill="#E8EEF0" />
      <path d="M232 150 q 34 10 44 46 q -34 24 -62 -6 z" fill="#C2E7EA" />
      <rect x="96" y="182" width="52" height="34" rx="4" fill="#D3F7F1" />
      <rect x="196" y="40" width="40" height="28" rx="4" fill="#D3F7F1" />
      <g stroke="#fff" fill="none">
        <path d="M-10 110 C 80 96 170 140 310 118" strokeWidth="9" />
        <path d="M-10 250 C 90 238 200 268 310 248" strokeWidth="7" />
        <path d="M44 -10 C 64 120 50 220 72 350" strokeWidth="7" />
        <path d="M182 -10 C 172 120 204 220 192 350" strokeWidth="7" />
        <path d="M-10 40 C 100 54 200 30 310 46" strokeWidth="4" />
        <path d="M-10 180 C 100 172 200 190 310 176" strokeWidth="4" />
        <path d="M-10 312 C 100 300 200 320 310 306" strokeWidth="4" />
        <path d="M120 -10 C 126 120 116 220 128 350" strokeWidth="4" />
        <path d="M252 -10 C 246 120 262 220 250 350" strokeWidth="4" />
      </g>
      <path
        d="M62 66 C 70 120 112 128 140 160 S 196 228 226 282"
        stroke="#087F8C"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="62" cy="66" r="7" fill="#fff" stroke="#087F8C" strokeWidth="3" />
      <circle cx="226" cy="282" r="8" fill="#087F8C" stroke="#fff" strokeWidth="3" />
      {live && (
        <>
          <circle cx="152" cy="174" r="14" fill="#25C6B2" opacity="0.25" />
          <circle cx="152" cy="174" r="7" fill="#25C6B2" stroke="#0B1720" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}

/* --------------------------------------------------------- Ride detail */
export function RideDetailsScreen() {
  return (
    <div className="ph-body ph-flush">
      <div className="ph-map-wrap">
        <MiniMap />
      </div>
      <div className="ph-sheet">
        <div className="ph-row">
          <Avatar initials="TA" />
          <span className="ph-stack">
            <b>Tanvir Ahmed</b>
            <small className="ph-muted">4.9 · ID and workplace verified</small>
          </span>
        </div>
        <div className="ph-stops">
          <span>
            <i className="ph-dot ph-dot-hollow" />
            <b>Uttara Sector 7</b>
            <small className="ph-muted">Pickup 8:15 AM</small>
          </span>
          <span>
            <i className="ph-dot" />
            <b>Gulshan 1</b>
            <small className="ph-muted">Drop-off about 9:00 AM</small>
          </span>
        </div>
        <div className="ph-facts">
          <span>1 of 3 seats available</span>
          <span>Sedan · air-conditioned</span>
        </div>
        <div className="ph-row ph-between ph-cost">
          <span className="ph-stack">
            <b>BDT 90 per trip</b>
            <small className="ph-muted">Cost shared equally · paid in the app</small>
          </span>
        </div>
        <span className="ph-btn">Request seat</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Live trip */
export function LiveTripScreen() {
  return (
    <div className="ph-body ph-flush">
      <div className="ph-share-bar">
        <i /> Sharing live location with 2 contacts
      </div>
      <div className="ph-map-wrap ph-map-tall">
        <MiniMap live />
      </div>
      <div className="ph-sheet">
        <div className="ph-row ph-between">
          <span className="ph-stack">
            <small className="ph-muted">Arriving at Gulshan 1</small>
            <b className="ph-eta">12 min</b>
          </span>
          <span className="ph-sos">SOS</span>
        </div>
        <div className="ph-row">
          <Avatar initials="TA" />
          <span className="ph-stack">
            <b>Tanvir Ahmed</b>
            <small className="ph-muted">Sedan · with 2 commuters</small>
          </span>
        </div>
        <span className="ph-btn ph-btn-quiet">
          <Share2 strokeWidth={sw} /> Share trip
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Commute setup */
export function SetupScreen() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const on = [true, true, true, true, true, false, false];
  return (
    <div className="ph-body">
      <div className="ph-top">
        <ChevronLeft strokeWidth={sw} />
        <span>Your commute</span>
        <span />
      </div>
      <div className="ph-card ph-search">
        <span className="ph-field">
          <Home strokeWidth={sw} /> Uttara Sector 7
        </span>
        <span className="ph-field">
          <Building2 strokeWidth={sw} /> Gulshan 1
        </span>
      </div>
      <div className="ph-card">
        <span className="ph-label">Days</span>
        <div className="ph-days">
          {days.map((d, i) => (
            <span key={i} className={on[i] ? "is-on" : undefined}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="ph-two">
        <div className="ph-card">
          <span className="ph-label">Leave</span>
          <b className="ph-strong">8:15 AM</b>
        </div>
        <div className="ph-card">
          <span className="ph-label">Return</span>
          <b className="ph-strong">6:00 PM</b>
        </div>
      </div>
      <div className="ph-card">
        <span className="ph-label">Ride type</span>
        <div className="ph-seg">
          <span className="is-on">
            <Car strokeWidth={sw} /> Carpool
          </span>
          <span>
            <Bike strokeWidth={sw} /> Bike-pool
          </span>
        </div>
        <div className="ph-row ph-between ph-toggle-row">
          <small>Female-only matching</small>
          <span className="ph-switch" />
        </div>
      </div>
      <span className="ph-btn">Save commute</span>
    </div>
  );
}

/* ---------------------------------------------------------------- Chat */
export function ChatScreen() {
  return (
    <div className="ph-body ph-chat">
      <div className="ph-top ph-chat-top">
        <ChevronLeft strokeWidth={sw} />
        <span className="ph-row">
          <Avatar initials="TA" size="sm" />
          <span className="ph-stack">
            <b>Tanvir Ahmed</b>
            <small className="ph-muted">Carpool · Sun–Thu</small>
          </span>
        </span>
        <PhoneIcon strokeWidth={sw} />
      </div>
      <div className="ph-system">
        <CalendarDays strokeWidth={sw} /> Seat confirmed · Sun–Thu, 8:15 AM
      </div>
      <div className="ph-msgs">
        <span className="ph-msg them">Morning! I’ll be at the Sector 7 gate at 8:10.</span>
        <span className="ph-msg me">Perfect, I’ll be there. See you tomorrow.</span>
        <span className="ph-msg them">Sadia joins us from next week too.</span>
        <span className="ph-msg me">Great — more company on the way.</span>
      </div>
      <div className="ph-compose">
        <span>Message</span>
        <i>
          <Send strokeWidth={sw} />
        </i>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ Owner requests */
export function RequestsScreen() {
  return (
    <div className="ph-body">
      <div className="ph-title">Seat requests</div>
      <div className="ph-card ph-commute">
        <div className="ph-row ph-between">
          <span className="ph-label">Your route</span>
          <span className="ph-chip">Sun–Thu</span>
        </div>
        <div className="ph-route">
          Mirpur 10 <ArrowRight strokeWidth={sw} /> Motijheel
        </div>
        <small className="ph-muted">Leaves 8:00 AM · 3 seats</small>
        <div className="ph-seats">
          <i className="is-taken" />
          <i className="is-taken" />
          <i />
          <small>1 seat open</small>
        </div>
      </div>
      <div className="ph-card ph-request">
        <div className="ph-row">
          <Avatar initials="IH" tone="mint" />
          <span className="ph-stack">
            <b>Imran Haque</b>
            <Verified />
          </span>
        </div>
        <small className="ph-muted">
          <MapPin strokeWidth={sw} /> Pickup Mirpur 2 · 8:10 AM
        </small>
        <small className="ph-muted">
          <Repeat strokeWidth={sw} /> Monthly · Sun–Thu
        </small>
        <div className="ph-two">
          <span className="ph-btn ph-btn-quiet">Decline</span>
          <span className="ph-btn">Accept</span>
        </div>
      </div>
      <div className="ph-card ph-match">
        <Avatar initials="RB" tone="sand" />
        <span className="ph-stack">
          <b>Rumana Begum</b>
          <small className="ph-muted">
            <Clock strokeWidth={sw} /> Pickup Shewrapara · 8:20 AM
          </small>
        </span>
        <span className="ph-tag">New</span>
      </div>
      <TabBar active="rides" />
    </div>
  );
}

/* ------------------------------------------------------- Safety helper */
export function ReportRow() {
  return (
    <span className="ph-report">
      <Flag strokeWidth={sw} /> Report this trip
    </span>
  );
}
