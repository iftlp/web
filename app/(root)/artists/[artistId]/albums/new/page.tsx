import { AlbumForm } from '@/components/pages/(root)/album/AlbumForm'
import { createAlbumAction } from '@/lib/actions/albums/create.actions'
import { PageLayout } from '@/components/shared/PageLayout'

type Props = {
  params: Promise<{ artistId: string }>
}

export default async function NewAlbumPage({ params }: Props) {
  const { artistId } = await params
  return (
    <PageLayout.Root>
      <PageLayout.Title>Créer un album</PageLayout.Title>

      <PageLayout.Content>
        <div className="flex flex-col gap-4 p-4">
          <AlbumForm action={createAlbumAction} artistId={Number(artistId)} />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
