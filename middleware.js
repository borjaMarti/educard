import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Test publicRoute regExp: /^\/api\/.*$/

export default authMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/api/webhooks/user",
    "/privacy",
    "/tos",
    "/tutorial",
  ],
  afterAuth: (auth, req, evt) => {
    if (!auth.userId && !auth.isPublicRoute) {
      const signIn = new URL("/sign-in", req.url);
      return NextResponse.redirect(signIn);
    }
    if (auth.userId && req.nextUrl.pathname === "/") {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
