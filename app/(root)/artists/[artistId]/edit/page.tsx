import { ArtistForm } from '@/components/pages/(root)/artists/ArtistForm'
import { getArtistByIdAction } from '@/lib/actions/artists/get-by-id.actions'
import { updateArtistAction } from '@/lib/actions/artists/update.actions'
import type { ArtistFormSchema } from '@/lib/schemas/artist.schema'
import { PageLayout } from '@/components/shared/PageLayout'

type Props = {
  params: Promise<{ artistId: string }>
}

export const dynamic = 'force-dynamic'

export default async function EditArtistPage({ params }: Props) {
  const { artistId } = await params
  const artist = await getArtistByIdAction(Number(artistId))

  const handleUpdate = async (values: ArtistFormSchema) => {
    'use server'
    return updateArtistAction(values, Number(artistId))
  }

  return (
    <PageLayout.Root>
      <PageLayout.Title>Modifier un Artiste</PageLayout.Title>

      <PageLayout.Content>
        <div className="flex flex-col gap-4 p-4">
          <ArtistForm
            action={handleUpdate}
            defaultValues={{ name: artist.name }}
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
