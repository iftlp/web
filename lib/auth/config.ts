import { ROUTES } from '@/constants/routes'
import type { NextAuthConfig } from 'next-auth'

export const AUTH_CONFIG: NextAuthConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  cookies: {
    callbackUrl: {
      name: 'shizima.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: 'shizima.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    sessionToken: {
      name: 'shizima.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
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
