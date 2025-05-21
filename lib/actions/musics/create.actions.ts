'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import type { MusicFormSchema } from '@/lib/schemas/music.schema'
import { postMusic } from '@/services/musics/postMusic'

export async function createMusicAction(
  values: MusicFormSchema,
): Promise<ReturnFormAction> {
  const response = await postMusic(values)
  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à créer une musique",
        }
      case 400:
        return {
          error: '400',
          message: 'Les données envoyées sont invalides',
        }
      default:
        return {
          error: 'UNKNOWN',
          message: `Une erreur est survenue (${response.status})`,
        }
    }
  }

  redirect(`${ROUTES.ARTIST}/${values.artists[0]}`)
}
