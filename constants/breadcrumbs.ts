import { ROUTES } from '@/constants/routes'
import { PAGE_NAMES } from '@/constants/pages'

export const BREADCRUMBS = {
  [ROUTES.HOME]: PAGE_NAMES.HOME,
  [ROUTES.MUSIC]: PAGE_NAMES.MUSIC,
  [ROUTES.ADMIN]: PAGE_NAMES.ADMIN,
  ['edit']: 'Modifier',
  ['new']: 'Créer',
}
