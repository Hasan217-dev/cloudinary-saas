import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/sign-in', '/sign-up', '/home']
const publicApiRoutes = ['/api/videos']

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = new URL(req.url)

  const isPublicRoute = publicRoutes.includes(pathname)
  const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

  // Signed-in users shouldn't linger on auth pages
  if (userId && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // Not signed in and trying to reach a protected route
  if (!userId && !isPublicRoute && !isPublicApiRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}