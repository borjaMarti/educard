import { authMiddleware } from "@clerk/nextjs";

// Test publicRoute regExp: /^\/api\/.*$/

export default authMiddleware({
    publicRoutes: ['/', '/about', '/api/webhooks/user']
});


export const config = {

  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};