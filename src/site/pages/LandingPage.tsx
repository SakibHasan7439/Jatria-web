import { HomeHero } from "../sections/HomeHero";
import { TrustBar } from "../sections/TrustBar";
import { HomeSteps } from "../sections/HomeSteps";
import { HomePromises } from "../sections/HomePromises";
import { HomeShowcase } from "../sections/HomeShowcase";
import { HomeSafety } from "../sections/HomeSafety";
import { HomeOwners } from "../sections/HomeOwners";
import { CtaBand } from "../components/CtaBand";
import { ButtonLink } from "../components/Button";

export function LandingPage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <HomeSteps />
      <HomePromises />
      <HomeShowcase />
      <HomeSafety />
      <HomeOwners />
      <CtaBand
        title="Your daily commute could take more than one person forward."
        lead="Join a smarter way to travel through Dhaka."
        actions={
          <>
            <ButtonLink to="/register" size="lg" arrow>
              Get started with Jatriya
            </ButtonLink>
            <ButtonLink to="/how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
