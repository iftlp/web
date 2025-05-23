import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { DeleteButton } from '@/components/shared/button/DeleteButton'
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal'
import { MusicTabs } from '@/components/pages/(root)/musics/MusicTabs'
import { getMusicByIdAction } from '@/lib/actions/musics/get-by-id.actions'
import { deleteMusicAction } from '@/lib/actions/musics/delete.actions'

type Props = {
  params: Promise<{ musicId: string; artistId: string }>
  searchParams: Promise<{ tabs: string }>
}

export const dynamic = 'force-dynamic'

export default async function MusicDetailPage({ searchParams, params }: Props) {
  const { musicId, artistId } = await params
  const { tabs } = await searchParams

  const music = await getMusicByIdAction(Number(musicId))

  const activeTab = tabs ? tabs : 'common'

  const handleDelete = async (id: number) => {
    'use server'
    return deleteMusicAction(id, Number(artistId))
  }

  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.MUSIC_PAGE /> {music.title}
      </PageLayout.Title>

      <PageLayout.Actions>
        <DeleteConfirmationModal
          deleteId={music.id}
          action={handleDelete}
          description={`Souhaitez-vous vraiment supprimer la musique ${music.title} ?`}
        >
          <DeleteButton />
        </DeleteConfirmationModal>
      </PageLayout.Actions>

      <PageLayout.Content>
        <MusicTabs activeTab={activeTab} music={music} />
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
