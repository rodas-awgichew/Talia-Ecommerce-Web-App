import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Check Supabase session cookie
  const hasSession = request.cookies.get("sb-access-token");

  if (!hasSession) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Apply to all routes except static files
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;


//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     pathname.includes('.')
//   ) {
//     return NextResponse.next();
//   }

//   // Skip RSC / prefetch requests 
//   if (req.headers.get('accept')?.includes('text/x-component')) {
//     return NextResponse.next();
//   }

//   const isPublicRoute =
//     pathname === '/' ||
//     pathname.startsWith('/auth');

//   // Check Supabase session cookies
//   const hasSession =
//     req.cookies.get('sb-access-token') ||
//     req.cookies.get('sb-refresh-token');

  
//   if (!hasSession && !isPublicRoute) {
//     return NextResponse.redirect(new URL('/auth/login', req.url));
//   }

//   // 🔁 Prevent logged-in users from auth pages
//   if (hasSession && pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next|api|favicon.ico).*)'],
// };