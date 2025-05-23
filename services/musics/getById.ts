'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function getMusicById(id: number) {
  return fetch(getApiUrl(`music/${id}`), {
    method: 'GET',
    headers: {
      ...(await getAuthorizationHeader()),
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
}
