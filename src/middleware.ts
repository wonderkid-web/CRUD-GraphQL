import { auth } from "../auth";
import { NextResponse } from "next/server";

export default auth(({ auth }) => {
  if (!auth) return NextResponse.redirect(`${process.env.AUTH_URL}/api/auth/signin`);
  // if (
    // clientPath.includes(nextUrl.pathname) &&
    // auth.user.email.includes("admin")
  // )
    // return NextResponse.redirect(`${process.env.AUTH_URL}/admin`);
});



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|signin).*)",
  ],
};
