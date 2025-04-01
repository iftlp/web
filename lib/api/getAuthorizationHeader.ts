import { auth } from '@/lib/auth/handlers'

export async function getAuthorizationHeader() {
  const session = await auth()

  return { Authorization: `Bearer ${session?.user.jwt}` }
}
