'use server'

import type { Music } from '@/types/music'
import { getMusicById } from '@/services/musics/getById'

export async function getMusicByIdAction(id: number): Promise<Music> {
  const response = await getMusicById(id)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
