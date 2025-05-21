import type { SidebarLinkType } from '@/types/sidebar'
import { ICONS } from '@/constants/icons'
import { PAGE_NAMES } from '@/constants/pages'

export const ROUTES: Record<string, string> = {
  SIGN_IN: '/sign-in',
  ROOT: '/',
  MUSIC: '/musics',
  ADMIN: '/admins',
  ARTIST: '/artists',
  ALBUM: '/albums',
  TRY: '/try',
}

export const ACTIONS_ROUTES: Record<string, string> = {
  UPDATE: '/edit',
  CREATE: '/new',
}

export const PUBLIC_ROUTES: string[] = [ROUTES.SIGN_IN]

export const SIDEBAR_LINKS: SidebarLinkType[] = [
  {
    name: PAGE_NAMES.ARTIST,
    url: ROUTES.ARTIST,
    icon: ICONS.ARTIST_PAGE,
  },
  {
    name: PAGE_NAMES.MUSIC,
    url: ROUTES.MUSIC,
    icon: ICONS.MUSIC_PAGE,
  },
  {
    name: PAGE_NAMES.TRY,
    url: ROUTES.TRY,
    icon: ICONS.TRY_PAGE,
  },
]
