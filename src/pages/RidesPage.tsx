import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  CarFront,
  MapPin,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { z } from "zod";
import { places } from "../data/seed";
import { profileToNearbyDriver } from "../services/firebase/profiles";
import { useProfileStore } from "../stores/profileStore";
import { useAuthStore } from "../stores/authStore";
import { useRideStore } from "../stores/rideStore";

const searchSchema = z
  .object({
    pickup: z.string().min(1),
    dropoff: z.string().min(1),
    fare: z.coerce.number().min(50).max(5000),
  })
  .refine((value) => value.pickup !== value.dropoff, {
    path: ["dropoff"],
    message: "Choose a different destination.",
  });

export function RidesPage() {
  const user = useAuthStore((state) => state.user)!;
  const createRequest = useRideStore((state) => state.createRequest);
  const profiles = useProfileStore((state) => state.profiles);
  const profileReady = useProfileStore((state) => state.isReady);
  const profileError = useProfileStore((state) => state.error);
  const activeRequest = useRideStore((state) =>
    state.requests.some(
      (request) =>
        ["open", "accepted_by_driver", "confirmed"].includes(request.status) &&
        request.passengerId === user.id,
    ),
  );
  const navigate = useNavigate();
  const [pickupId, setPickupId] = useState(places[0].id);
  const [dropoffId, setDropoffId] = useState(places[1].id);
  const [fare, setFare] = useState("320");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const drivers = useMemo(
    () =>
      profiles
        .map(profileToNearbyDriver)
        .filter(
          (driver): driver is NonNullable<typeof driver> =>
            Boolean(driver) &&
            driver!.id !== user.id &&
            `${driver!.fullName} ${driver!.vehicle.makeModel}`
              .toLowerCase()
              .includes(search.toLowerCase()),
        ),
    [profiles, search, user.id],
  );
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = searchSchema.safeParse({
      pickup: pickupId,
      dropoff: dropoffId,
      fare,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your trip details.");
      return;
    }
    if (user.role !== "passenger") {
      setError(
        "Passenger accounts create ride requests. Drivers can respond in Ride requests.",
      );
      return;
    }
    const pickup = places.find((place) => place.id === pickupId)!;
    const dropoff = places.find((place) => place.id === dropoffId)!;
    try {
      const request = await createRequest(
        user,
        pickup,
        dropoff,
        parsed.data.fare,
      );
      navigate("/app/requests", {
        state: {
          success: "Ride request sent. Nearby drivers can now respond.",
          createdRequestId: request.id,
        },
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not send the ride request.",
      );
    }
  }
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">PLAN YOUR JOURNEY</div>
          <h1>Find a ride</h1>
          <p className="page-lede">
            Tell us where you’re going and discover trusted drivers nearby.
          </p>
        </div>
      </div>
      <div className="ride-search-layout">
        <div className="ride-form-column">
          <form className="surface-card trip-form" onSubmit={submit}>
            <div className="section-heading">
              <div>
                <h3>Where to?</h3>
                <p>Set your pickup, destination, and proposed fare.</p>
              </div>
              <span className="form-badge">
                <ShieldCheck size={13} /> Jatria rides
              </span>
            </div>
            <div className="route-fields">
              <label className="field-label">
                Pickup location
                <span className="select-wrap">
                  <MapPin size={16} />
                  <select
                    className="field-control"
                    value={pickupId}
                    onChange={(event) => setPickupId(event.target.value)}
                  >
                    {places.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.name} · {place.subtitle}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <div className="route-line">
                <span />
              </div>
              <label className="field-label">
                Drop-off location
                <span className="select-wrap dropoff">
                  <MapPin size={16} />
                  <select
                    className="field-control"
                    value={dropoffId}
                    onChange={(event) => setDropoffId(event.target.value)}
                  >
                    {places.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.name} · {place.subtitle}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
            <label className="field-label fare-label">
              Your proposed fare
              <span className="fare-field">
                <span>৳</span>
                <input
                  className="field-control"
                  type="number"
                  min="50"
                  max="5000"
                  step="10"
                  value={fare}
                  onChange={(event) => setFare(event.target.value)}
                  required
                />
                <small>BDT</small>
              </span>
              <small className="field-hint">
                Drivers will see this fare with your request.
              </small>
            </label>
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            {activeRequest && (
              <div className="form-error" role="status">
                You already have an active ride request. Resolve it before
                requesting another.
              </div>
            )}
            <button
              className="button button-primary wide-button"
              type="submit"
              disabled={user.role !== "passenger" || activeRequest}
            >
              {user.role === "passenger"
                ? "Send ride request"
                : "Passenger account required"}
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="map-preview">
            <div className="map-grid" />
            <div className="map-label map-label-start">
              <span className="map-pin-dot" />
              {places.find((place) => place.id === pickupId)?.name}
            </div>
            <svg
              viewBox="0 0 500 170"
              preserveAspectRatio="none"
              aria-label="Illustrated route preview"
            >
              <path
                d="M50 135 C120 140 103 45 210 71 S333 160 450 30"
                fill="none"
                stroke="#28ad9c"
                strokeWidth="3"
                strokeDasharray="7 8"
                strokeLinecap="round"
              />
            </svg>
            <span className="preview-start-pin" />
            <span className="preview-end-pin" />
            <div className="map-label map-label-end">
              <span className="map-pin-end" />
              {places.find((place) => place.id === dropoffId)?.name}
            </div>
            <div className="map-attribution">Route preview · Dhaka</div>
          </div>
        </div>
        <div className="drivers-column">
          <div className="drivers-heading">
            <div>
              <div className="eyebrow">YOUR LOCAL COMMUNITY</div>
              <h2>Jatria drivers</h2>
            </div>
            <span className="availability-pill">
              <i /> Profiles
            </span>
          </div>
          <label className="driver-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search drivers or vehicles"
            />
          </label>
          <div className="driver-list">
            {!profileReady ? (
              <div className="empty-state">Loading driver profiles…</div>
            ) : profileError ? (
              <div className="form-error" role="alert">
                {profileError}
              </div>
            ) : (
              drivers.map((driver, index) => (
                <article className="driver-card" key={driver.id}>
                  <div className={`driver-avatar driver-avatar-${index % 4}`}>
                    {driver.fullName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div className="driver-info">
                    <div className="driver-name-row">
                      <b>{driver.fullName}</b>
                      <span className="rating">
                        <Star size={12} fill="currentColor" />
                        {driver.rating}
                      </span>
                    </div>
                    <span className="driver-vehicle">
                      {driver.vehicle.makeModel} <i /> {driver.vehicle.color}
                    </span>
                    <div className="driver-meta">
                      <span>{driver.etaMinutes} min away</span>
                      <i />
                      <span>{driver.distanceKm} km</span>
                      <i />
                      <span>{driver.trips.toLocaleString()} trips</span>
                    </div>
                  </div>
                  <div className="driver-price">
                    <b>৳{driver.fare}</b>
                    <span>estimated</span>
                  </div>
                  <div className="driver-type">
                    {driver.vehicleType === "bike" ? (
                      <Bike size={14} />
                    ) : (
                      <CarFront size={15} />
                    )}
                  </div>
                </article>
              ))
            )}
            {profileReady && !profileError && drivers.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <Search size={18} />
                </div>
                <b>No Jatria drivers yet</b>
                <span>Driver profiles appear here once they register.</span>
              </div>
            )}
          </div>
          <div className="driver-disclaimer">
            <ShieldCheck size={14} /> Driver profiles come from Jatria accounts.
            A ride request is assigned after a driver accepts.
          </div>
        </div>
      </div>
    </section>
  );
}
