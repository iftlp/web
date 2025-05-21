'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'
import type { MusicFormSchema } from '@/lib/schemas/music.schema'

export async function postMusic(values: MusicFormSchema) {
  const formData = new FormData()
  formData.append('Music.Title', values.title)
  formData.append('AudioFile', values.audio)
  formData.append('Music.DurationInSec', values.duration.toString())
  values.artists.forEach((artistId) =>
    formData.append('Music.Artists', artistId.toString()),
  )
  formData.append('Music.AlbumId', values.albumId.toString())

  return fetch(getApiUrl(`music`), {
    method: 'POST',
    headers: {
      ...(await getAuthorizationHeader()),
    },
    body: formData,
  })
}
