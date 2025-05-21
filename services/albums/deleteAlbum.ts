'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function deleteAlbum(id: number) {
  return fetch(getApiUrl(`album/${id}`), {
    method: 'DELETE',
    headers: {
      ...(await getAuthorizationHeader()),
    },
  })
}
