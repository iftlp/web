'use client'

import { Form, FormRootError } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormActions } from '@/components/shared/form/FormActions'
import type { FormActionCallback } from '@/types/form'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'
import { CustomFileInput } from '@/components/shared/form/inputs/CustomFileInput'
import type { MusicFormSchema } from '@/lib/schemas/music.schema'
import { musicFormSchema } from '@/lib/schemas/music.schema'
import { getAudioDuration } from '@/lib/utils/getAudioDuration'

interface Props {
  action: FormActionCallback<MusicFormSchema>
  defaultValues?: MusicFormSchema
  artistId: number
  albumId: number
}

export function MusicForm({ action, defaultValues, artistId, albumId }: Props) {
  const form = useForm<MusicFormSchema>({
    resolver: zodResolver(musicFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      artists: [artistId],
      audio: undefined,
      albumId: albumId,
      duration: 0,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    console.log('ici')
    if (values.audio) {
      console.log('ici 2')
      try {
        const duration = await getAudioDuration(values.audio)
        await action({ ...values, duration })
      } catch (error) {
        form.setError('audio', {
          type: 'manual',
          message: 'Impossible de lire le fichier audio',
        })
      }
    } else {
      await action(values)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <CustomInput
          control={form.control}
          name="title"
          label="Titre"
          placeholder="Mon titre de musique"
          required={!musicFormSchema.shape.title.isOptional()}
        />

        <CustomFileInput
          control={form.control}
          name="audio"
          label="Audio de la musique"
          accept="audio/wav,x-wav"
          description="Formats supportés : .wav uniquement"
          required={!musicFormSchema.shape.audio.isOptional()}
        />

        <FormRootError />
        <FormActions isEditing={!!defaultValues} />
      </form>
    </Form>
  )
}
