import { z } from 'zod'

export const tryFormSchema = z.object({
  audio: z
    .instanceof(File, { message: 'Veuillez sélectionner un fichier' })
    .refine((file) => ['audio/wav', 'audio/x-wav'].includes(file.type), {
      message: 'Le fichier doit être au format WAV (.wav)',
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: 'Le fichier ne doit pas dépasser 50 Mo',
    }),
})

export type TryFormSchema = z.infer<typeof tryFormSchema>
