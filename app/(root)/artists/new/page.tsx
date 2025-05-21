import { createArtistAction } from '@/lib/actions/artists/create.actions'
import { ArtistForm } from '@/components/pages/(root)/artists/ArtistForm'
import { PageLayout } from '@/components/shared/PageLayout'

export default async function NewArtistPage() {
  return (
    <PageLayout.Root>
      <PageLayout.Title>Créer un Artiste</PageLayout.Title>

      <PageLayout.Content>
        <div className="flex flex-col gap-4 p-4">
          <ArtistForm action={createArtistAction} />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
