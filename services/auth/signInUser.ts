'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { SignInSchema } from '@/lib/schemas/auth.schema'

export async function signInUser(values: SignInSchema): Promise<Response> {
  return fetch(getApiUrl('auth'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  })
}