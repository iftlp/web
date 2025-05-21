'use server'

import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function putArtist(values: ArtistFormSchema, id: number) {
  return fetch(getApiUrl(`artist/${id}`), {
    method: 'PUT',
    headers: {
      ...(await getAuthorizationHeader()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      name: values.name,
    }),
  })
}
