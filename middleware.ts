import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)',"/api/workflows/(.*)*"])

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware executing for:", request.nextUrl.pathname);
    
    // For testing purposes, just pass through all requests
    return NextResponse.next();
    
    // When you want to re-enable Clerk:
    // if (!isPublicRoute(request)) {
    //   const auth = getAuth(request);
    //   return auth.protect();
    // }
    // return NextResponse.next();
  } catch (error) {
    console.error("CRITICAL MIDDLEWARE ERROR:", error);
    
    return new NextResponse(JSON.stringify({ error: "Server configuration error" }), {
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
