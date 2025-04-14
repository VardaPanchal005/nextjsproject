import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)',"/api/workflows/(.*)*"])

export async function middleware(request) {
  try {

    console.log("Middleware executing for:", request.nextUrl.pathname);
    
    // If you want to test with Clerk disabled:
    return Response.next();
    
    // Or with minimal Clerk:
    // const auth = auth();
    // return auth.next();
  } catch (error) {

    console.error("CRITICAL MIDDLEWARE ERROR:", error);
    
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
