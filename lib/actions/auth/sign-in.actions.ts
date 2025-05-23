'use server'

import { signIn } from '@/lib/auth/handlers'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function signInAction(values: SignInSchema) {
  try {
    await signIn('credentials', {
      email: values.email.toLowerCase(),
      password: values.password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          error: 'invalid_credentials',
          message: 'Identifiants invalides',
        }
      }
    }
    return {
      error: 'unknown',
      message: 'Une erreur est survenue, veuillez réessayer',
    }
  }

  redirect('/')
}
