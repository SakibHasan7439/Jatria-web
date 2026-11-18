# Jatria Web

A desktop-first web app for Jatria ride sharing, built with React, strict TypeScript, and Vite.

## Local setup

1. Install Node.js 22 or newer and run `npm install`.
2. Copy `.env.example` to `.env.local` and enter the Firebase web app values for the same project used by the mobile app.
3. In Firebase Console, enable **Authentication → Email/Password** and confirm Realtime Database rules allow authenticated users to read and write the paths used by the mobile app.
4. Run `npm run dev`.
5. Run `npm run build` for the TypeScript check and production build.

## Data and services

- Firebase Authentication handles email/password registration, sign-in, sign-out, and browser session persistence. Registration captures the selected role and driver vehicle details.
- Realtime Database stores profiles under `users/{uid}`, ride requests under `requests/{requestId}`, and confirmed-ride chat under `messages/{requestId}/{messageId}`.
- Ride requests and profile lists update through Realtime Database subscriptions. The ride lifecycle supports open, accepted, confirmed, rejected, and cancelled states.
- Firebase service modules are isolated under `src/services/firebase` and `src/services/chat` for later replacement or extension.
- Location choices are currently a centrally maintained Dhaka list; payment, production notifications, and complete ride history remain out of scope.

The `.env.local` file is ignored by git. Firebase web configuration identifies the project and is not a server secret. Enforce access in Firebase Security Rules; do not make account or ride data public.
