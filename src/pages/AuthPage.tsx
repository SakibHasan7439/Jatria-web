import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bike,
  CarFront,
  Check,
  Eye,
  EyeOff,
  Repeat,
  ShieldCheck,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import type { Role } from "../types";
import { Logo } from "../site/components/Logo";
import { RouteScene } from "../site/components/RouteScene";
import "../site/styles/tokens.css";
import "../site/styles/brand.css";
import "../site/styles/auth.css";

const common = z.object({
  name: z.string(),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["passenger", "driver"]),
  phone: z.string(),
  licenseNumber: z.string(),
  vehicleType: z.enum(["bike", "car"]),
  vehicleMakeModel: z.string(),
  vehicleColor: z.string(),
  vehiclePlate: z.string(),
  confirmPassword: z.string(),
});
const signInSchema = common;
const registerSchema = common
  .extend({
    name: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(80, "Name is too long."),
    phone: z
      .string()
      .trim()
      .regex(/^\+?\d{8,15}$/, "Enter a valid phone number."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Include at least one letter.")
      .regex(/[0-9]/, "Include at least one number."),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword)
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    if (value.role === "driver") {
      if (value.licenseNumber.trim().length < 5)
        context.addIssue({
          code: "custom",
          path: ["licenseNumber"],
          message: "Enter your driving license number.",
        });
      if (value.vehicleMakeModel.trim().length < 2)
        context.addIssue({
          code: "custom",
          path: ["vehicleMakeModel"],
          message: "Enter your vehicle make and model.",
        });
      if (value.vehicleColor.trim().length < 2)
        context.addIssue({
          code: "custom",
          path: ["vehicleColor"],
          message: "Enter your vehicle color.",
        });
      if (value.vehiclePlate.trim().length < 3)
        context.addIssue({
          code: "custom",
          path: ["vehiclePlate"],
          message: "Enter your plate number.",
        });
    }
  });
