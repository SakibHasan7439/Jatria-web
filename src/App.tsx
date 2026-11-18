import { useEffect, lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { SiteLayout } from "./site/components/SiteLayout";
import { useAuthStore } from "./stores/authStore";

const AuthPage = lazy(() =>
  import("./pages/AuthPage").then((module) => ({ default: module.AuthPage })),
);
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const RidesPage = lazy(() =>
  import("./pages/RidesPage").then((module) => ({ default: module.RidesPage })),
);
const RequestsPage = lazy(() =>
  import("./pages/RequestsPage").then((module) => ({
    default: module.RequestsPage,
  })),
);
const ChatPage = lazy(() =>
  import("./pages/ChatPage").then((module) => ({ default: module.ChatPage })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  })),
);
const LandingPage = lazy(() =>
  import("./site/pages/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const HowItWorksPage = lazy(() =>
  import("./site/pages/HowItWorksPage").then((m) => ({
    default: m.HowItWorksPage,
  })),
);
const SafetyPage = lazy(() =>
  import("./site/pages/SafetyPage").then((m) => ({ default: m.SafetyPage })),
);
const OwnersPage = lazy(() =>
  import("./site/pages/OwnersPage").then((m) => ({ default: m.OwnersPage })),
);
const HelpPage = lazy(() =>
  import("./site/pages/HelpPage").then((m) => ({ default: m.HelpPage })),
);

function ProtectedApp() {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/signin" replace />;
  return <AppShell />;
}
function RequireRole({ role }: { role: "driver" | "passenger" }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/signin" replace />;
  return user.role === role ? (
    <Outlet />
  ) : (
    <Navigate
      to={user.role === "driver" ? "/app/requests" : "/app/rides"}
      replace
    />
  );
}
function LoadingScreen() {
  return (
    <div className="route-loading" role="status">
      <span className="loading-mark" />
      <b>Opening Jatriya…</b>
    </div>
  );
}
/** Auth and app routes wait for the Firebase session; public pages do not. */
function SessionGate({ children }: { children: ReactNode }) {
  const isReady = useAuthStore((state) => state.isReady);
  return isReady ? children : <LoadingScreen />;
}
export default function App() {
  const initialize = useAuthStore((state) => state.initialize);
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: () => void = () => {};
    void initialize().then((stop) => {
      if (cancelled) stop();
      else unsubscribe = stop;
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [initialize]);
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="safety" element={<SafetyPage />} />
          <Route path="vehicle-owners" element={<OwnersPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
        <Route
          path="/signin"
          element={
            <SessionGate>
              <AuthPage mode="signin" />
            </SessionGate>
          }
        />
        <Route
          path="/register"
          element={
            <SessionGate>
              <AuthPage mode="register" />
            </SessionGate>
          }
        />
        <Route
          path="/app"
          element={
            <SessionGate>
              <ProtectedApp />
            </SessionGate>
          }
        >
          <Route index element={<HomePage />} />
          <Route element={<RequireRole role="passenger" />}>
            <Route path="rides" element={<RidesPage />} />
          </Route>
          <Route path="requests" element={<RequestsPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
