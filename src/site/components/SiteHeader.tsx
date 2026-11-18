import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { useAuthStore } from "../../stores/authStore";

const primaryNav = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/safety", label: "Safety" },
  { to: "/vehicle-owners", label: "For vehicle owners" },
  { to: "/help", label: "Help" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`jh${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="jh-bar j-container">
        <Link to="/" className="jh-logo" aria-label="Jatriya home">
          <Logo size={30} animate />
        </Link>
        <nav className="jh-nav" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `jh-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="jh-actions">
          {user ? (
            <ButtonLink to="/app" size="sm" arrow>
              Open dashboard
            </ButtonLink>
          ) : (
            <>
              <Link className="jh-login" to="/signin">
                Log in
              </Link>
              <ButtonLink to="/register" size="sm">
                Get started
              </ButtonLink>
            </>
          )}
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="jh-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>
      <div
        id="site-menu"
        ref={sheetRef}
        className="jh-sheet"
        hidden={!open}
        aria-label="Menu"
      >
        <nav className="j-container jh-sheet-inner" aria-label="Mobile">
          {primaryNav.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `jh-sheet-link${isActive ? " is-active" : ""}`}
              style={{ "--i": index } as CSSProperties}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="jh-sheet-actions">
            {user ? (
              <ButtonLink to="/app" size="lg" arrow>
                Open dashboard
              </ButtonLink>
            ) : (
              <>
                <ButtonLink to="/register" size="lg">
                  Get started
                </ButtonLink>
                <ButtonLink to="/signin" size="lg" variant="secondary">
                  Log in
                </ButtonLink>
              </>
            )}
          </div>
        </nav>
      </div>
      <button
        type="button"
        className="jh-scrim"
        tabIndex={-1}
        aria-hidden="true"
        hidden={!open}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
