// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/products(.*)',
  '/about',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isPublicRoute(req)) {
    return;
  }

  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
      return Response.redirect(signInUrl);
    }

    // 🔧 Güvenli kontrol
    const adminUserId = process.env.ADMIN_USER_ID;
    if (!adminUserId) {
      console.error('❌ ADMIN_USER_ID environment variable is not set');
      return Response.redirect(new URL('/error', req.url));
    }

    if (userId !== adminUserId) {
      console.log('❌ Not admin:', userId, 'vs', adminUserId);
      return Response.redirect(new URL('/', req.url));
    }
  }

  if (!userId) {
    return Response.redirect(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};