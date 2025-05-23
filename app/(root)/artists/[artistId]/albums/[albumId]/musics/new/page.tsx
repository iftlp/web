import { PageLayout } from '@/components/shared/PageLayout'
import { MusicForm } from '@/components/pages/(root)/musics/MusicForm'
import { createMusicAction } from '@/lib/actions/musics/create.actions'

type Props = {
  params: Promise<{ artistId: string; albumId: string }>
}

export const dynamic = 'force-dynamic'

export default async function NewMusicPage({ params }: Props) {
  const { artistId, albumId } = await params

  return (
    <PageLayout.Root>
      <PageLayout.Title>Créer une musique</PageLayout.Title>

      <PageLayout.Content>
        <div className="flex flex-col gap-4 p-4">
          <MusicForm
            action={createMusicAction}
            artistId={Number(artistId)}
            albumId={Number(albumId)}
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
