import { ROUTES } from '@/constants/routes'
import { PAGE_NAMES } from '@/constants/pages'

export const BREADCRUMBS = {
  [ROUTES.HOME]: PAGE_NAMES.HOME,
  [ROUTES.MUSIC]: PAGE_NAMES.MUSIC,
  [ROUTES.ADMIN]: PAGE_NAMES.ADMIN,
  [ROUTES.ALBUM]: PAGE_NAMES.ALBUM,
  [ROUTES.ARTIST]: PAGE_NAMES.ARTIST,
  [ROUTES.TRY]: PAGE_NAMES.TRY,
  ['edit']: 'Modifier',
  ['new']: 'Créer',
}
