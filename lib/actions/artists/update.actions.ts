'use server'

import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { putArtist } from '@/services/artists/putArtist'
import { ROUTES } from '@/constants/routes'

export async function updateArtistAction(
  values: ArtistFormSchema,
  id: number,
): Promise<ReturnFormAction> {
  const response = await putArtist(values, id)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à modifier un artiste",
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

  redirect(`${ROUTES.ARTIST}/${id}`)
}
