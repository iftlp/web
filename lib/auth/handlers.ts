import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import 'next-auth/jwt'
import { AUTH_CONFIG } from '@/lib/auth/config'
import { signInUser } from '@/services/auth/signInUser'

declare module 'next-auth/jwt' {
  interface JWT {
    jwt?: string
  }
}

declare module 'next-auth' {
  interface User {
    jwt?: string
  }

  interface Session {
    user: {
      email: string
      jwt?: string
    }
  }
}

export const { signIn, signOut, handlers, auth } = NextAuth({
  ...AUTH_CONFIG,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== 'string' ||
          typeof credentials?.password !== 'string'
        ) {
          return null
        }

        const response = await signInUser({
          email: credentials.email.toLowerCase(),
          password: credentials.password,
        })

        if (!response.ok) return null
        const token = await response.text()
        if (!token) return null

        return {
          email: credentials.email,
          jwt: token,
        }
      },
    }),
  ],
})
