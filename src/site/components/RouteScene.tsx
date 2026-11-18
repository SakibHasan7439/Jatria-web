/*
 * The Jatriya route signature: two commuters set out separately, their
 * paths converge, and they travel the rest of the way as one shared route —
 * the same story the shared-J symbol tells. Animation (draw → merge →
 * destination pulse) is driven by CSS on the `.is-in` / `.is-live` state.
 */

type Tone = "teal" | "navy";

const STREETS_MAJOR = [
  "M-20 210 C 120 190 260 230 620 180",
  "M-20 420 C 160 400 320 450 620 390",
  "M150 -20 C 170 160 120 380 160 660",
  "M420 -20 C 400 200 450 420 410 660",
];
const STREETS_MINOR = [
  "M-20 90 C 200 110 380 70 620 100",
  "M-20 310 C 180 300 420 330 620 300",
  "M-20 540 C 200 520 400 560 620 530",
  "M60 -20 C 70 220 40 420 70 660",
  "M290 -20 C 300 220 270 420 300 660",
  "M530 -20 C 520 200 560 460 540 660",
];

// Route geometry (viewBox 600 × 640).
const A_START = { x: 96, y: 150 };
const B_START = { x: 300, y: 70 };
const MERGE = { x: 206, y: 270 };
const DEST = { x: 150, y: 490 };
const ROUTE_A = `M${A_START.x} ${A_START.y} C 104 210, 150 250, ${MERGE.x} ${MERGE.y}`;
const ROUTE_B = `M${B_START.x} ${B_START.y} C 304 150, 270 230, ${MERGE.x} ${MERGE.y}`;
const SHARED = `M${MERGE.x} ${MERGE.y} C 250 320, 258 380, 214 424 S 156 468, ${DEST.x} ${DEST.y}`;

function Tag({
  x,
  y,
  title,
  sub,
  anchor = "start",
  tone,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  anchor?: "start" | "end";
  tone: Tone;
}) {
  const w = Math.max(title.length, sub.length) * 6.7 + 24;
  const left = anchor === "start" ? x : x - w;
  return (
    <g className="rs-tag" transform={`translate(${left} ${y - 22})`}>
      <rect width={w} height="44" rx="8" fill={tone === "teal" ? "#FFFFFF" : "#13222C"} />
      <text x="12" y="19" className="rs-tag-title" fill={tone === "teal" ? "#0B1720" : "#F4F7F8"}>
        {title}
      </text>
      <text x="12" y="34" className="rs-tag-sub" fill={tone === "teal" ? "#566971" : "#A3B4BB"}>
        {sub}
      </text>
    </g>
  );
}

export function RouteScene({
  tone = "teal",
  labels = true,
  className = "",
}: {
  tone?: Tone;
  labels?: boolean;
  className?: string;
}) {
  const road = tone === "teal" ? "rgba(255,255,255,0.11)" : "rgba(163,180,187,0.13)";
  const lane = tone === "teal" ? "rgba(255,255,255,0.06)" : "rgba(163,180,187,0.07)";
  const water = tone === "teal" ? "#066A75" : "#13222C";
  const lineA = tone === "teal" ? "#FFFFFF" : "#F4F7F8";
  return (
    <svg
      className={`rs rs-${tone} ${className}`}
      viewBox="0 0 600 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="rs-city">
        <path d="M360 470 C 400 450 470 470 480 520 C 486 560 430 590 390 570 C 350 552 330 500 360 470 Z" fill={water} />
        <path d="M-10 600 C 80 580 180 610 260 660 L -10 660 Z" fill={water} />
        {STREETS_MINOR.map((d) => (
          <path key={d} d={d} stroke={lane} strokeWidth="3" fill="none" />
        ))}
        {STREETS_MAJOR.map((d) => (
          <path key={d} d={d} stroke={road} strokeWidth="9" fill="none" />
        ))}
      </g>

      {/* Two commuters, two starting points */}
      <path className="rs-path rs-a" d={ROUTE_A} pathLength={1} stroke={lineA} />
      <path className="rs-path rs-b" d={ROUTE_B} pathLength={1} stroke="#25C6B2" />
      {/* One shared route: the mint rider travels inside the route, like the small j */}
      <path className="rs-path rs-shared-road" d={SHARED} pathLength={1} stroke={lineA} />
      <path className="rs-path rs-shared-rider" d={SHARED} pathLength={1} stroke="#25C6B2" />

      <g className="rs-pin rs-pin-a">
        <circle cx={A_START.x} cy={A_START.y} r="9" fill={tone === "teal" ? "#087F8C" : "#0B1720"} stroke={lineA} strokeWidth="3.5" />
      </g>
      <g className="rs-pin rs-pin-b">
        <circle cx={B_START.x} cy={B_START.y} r="9" fill={tone === "teal" ? "#087F8C" : "#0B1720"} stroke="#25C6B2" strokeWidth="3.5" />
      </g>
      <g className="rs-pin rs-pin-merge">
        <circle cx={MERGE.x} cy={MERGE.y} r="6" fill="#25C6B2" />
      </g>
      <g className="rs-pin rs-pin-dest">
        <circle className="rs-pulse" cx={DEST.x} cy={DEST.y} r="12" fill="none" stroke="#25C6B2" strokeWidth="2" />
        <circle cx={DEST.x} cy={DEST.y} r="11" fill={lineA} />
        <circle cx={DEST.x} cy={DEST.y} r="5" fill="#25C6B2" />
      </g>

      {labels && (
        <g className="rs-labels">
          <g className="rs-label rs-label-a">
            <Tag tone={tone} x={A_START.x + 18} y={A_START.y} title="Uttara Sector 11" sub="Tanvir · leaves 8:05" />
          </g>
          <g className="rs-label rs-label-b">
            <Tag tone={tone} anchor="end" x={B_START.x - 18} y={B_START.y} title="Uttara Sector 7" sub="Nadia · pickup 8:15" />
          </g>
          <g className="rs-label rs-label-dest">
            <Tag tone={tone} x={DEST.x + 22} y={DEST.y} title="Gulshan 1" sub="Together · about 9:00" />
          </g>
        </g>
      )}
    </svg>
  );
}
