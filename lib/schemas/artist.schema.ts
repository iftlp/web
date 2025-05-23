import { z } from 'zod'

export const artistFormSchema = z.object({
  name: z
    .string({ required_error: 'Veuillez saisir le nom' })
    .trim()
    .min(1, 'Veuillez saisir le nom')
    .max(255, 'Le nom ne doit pas dépasser 255 caractères'),
})

export type ArtistFormSchema = z.infer<typeof artistFormSchema>
