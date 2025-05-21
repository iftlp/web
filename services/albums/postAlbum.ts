'use server'

import type { AlbumFormSchema } from '@/lib/schemas/album.schema'
import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function postAlbum(values: AlbumFormSchema) {
  const formData = new FormData()
  formData.append('Album.Title', values.title)
  formData.append('Cover', values.cover)
  formData.append('Album.ArtistId', values.artistId.toString())

  return fetch(getApiUrl(`album`), {
    method: 'POST',
    headers: {
      ...(await getAuthorizationHeader()),
    },
    body: formData,
  })
}
