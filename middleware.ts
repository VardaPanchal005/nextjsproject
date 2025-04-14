import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)',"/api/workflows/(.*)*"])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  try {
    console.log("Processing route:", request.nextUrl.pathname);
    
    if (!isPublicRoute(request)) {
      console.log("Protecting route:", request.nextUrl.pathname);
      await auth.protect();
    } else {
      console.log("Public route allowed:", request.nextUrl.pathname);
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    throw error;
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
