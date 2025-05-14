import Link from 'next/link'
import {
  PageTabs,
  PageTabsContent,
  PageTabsList,
  PageTabsTrigger,
} from '@/components/shared/PageTabs'

type Props = {
  activeTab: string
}

export default function Tabs({ activeTab }: Props) {
  return (
    <PageTabs defaultValue={activeTab} className="pt-2">
      <PageTabsList>
        <PageTabsTrigger asChild value="1">
          <Link href={`?tabs=1`}>Tab 1</Link>
        </PageTabsTrigger>
        <PageTabsTrigger asChild value="2">
          <Link href={`?tabs=2`}>Tab 2</Link>
        </PageTabsTrigger>
      </PageTabsList>

      <PageTabsContent value="1">Content Tab 1</PageTabsContent>

      <PageTabsContent value="2">Content Tab 2</PageTabsContent>
    </PageTabs>
  )
}
