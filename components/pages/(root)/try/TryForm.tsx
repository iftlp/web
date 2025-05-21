'use client'

import { Form, FormRootError } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormActions } from '@/components/shared/form/FormActions'
import type { FormActionCallback } from '@/types/form'
import { CustomFileInput } from '@/components/shared/form/inputs/CustomFileInput'
import type { TryFormSchema } from '@/lib/schemas/try.schema'
import { tryFormSchema } from '@/lib/schemas/try.schema'
import { useFormAction } from '@/hooks/useFormAction'

interface Props {
  action: FormActionCallback<TryFormSchema>
  defaultValues?: TryFormSchema
}

export function TryForm({ action, defaultValues }: Props) {
  const form = useForm<TryFormSchema>({
    resolver: zodResolver(tryFormSchema),
    defaultValues: defaultValues ?? {
      audio: undefined,
    },
  })

  const onSubmit = useFormAction(form, action)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <CustomFileInput
          control={form.control}
          name="audio"
          label="Audio de la musique"
          accept="audio/wav,x-wav"
          description="Formats supportés : .wav uniquement"
          required={!tryFormSchema.shape.audio.isOptional()}
        />

        <FormRootError />
        <FormActions isEditing={!!defaultValues} />
      </form>
    </Form>
  )
}
