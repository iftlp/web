import { ROUTES } from '@/constants/routes'
import type { NextAuthConfig } from 'next-auth'

export const AUTH_CONFIG: NextAuthConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  cookies: {
    callbackUrl: {
      name: 'shizima.callback-url',
    },
    csrfToken: {
      name: 'shizima.csrf-token',
    },
    sessionToken: {
      name: 'shizima.session-token',
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt
      }
      return token
    },
    session({ session, token }) {
      session.user.jwt = token.jwt
      return session
    },
  },
  providers: [],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
}
