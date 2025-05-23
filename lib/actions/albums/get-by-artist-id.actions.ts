'use server'

import { getAlbumsByArtistId } from '@/services/albums/getByArtistId'
import type { Album } from '@/types/album'

export async function getAlbumsByArtistIdAction(id: number): Promise<Album[]> {
  const response = await getAlbumsByArtistId(id)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
