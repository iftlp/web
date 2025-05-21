'use server'

import { postArtist } from '@/services/artists/postArtist'
import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export async function createArtistAction(
  values: ArtistFormSchema,
): Promise<ReturnFormAction> {
  const response = await postArtist(values)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à créer un artiste",
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

  redirect(ROUTES.ARTIST)
}
