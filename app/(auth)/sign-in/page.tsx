import * as React from 'react'
import { SignInForm } from '@/components/pages/(auth)/sign-in/SignInForm'
import type { SignInSchema } from '@/lib/schemas/auth.schema'
import { signInAction } from '@/lib/actions/auth/sign-in.actions'

export default function Page() {
  async function handleSignIn(values: SignInSchema) {
    'use server'
    return signInAction(values)
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2 text-center w-sm">
        <h1 className="text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground text-sm">
          Entrez votre identifiant et votre mot de passe pour accéder à la
          plateforme
        </p>
      </div>
      <div className="w-sm">
        <SignInForm action={handleSignIn} />
      </div>
    </section>
  )
}
