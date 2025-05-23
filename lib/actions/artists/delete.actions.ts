'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { deleteArtist } from '@/services/artists/deleteArtist'
import { ROUTES } from '@/constants/routes'

export async function deleteArtistAction(
  id: number,
): Promise<ReturnFormAction> {
  const response = await deleteArtist(id)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à supprimer un artiste",
        }
      case 400:
        return {
          error: '400',
          message: 'Les données envoyées sont invalides',
        }
      case 404:
        return {
          error: '404',
          message: "L'artiste n'a pas été trouvé",
        }
      default:
        return {
          error: 'UNKNOWN',
          message: `Une erreur est survenue (${response.status})`,
        }
    }
  }

  redirect(ROUTES.ARTIST)
}
