import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/checkout", "/account", "/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ Let public pages pass
  if (!isProtected) {
    return NextResponse.next();
  }

  // ✅ Check if ANY supabase auth cookie exists
  const hasAuthCookie = req.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));

  if (!hasAuthCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/account/:path*", "/admin/:path*"],
};