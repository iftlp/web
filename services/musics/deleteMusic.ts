'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function deleteMusic(id: number) {
  return fetch(getApiUrl(`music/${id}`), {
    method: 'DELETE',
    headers: {
      ...(await getAuthorizationHeader()),
    },
  })
}
