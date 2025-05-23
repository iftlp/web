'use server'

import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function postArtist(values: ArtistFormSchema) {
  return fetch(getApiUrl(`artist`), {
    method: 'POST',
    headers: {
      ...(await getAuthorizationHeader()),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
    }),
  })
}