type FormValues = z.infer<typeof common>;
export function AuthPage({ mode }: { mode: "signin" | "register" }) {
  const registerMode = mode === "register";
  const navigate = useNavigate();
  // `/register?role=driver` (from the owner pages) preselects the driver role.
  const [searchParams] = useSearchParams();
  const initialRole: Role =
    registerMode && searchParams.get("role") === "driver"
      ? "driver"
      : "passenger";
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const { signIn, register: registerAccount } = useAuthStore();
  const sessionError = useAuthStore((state) => state.error);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(registerMode ? registerSchema : signInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: initialRole,
      phone: "",
      licenseNumber: "",
      vehicleType: "car",
      vehicleMakeModel: "",
      vehicleColor: "",
      vehiclePlate: "",
      confirmPassword: "",
    },
  });
  const role = watch("role") as Role;
  const password = watch("password");
  const passwordRules = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One letter", met: /[A-Za-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];
  async function submit(values: FormValues) {
    setServerError("");
    try {
      if (registerMode)
        await registerAccount(
          values.name,
          values.email,
          values.password,
          values.role,
          {
            phone: values.phone,
            licenseNumber:
              values.role === "driver" ? values.licenseNumber : undefined,
            vehicleType:
              values.role === "driver" ? values.vehicleType : undefined,
            vehicle:
              values.role === "driver"
                ? {
                    makeModel: values.vehicleMakeModel,
                    color: values.vehicleColor,
                    plate: values.vehiclePlate,
                  }
                : undefined,
          },
        );
      else await signIn(values.email, values.password);
      navigate("/app");
    } catch (caught) {
      setServerError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Try again.",
      );
    }
  }
  const fieldError = (message?: string) =>
    message ? <small className="au-error">{message}</small> : null;

  return (
    <main className="au">
      <section className="au-main">
        <header className="au-top">
          <Link to="/" className="au-logo" aria-label="Jatriya home">
            <Logo size={30} animate />
          </Link>
          <Link to="/" className="au-back">
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden /> Back to site
          </Link>
        </header>

        <div className="au-wrap" key={mode}>
          <div className="au-head">
            <p className="au-eyebrow">
              {registerMode ? "Join Jatriya" : "Welcome back"}
            </p>
            <h1 className="au-title">
              {registerMode ? "Create your account" : "Log in to Jatriya"}
            </h1>
            <p className="au-sub">
              {registerMode
                ? "Set up your profile to start sharing your daily commute."
                : "Use your Jatriya email and password to continue."}
            </p>
          </div>

          <form className="au-form" onSubmit={handleSubmit(submit)}>
            {registerMode && (
              <fieldset className="au-group">
                <legend>About you</legend>
                <label className="au-field">
                  <span>Full name</span>
                  <input
                    className="au-input"
                    {...register("name")}
                    placeholder="e.g. Nabila Hossain"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {fieldError(errors.name?.message)}
                </label>
                <label className="au-field">
                  <span>Phone number</span>
                  <input
                    className="au-input"
                    {...register("phone")}
                    placeholder="+8801XXXXXXXXX"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={!!errors.phone}
                  />
                  {fieldError(errors.phone?.message)}
                </label>
              </fieldset>
            )}

            <fieldset className="au-group">
              {registerMode && <legend>Account</legend>}
              <label className="au-field">
                <span>Email address</span>
                <input
                  className="au-input"
                  type="email"
                  {...register("email")}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {fieldError(errors.email?.message)}
              </label>
              <label className="au-field">
                <span>Password</span>
                <span className="au-password">
                  <input
                    className="au-input"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder={
                      registerMode ? "Create a password" : "Enter your password"
                    }
                    autoComplete={
                      registerMode ? "new-password" : "current-password"
                    }
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye size={18} strokeWidth={1.75} />
                    )}
                  </button>
                </span>
                {fieldError(errors.password?.message)}
              </label>
              {registerMode && (
                <ul className="au-rules" aria-label="Password requirements">
                  {passwordRules.map((rule) => (
                    <li
                      key={rule.label}
                      className={rule.met ? "is-met" : undefined}
                    >
                      <span className="au-rule-mark" aria-hidden="true">
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      {rule.label}
                      <span className="sr-only">
                        {rule.met ? " (met)" : " (not met)"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {registerMode && (
                <label className="au-field">
                  <span>Confirm password</span>
                  <input
                    className="au-input"
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirmPassword}
                  />
                  {fieldError(errors.confirmPassword?.message)}
                </label>
              )}
            </fieldset>

            {registerMode && (
              <fieldset className="au-group">
                <legend>How you’ll use Jatriya</legend>
                <div className="au-roles">
                  <button
                    type="button"
                    className={`au-role${role === "passenger" ? " is-selected" : ""}`}
                    aria-pressed={role === "passenger"}
                    onClick={() => setValue("role", "passenger")}
                  >
                    <span className="au-role-icon">
                      <UsersRound size={20} strokeWidth={1.75} />
                    </span>
                    <span className="au-role-copy">
                      <b>Find a seat</b>
                      <small>Ride with commuters on your route</small>
                    </span>
                    <i className="au-role-check" aria-hidden="true">
                      <Check size={14} strokeWidth={2.5} />
                    </i>
                  </button>
                  <button
                    type="button"
                    className={`au-role${role === "driver" ? " is-selected" : ""}`}
                    aria-pressed={role === "driver"}
                    onClick={() => setValue("role", "driver")}
                  >
                    <span className="au-role-icon">
                      <CarFront size={20} strokeWidth={1.75} />
                    </span>
                    <span className="au-role-copy">
                      <b>Share my ride</b>
                      <small>Offer seats in your car or on your bike</small>
                    </span>
                    <i className="au-role-check" aria-hidden="true">
                      <Check size={14} strokeWidth={2.5} />
                    </i>
                  </button>
                </div>
              </fieldset>
            )}

            {registerMode && role === "driver" && (
              <fieldset className="au-group au-vehicle">
                <legend>Driver and vehicle details</legend>
                <label className="au-field">
                  <span>Driving licence number</span>
                  <input
                    className="au-input"
                    {...register("licenseNumber")}
                    placeholder="Licence number"
                    aria-invalid={!!errors.licenseNumber}
                  />
                  {fieldError(errors.licenseNumber?.message)}
                </label>
                <div className="au-row">
                  <label className="au-field">
                    <span>Vehicle type</span>
                    <select
                      className="au-input au-select"
                      {...register("vehicleType")}
                    >
                      <option value="car">Car</option>
                      <option value="bike">Motorbike</option>
                    </select>
                  </label>
                  <label className="au-field">
                    <span>Make and model</span>
                    <input
                      className="au-input"
                      {...register("vehicleMakeModel")}
                      placeholder="e.g. Toyota Premio"
                      aria-invalid={!!errors.vehicleMakeModel}
                    />
                    {fieldError(errors.vehicleMakeModel?.message)}
                  </label>
                </div>
                <div className="au-row">
                  <label className="au-field">
                    <span>Colour</span>
                    <input
                      className="au-input"
                      {...register("vehicleColor")}
                      placeholder="Silver"
                      aria-invalid={!!errors.vehicleColor}
                    />
                    {fieldError(errors.vehicleColor?.message)}
                  </label>
                  <label className="au-field">
                    <span>Number plate</span>
                    <input
                      className="au-input"
                      {...register("vehiclePlate")}
                      placeholder="DHAKA-GA-12-3456"
                      aria-invalid={!!errors.vehiclePlate}
                    />
                    {fieldError(errors.vehiclePlate?.message)}
                  </label>
                </div>
              </fieldset>
            )}

            {(serverError || sessionError) && (
              <div className="au-alert" role="alert">
                {serverError || sessionError}
              </div>
            )}

            <button
              className={`au-submit${isSubmitting ? " is-busy" : ""}`}
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "Please wait…"
                  : registerMode
                    ? "Create account"
                    : "Log in"}
              </span>
              {!isSubmitting && (
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              )}
              {isSubmitting && <i className="au-progress" aria-hidden="true" />}
            </button>
          </form>

          <p className="au-switch">
            {registerMode ? "Already have an account?" : "New to Jatriya?"}{" "}
            <Link to={registerMode ? "/signin" : "/register"}>
              {registerMode ? "Log in" : "Create an account"}
            </Link>
          </p>
          <p className="au-legal">
            Your account details are stored with Jatriya’s secure Firebase
            authentication.
          </p>
        </div>
      </section>

      <aside className="au-aside" aria-label="About Jatriya">
        <div className="au-aside-panel">
          <div className="au-aside-map is-live" aria-hidden="true">
            <RouteScene tone="navy" labels={false} />
          </div>
          <div className="au-aside-copy">
            <p className="au-aside-title">Your commute, connected.</p>
            <ul className="au-aside-points">
              <li>
                <BadgeCheck size={18} strokeWidth={1.75} aria-hidden /> Verified
                office commuters
              </li>
              <li>
                <Repeat size={18} strokeWidth={1.75} aria-hidden /> Planned,
                recurring rides
              </li>
              <li>
                <Wallet size={18} strokeWidth={1.75} aria-hidden /> Costs shared
                openly
              </li>
              <li>
                <ShieldCheck size={18} strokeWidth={1.75} aria-hidden /> Live
                location and SOS
              </li>
            </ul>
          </div>
          <div className="au-aside-note" aria-hidden="true">
            <span className="au-aside-icons">
              <CarFront size={18} strokeWidth={1.75} />
              <Bike size={18} strokeWidth={1.75} />
            </span>
            <span>
              <b>Move Together. Move Smarter.</b>
              <small>Dhaka, Bangladesh</small>
            </span>
          </div>
        </div>
      </aside>
    </main>
  );
}
