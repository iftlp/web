'use server'

import type { ReturnFormAction } from '@/types/form'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import type { AlbumFormSchema } from '@/lib/schemas/album.schema'
import { putAlbum } from '@/services/albums/putAlbum'

export async function updateAlbumAction(
  values: AlbumFormSchema,
  id: number,
): Promise<ReturnFormAction> {
  const response = await putAlbum(values, id)

  if (!response.ok) {
    switch (response.status) {
      case 401:
        return {
          error: '401',
          message: "Vous n'êtes pas autorisé à modifier un album",
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

  redirect(`${ROUTES.ARTIST}/${values.artistId}`)
}
