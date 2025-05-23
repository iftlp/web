'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function deleteArtist(id: number) {
  return fetch(getApiUrl(`artist/${id}`), {
    method: 'DELETE',
    headers: {
      ...(await getAuthorizationHeader()),
    },
  })
}
