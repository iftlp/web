import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import Tabs from '@/components/pages/(root)/example/Tabs'

type Props = {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function ExamplePage({ searchParams }: Props) {
  const activeTab =
    typeof searchParams.tabs === 'string' ? searchParams.tabs : '1'

  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.ADMIN_PAGE /> Administrateur
      </PageLayout.Title>

      <PageLayout.Content>
        <Tabs activeTab={activeTab} />
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
