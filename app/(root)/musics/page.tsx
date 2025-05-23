import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { getAllMusicsAction } from '@/lib/actions/musics/get-all.actions'
import { MusicsDataTableWrapper } from '@/components/pages/(root)/musics/MusicsDataTableWrapper'
import { getSearchParamNumber } from '@/lib/utils/searchParams'

type Props = {
  searchParams: Promise<{ page: string; size: string }>
}

export const dynamic = 'force-dynamic'

export default async function MusicsPage({ searchParams }: Props) {
  const { page, size } = await searchParams
  const pageIndex = getSearchParamNumber(page, 0)
  const pageSize = getSearchParamNumber(size, 20)
  const musics = await getAllMusicsAction({ pageIndex, pageSize })

  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.MUSIC_PAGE /> Liste des musiques
      </PageLayout.Title>

      <PageLayout.Content>
        <div className="p-4 pt-6">
          <MusicsDataTableWrapper
            data={musics.items}
            page={pageIndex}
            pageSize={pageSize}
            totalItems={musics.total}
          />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
