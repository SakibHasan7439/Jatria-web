import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import "../styles/tokens.css";
import "../styles/brand.css";
import "../styles/site.css";
import "../styles/pages.css";

const titles: Record<string, string> = {
  "/": "Jatriya — Share the commute you already make",
  "/how-it-works": "How it works — Jatriya",
  "/safety": "Safety and trust — Jatriya",
  "/vehicle-owners": "For car and bike owners — Jatriya",
  "/help": "Help and FAQs — Jatriya",
};

/** Public website frame: header, page transition, footer. */
export function SiteLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? "Jatriya";
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="site">
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-fallback" />}>
          {/* Keyed so each route plays the 240 ms page transition. */}
          <div className="page-enter" key={pathname}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
