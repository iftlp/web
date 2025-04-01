import NextAuth from 'next-auth'
import { PUBLIC_ROUTES, ROUTES } from '@/constants/routes'
import { AUTH_CONFIG } from '@/lib/auth/config'

const { auth } = NextAuth(AUTH_CONFIG)

export default auth((req) => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL(ROUTES.SIGN_IN, nextUrl))
  if (nextUrl.pathname === ROUTES.SIGN_IN && isAuthenticated) return Response.redirect(new URL(ROUTES.ROOT, nextUrl))

})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}