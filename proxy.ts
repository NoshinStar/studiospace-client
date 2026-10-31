
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = !!getSessionCookie(request);

  // Logged-in users should not revisit Login or Register.
  if (
    hasSession &&
    (pathname === "/login" || pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect logged-out users to Login.
  if (
    !hasSession &&
    pathname !== "/login" &&
    pathname !== "/register"
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/studios/edit/:path*",
  ],
};
