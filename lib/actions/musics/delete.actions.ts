'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { deleteMusic } from '@/services/musics/deleteMusic'

export async function deleteMusicAction(
  id: number,
  artistId: number,
): Promise<ReturnFormAction> {
  const response = await deleteMusic(id)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à supprimer une musique",
        }
      case 400:
        return {
          error: '400',
          message: 'Les données envoyées sont invalides',
        }
      case 404:
        return {
          error: '404',
          message: "La musique n'a pas été trouvée",
        }
      default:
        return {
          error: 'UNKNOWN',
          message: `Une erreur est survenue (${response.status})`,
        }
    }
  }

  redirect(`${ROUTES.ARTIST}/${artistId}`)
}
