'use server'

import type { Album } from '@/types/album'
import { getAlbumById } from '@/services/albums/getById'

export async function getAlbumByIdAction(id: number): Promise<Album> {
  const response = await getAlbumById(id)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
