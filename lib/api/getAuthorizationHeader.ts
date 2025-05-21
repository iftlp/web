'use server'

import { auth } from '@/lib/auth/handlers'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export async function getAuthorizationHeader() {
  const session = await auth()

  const token = session?.user?.jwt?.token
  const expires = session?.user?.jwt?.expires

  const isExpired = !token || !expires || new Date(expires) < new Date()

  if (isExpired) {
    // TODO - Gérer la suppression du token / la déconnexion
    redirect(ROUTES.SIGN_IN)
  }

  return { Authorization: `Bearer ${token}` }
}
