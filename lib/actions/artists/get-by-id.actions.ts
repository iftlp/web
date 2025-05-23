'use server'

import type { Artist } from '@/types/artist'
import { getArtistById } from '@/services/artists/getById'

export async function getArtistByIdAction(id: number): Promise<Artist> {
  const response = await getArtistById(id)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
