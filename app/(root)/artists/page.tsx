import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { getSearchParamNumber } from '@/lib/utils/searchParams'
import { ArtistsDataTableWrapper } from '@/components/pages/(root)/artists/ArtistsDataTableWrapper'
import { getAllArtistsAction } from '@/lib/actions/artists/get-all.actions'
import Link from 'next/link'
import { AddButton } from '@/components/shared/button/AddButton'
import { ACTIONS_ROUTES, ROUTES } from '@/constants/routes'

type Props = {
  searchParams: Promise<{ page: string; size: string }>
}

export default async function MusicsPage({ searchParams }: Props) {
  const { page, size } = await searchParams
  const pageIndex = getSearchParamNumber(page, 0)
  const pageSize = getSearchParamNumber(size, 20)
  const artists = await getAllArtistsAction({ pageIndex, pageSize })

  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.ARTIST_PAGE /> Liste des Artistes
      </PageLayout.Title>

      <PageLayout.Actions>
        <Link href={`${ROUTES.ARTIST}${ACTIONS_ROUTES.CREATE}`}>
          <AddButton />
        </Link>
      </PageLayout.Actions>

      <PageLayout.Content>
        <div className="p-4 pt-6">
          <ArtistsDataTableWrapper
            data={artists.items}
            page={pageIndex}
            pageSize={pageSize}
            totalItems={artists.total}
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
