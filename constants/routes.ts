import type { SidebarLinkType } from '@/types/sidebar'
import { ICONS } from '@/constants/icons'
import { PAGE_NAMES } from '@/constants/pages'

export const ROUTES: Record<string, string> = {
  SIGN_IN: '/sign-in',
  ROOT: '/',
  MUSIC: '/musics',
  ADMIN: '/admins',
}

export const PUBLIC_ROUTES: string[] = [ROUTES.SIGN_IN]

export const SIDEBAR_LINKS: SidebarLinkType[] = [
  {
    name: PAGE_NAMES.HOME,
    url: ROUTES.ROOT,
    icon: ICONS.HOME_PAGE,
  },
  {
    name: PAGE_NAMES.MUSIC,
    url: ROUTES.MUSIC,
    icon: ICONS.MUSIC_PAGE,
  },
  {
    name: PAGE_NAMES.ADMIN,
    url: ROUTES.ADMIN,
    icon: ICONS.ADMIN_PAGE,
  },
]
