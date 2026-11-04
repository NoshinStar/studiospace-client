# StudioSpace

StudioSpace is a peer-to-peer creative workspace marketplace where creators can discover, list, and book photo studios, podcast lounges, music suites, and film stages by the hour.

**Live Site:** https://studiospace-client-theta.vercel.app
**Server API:** https://studiospace-server-indol.vercel.app

## Features
- Discover and filter studios by category, price, and rating.
- Secure authentication using BetterAuth (Email/Password and Google Login).
- JWT-protected API routes for creating, updating, and deleting studios.
- Seamless booking system with double-booking prevention for confirmed slots.
- Host Dashboard to manage listings and confirm/reject booking requests.
- Fully responsive UI with Dark/Light theme toggle, custom modals, and toast notifications.
- imgbb integration for smooth image uploading.

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Swiper, Sonner.
- **Backend:** Node.js, Express.js, MongoDB.
- **Authentication:** BetterAuth, JWT.

## Local Setup
1. Clone both client and server repositories.
2. Run `npm install` in both folders.
3. Set up the `.env.local` in the client with your `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXT_PUBLIC_API_URL`.
4. Run `npm run dev` in the server first, then in the client.
5. Open `http://localhost:3000`.

## Examiner Test Credentials
You can use the following accounts to test the platform:
- **Host Account:**
  - Email: `examiner@studiospace.com`
  - Password: `12345678eM`
- **Guest Account:**
  - Email: `noshin@gmail.com`
  - Password: `12345678eM` 

**How to Test:**
1. Log in as Guest and book any studio.
2. Log out and log in as Host (Examiner).
3. Go to "My Studio Listings" or "Booking Requests" to manage the booking and studios.