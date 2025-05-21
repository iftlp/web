import { z } from 'zod'

export const musicFormSchema = z.object({
  title: z
    .string({ required_error: 'Veuillez saisir le titre' })
    .trim()
    .min(1, 'Veuillez saisir le titre')
    .max(255, 'Le titre ne doit pas dépasser 255 caractères'),

  audio: z
    .instanceof(File, { message: 'Veuillez sélectionner un fichier' })
    .refine((file) => ['audio/wav', 'audio/x-wav'].includes(file.type), {
      message: 'Le fichier doit être au format WAV (.wav)',
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: 'Le fichier ne doit pas dépasser 50 Mo',
    }),

  artists: z.array(z.number()),

  albumId: z.number(),

  duration: z.number(),
})

export type MusicFormSchema = z.infer<typeof musicFormSchema>
