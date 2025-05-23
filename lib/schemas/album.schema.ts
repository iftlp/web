import { z } from 'zod'

export const albumFormSchema = z.object({
  title: z
    .string({ required_error: 'Veuillez saisir le titre' })
    .trim()
    .min(1, 'Veuillez saisir le titre')
    .max(255, 'Le titre ne doit pas dépasser 255 caractères'),

  cover: z
    .instanceof(File, { message: 'Veuillez sélectionner un fichier' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Le fichier doit être une image',
    }),

  musicIds: z.array(z.number()),

  artistId: z.number(),
})

export type AlbumFormSchema = z.infer<typeof albumFormSchema>
