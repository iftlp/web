'use client'

import type { FormActionCallback } from '@/types/form'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signInSchema } from '@/lib/schemas/auth.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormAction } from '@/components/shared/form/useFormAction'
import { CustomInput } from '@/components/shared/form/inputs/CustomInput'
import { Form, FormRootError } from '@/components/ui/form'
import { SubmitButton } from '@/components/shared/form/SubmitButton'

interface Props {
  action: FormActionCallback<SignInSchema>
}

export function SignInForm({ action }: Props) {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
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
          name="email"
          label="Adresse email"
          placeholder="user@example.com"
          disabled={form.formState.isSubmitting}
          inputProps={{
            autoCapitalize: 'none',
            autoComplete: 'email',
            autoCorrect: 'off',
          }}
        />

        <CustomInput
          control={form.control}
          name="password"
          label="Mot de passe"
          placeholder="••••••••••••"
          type="password"
          disabled={form.formState.isSubmitting}
          inputProps={{
            autoComplete: 'current-password',
            autoCorrect: 'off',
          }}
        />

        <FormRootError />
        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          className="mt-4"
        >
          Se connecter
        </SubmitButton>
      </form>
    </Form>
  )
}
