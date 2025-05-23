'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import type { TryFormSchema } from '@/lib/schemas/try.schema'
import { postRecognize } from '@/services/musics/postRecognize'

export async function recoginizeMusicAction(
  values: TryFormSchema,
): Promise<ReturnFormAction> {
  const response = await postRecognize(values)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à réaliser cette action",
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

  const data = await response.json()

  if (data) {
    redirect(
      `${ROUTES.ARTIST}/${data.album.artist.id}${ROUTES.ALBUM}/${data.album.id}${ROUTES.MUSIC}/${data.id}`,
    )
  }

  return {
    error: '404',
    message: 'Aucune musique trouvée',
  }
}
