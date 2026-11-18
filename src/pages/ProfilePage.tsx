import { useState } from "react";
import { CheckCircle2, Pencil, Save } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

import { z } from "zod";

const profileSchema = z.object({
  fullName: z.string().min(2, "Enter your name."),
  phone: z.string().min(7, "Enter a valid phone number."),
  bio: z.string().max(180, "Keep your bio under 180 characters."),
});
export function ProfilePage() {
  const user = useAuthStore((state) => state.user)!;
  const update = useAuthStore((state) => state.updateProfile);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaved(false);
    const parsed = profileSchema.safeParse({ fullName, phone, bio });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the profile details.");
      return;
    }
    setSaving(true);
    try {
      await update(parsed.data);
      setSaved(true);
      setEditing(false);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not save your profile.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">YOUR ACCOUNT</div>
          <h1>Your profile</h1>
          <p className="page-lede">
            Manage the profile other Jatria members see.
          </p>
        </div>
        {!editing && (
          <button
            className="button button-quiet"
            onClick={() => setEditing(true)}
          >
            <Pencil size={15} />
            Edit profile
          </button>
        )}
      </div>
      {saved && (
        <div className="success-banner">
          <CheckCircle2 size={16} />
          Profile saved to your Jatria account.
        </div>
      )}
      <article className="surface-card profile-detail">
        <div className="profile-cover">
          <div className="profile-cover-mark">
            <img src="/brand/jatria-symbol.svg" alt="" />
          </div>
        </div>
        <div className="profile-detail-main">
          <div className="avatar avatar-profile">
            {user.fullName
              .split(" ")
              .map((x) => x[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="profile-name">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
          </div>
          <span className="role-tag">{user.role}</span>
        </div>
        {editing ? (
          <form className="profile-edit-form" onSubmit={submit}>
            <label className="field-label">
              Full name
              <input
                className="field-control"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>
            <label className="field-label">
              Phone number
              <input
                className="field-control"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+8801XXXXXXXXX"
              />
            </label>
            <label className="field-label">
              About you
              <textarea
                className="field-control profile-bio-input"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                maxLength={180}
                placeholder="Share a little about your rides"
              />
            </label>
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            <div className="profile-form-actions">
              <button
                type="button"
                className="button button-quiet"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button className="button button-primary" disabled={saving}>
                <Save size={15} />
                {saving ? "Saving…" : "Save profile"}
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-stats">
            <div>
              <span>Member since</span>
              <b>
                {new Date(user.joinedAt).toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </b>
            </div>
            <div>
              <span>Community rating</span>
              <b>★ {user.rating.toFixed(2)} / 5</b>
            </div>
            <div>
              <span>Completed trips</span>
              <b>{user.trips}</b>
            </div>
            <div>
              <span>Phone</span>
              <b>{user.phone || "Not added"}</b>
            </div>
            <div className="profile-bio">
              <span>About</span>
              <b>{user.bio || "No bio yet."}</b>
            </div>
          </div>
        )}
      </article>
      {user.role === "driver" && user.vehicle && (
        <article className="surface-card vehicle-card">
          <div className="vehicle-icon">🚘</div>
          <div>
            <div className="eyebrow">YOUR VEHICLE</div>
            <h3>{user.vehicle.makeModel}</h3>
            <p>
              {user.vehicle.color} · {user.vehicle.plate}
            </p>
          </div>
        </article>
      )}
    </section>
  );
}
