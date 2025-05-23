import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import 'next-auth/jwt'
import { AUTH_CONFIG } from '@/lib/auth/config'
import { signInUser } from '@/services/auth/signInUser'

declare module 'next-auth/jwt' {
  interface JWT {
    jwt?: {
      token: string
      expires: string
    }
  }
}

declare module 'next-auth' {
  interface User {
    jwt?: {
      token: string
      expires: string
    }
  }

  interface Session {
    user: {
      name: string
      email: string
      jwt?: {
        token: string
        expires: string
      }
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
        const token = await response.json()
        if (!token) return null

        // TODO: Récupérer le nom de l'administrateur
        return {
          name: 'Administrateur',
          email: credentials.email,
          jwt: token,
        }
      },
    }),
  ],
})
