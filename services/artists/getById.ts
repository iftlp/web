'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function getArtistById(id: number) {
  return fetch(getApiUrl(`artist/${id}`), {
    method: 'GET',
    headers: {
      ...(await getAuthorizationHeader()),
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
}
