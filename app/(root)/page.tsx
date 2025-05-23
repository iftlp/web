import { auth } from '@/lib/auth/handlers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/sign-in')
  return (
    <>
      <span className="text-gray-600">Signed in as:</span>
      <span className="font-medium">{session.user.email}</span>
    </>
  )
}
