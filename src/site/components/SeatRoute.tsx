import type { CSSProperties } from "react";
import { Armchair, Car } from "lucide-react";
import { InView } from "./Reveal";

/*
 * An owner's existing route with seats being filled at stops along it.
 * Draws once on view; stops and seats appear in route order.
 */
export function SeatRoute() {
  const stops = [
    { x: 40, label: "Mirpur 10", sub: "You · 8:00" },
    { x: 200, label: "Mirpur 2", sub: "Imran · 8:10" },
    { x: 360, label: "Shewrapara", sub: "Rumana · 8:20" },
    { x: 560, label: "Motijheel", sub: "About 9:05" },
  ];
  return (
    <InView className="seatroute" aria-hidden="true">
      <div className="seatroute-card">
        <div className="seatroute-head">
          <span className="seatroute-car">
            <Car size={20} strokeWidth={1.75} />
          </span>
          <span>
            <small className="j-label">Your daily route</small>
            <b>Mirpur 10 → Motijheel</b>
          </span>
          <span className="j-tag">Sun–Thu</span>
        </div>
        <svg className="seatroute-svg" viewBox="0 0 600 120" preserveAspectRatio="none">
          <path className="seatroute-base" d="M40 60 C 100 24, 140 24, 200 60 S 300 96, 360 60 S 500 24, 560 60" />
          <path className="seatroute-line" d="M40 60 C 100 24, 140 24, 200 60 S 300 96, 360 60 S 500 24, 560 60" pathLength={1} />
        </svg>
        <ol className="seatroute-stops">
          {stops.map((stop, i) => (
            <li key={stop.label} style={{ left: `${(stop.x / 600) * 100}%`, "--i": i } as CSSProperties}>
              <i className={i === 0 ? "is-origin" : i === stops.length - 1 ? "is-dest" : undefined} />
              <b>{stop.label}</b>
              <small>{stop.sub}</small>
            </li>
          ))}
        </ol>
        <div className="seatroute-seats">
          <span className="is-filled">
            <Armchair size={18} strokeWidth={1.75} /> Imran H.
          </span>
          <span className="is-filled">
            <Armchair size={18} strokeWidth={1.75} /> Rumana B.
          </span>
          <span>
            <Armchair size={18} strokeWidth={1.75} /> Seat open
          </span>
        </div>
        <div className="seatroute-foot">
          <span>Cost per seat, per trip</span>
          <b>BDT 110</b>
          <small>Illustrative — shared costs, not fares</small>
        </div>
      </div>
    </InView>
  );
}
