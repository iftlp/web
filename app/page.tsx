import { auth } from '@/lib/auth/handlers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  if (!session) redirect('/sign-in')
  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user.email}</p>
        <p className="text-gray-600">Token:</p>
        <p className="font-medium">{session.user.jwt}</p>
      </div>
    </>
  )
}
