import { PageLayout } from '@/components/shared/PageLayout'
import { ICONS } from '@/constants/icons'
import { TryForm } from '@/components/pages/(root)/try/TryForm'
import { recoginizeMusicAction } from '@/lib/actions/musics/recognize.actions'

export default async function TryPage() {
  return (
    <PageLayout.Root>
      <PageLayout.Title>
        <ICONS.TRY_PAGE /> Essayer l'algorithme
      </PageLayout.Title>

      <PageLayout.Content>
        <div className="p-4 pt-6">
          <TryForm action={recoginizeMusicAction} />
        </div>
      </PageLayout.Content>
    </PageLayout.Root>
  )
}
