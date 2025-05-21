'use client'

import { Form, FormRootError } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormActions } from '@/components/shared/form/FormActions'
import type { FormActionCallback } from '@/types/form'
import { useFormAction } from '@/hooks/useFormAction'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'
import type { AlbumFormSchema } from '@/lib/schemas/album.schema'
import { albumFormSchema } from '@/lib/schemas/album.schema'
import { CustomFileInput } from '@/components/shared/form/inputs/CustomFileInput'

interface Props {
  action: FormActionCallback<AlbumFormSchema>
  defaultValues?: AlbumFormSchema
  artistId: number
}

export function AlbumForm({ action, defaultValues, artistId }: Props) {
  const form = useForm<AlbumFormSchema>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      artistId: artistId,
      cover: undefined,
      musicIds: [],
    },
  })

  const onSubmit = useFormAction(form, action)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <CustomInput
          control={form.control}
          name="title"
          label="Titre"
          placeholder="Mon album"
          required={!albumFormSchema.shape.title.isOptional()}
        />

        <CustomFileInput
          control={form.control}
          name="cover"
          label="Couveture de l'album"
          accept="image/*"
          required={!albumFormSchema.shape.cover.isOptional()}
        />

        <FormRootError />
        <FormActions isEditing={!!defaultValues} />
      </form>
    </Form>
  )
}
