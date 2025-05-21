'use client'

import { Form, FormRootError } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormActions } from '@/components/shared/form/FormActions'
import type { FormActionCallback } from '@/types/form'
import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import { artistFormSchema } from '@/lib/schemas/artist.schema'
import { useFormAction } from '@/hooks/useFormAction'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'

interface Props {
  action: FormActionCallback<ArtistFormSchema>
  defaultValues?: ArtistFormSchema
}

export function ArtistForm({ action, defaultValues }: Props) {
  const form = useForm<ArtistFormSchema>({
    resolver: zodResolver(artistFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
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
          name="name"
          label="Nom"
          placeholder="Gims"
          required={!artistFormSchema.shape.name.isOptional()}
        />

        <FormRootError />
        <FormActions isEditing={!!defaultValues} />
      </form>
    </Form>
  )
}
