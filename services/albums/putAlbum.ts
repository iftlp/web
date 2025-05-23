'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'
import type { AlbumFormSchema } from '@/lib/schemas/album.schema'

export async function putAlbum(values: AlbumFormSchema, id: number) {
  const formData = new FormData()
  formData.append('Album.Title', values.title)
  formData.append('Cover', values.cover)
  formData.append('Album.ArtistId', values.artistId.toString())

  if (values.musicIds.length > 0) {
    values.musicIds.forEach((id) => {
      formData.append('Album.MusicIds', id.toString())
    })
  }

  return fetch(getApiUrl(`album/${id}`), {
    method: 'PUT',
    headers: {
      ...(await getAuthorizationHeader()),
    },
    body: formData,
  })
}
