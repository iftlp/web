'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { deleteAlbum } from '@/services/albums/deleteAlbum'

export async function deleteAlbumAction(
  id: number,
  artistId: number,
): Promise<ReturnFormAction> {
  const response = await deleteAlbum(id)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à supprimer un album",
        }
      case 400:
        return {
          error: '400',
          message: 'Les données envoyées sont invalides',
        }
      case 404:
        return {
          error: '404',
          message: "L'album n'a pas été trouvé",
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
