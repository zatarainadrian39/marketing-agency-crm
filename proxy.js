import { NextResponse } from "next/server";

export function proxy(request) {
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const hasAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("auth-token"));

  if (!hasAuthCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasAuthCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};