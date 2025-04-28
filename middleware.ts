import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicroutes } from "@/routes";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = nextUrl;

  const isPublicRoute = publicroutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // Handle non-logged-in users trying to access protected pages
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  // Role-based route protection
  if (session) {
    const role = session.role;

    if (role === "EMPLOYEE") {
      if (!pathname.startsWith("/employee")) {
        return Response.redirect(new URL("/employee", nextUrl));
      }
    } else if (role === "MANAGER") {
      if (!pathname.startsWith("/manager")) {
        return Response.redirect(new URL("/manager", nextUrl));
      }
    } else if (role === "OWNER") {
    //   if (!pathname.startsWith("/owner")) {
        return Response.redirect(new URL("/owner", nextUrl));
    //   }
    }
  }

  return;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
