import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/sign-in', '/sign-up', '/home']
const publicApiRoutes = ['/api/videos']

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = new URL(req.url)

  const isPublicRoute = publicRoutes.includes(pathname)
  const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

  // signed-in user public route (/, /sign-in, /sign-up) pe jaaye to /home bhej do
  // agar already /home pe hai to redirect mat karo, warna infinite loop ban jayega
  if (userId && isPublicRoute && !isPublicApiRoute && pathname !== '/home') {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // signed-out user protected route (public nahi) pe jaaye to sign-in pe bhej do
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