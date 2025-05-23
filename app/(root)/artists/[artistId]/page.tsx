import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { DeleteButton } from '@/components/shared/button/DeleteButton'
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal'
import { getArtistByIdAction } from '@/lib/actions/artists/get-by-id.actions'
import { deleteArtistAction } from '@/lib/actions/artists/delete.actions'
import { EditButton } from '@/components/shared/button/EditButton'
import { ACTIONS_ROUTES, ROUTES } from '@/constants/routes'
import { ArtistTabs } from '@/components/pages/(root)/artists/ArtistTabs'

type Props = {
  params: Promise<{ artistId: string }>
  searchParams: Promise<{ tabs: string }>
}

export default async function ArtistDetailPage({
  searchParams,
  params,
}: Props) {
  const { artistId } = await params
  const { tabs } = await searchParams
  const artist = await getArtistByIdAction(Number(artistId))

  const activeTab = tabs ? tabs : 'common'

  const handleDelete = async (id: number) => {
    'use server'
    return deleteArtistAction(id)
  }

  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.ARTIST_PAGE /> {artist.name}
      </PageLayout.Title>

      <PageLayout.Actions>
        <EditButton
          href={`${ROUTES.ARTIST}/${artistId}${ACTIONS_ROUTES.UPDATE}`}
        />
        <DeleteConfirmationModal
          deleteId={artist.id}
          action={handleDelete}
          description={`Souhaitez-vous vraiment supprimer l'artiste ${artist.name} ?`}
        >
          <DeleteButton />
        </DeleteConfirmationModal>
      </PageLayout.Actions>

      <PageLayout.Content>
        <ArtistTabs activeTab={activeTab} artistId={artist.id} />
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
