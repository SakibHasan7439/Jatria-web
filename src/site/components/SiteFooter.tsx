import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const YEAR = new Date().getFullYear();

const columns = [
  {
    title: "Product",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/safety", label: "Safety and trust" },
      { to: "/vehicle-owners", label: "For vehicle owners" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help and FAQs" },
      { to: "/signin", label: "Log in" },
      { to: "/register", label: "Create an account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="jf">
      <div className="j-container">
        <div className="jf-top">
          <div className="jf-brand">
            <Link to="/" aria-label="Jatriya home" className="jf-logo">
              <Logo size={30} />
            </Link>
            <p className="jf-tagline">Move Together. Move Smarter.</p>
            <p className="jf-about">
              Planned, recurring carpooling and bike-pooling for office commuters
              in Dhaka.
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} className="jf-col" aria-label={column.title}>
              <h2 className="j-label">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="jf-col">
            <h2 className="j-label">Legal</h2>
            <ul>
              {/* Legal pages are not published yet — shown without links on purpose. */}
              <li className="jf-pending">
                Privacy Policy <span>Coming soon</span>
              </li>
              <li className="jf-pending">
                Terms and Conditions <span>Coming soon</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="jf-bottom">
          <span>© {YEAR} Jatriya</span>
          <span className="jf-place">
            <span className="jf-dot" aria-hidden /> Dhaka, Bangladesh
          </span>
        </div>
      </div>
    </footer>
  );
}
