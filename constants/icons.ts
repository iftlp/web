import type { LucideIcon } from 'lucide-react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Home,
  Music,
  User,
} from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
  HOME_PAGE: Home,
  MUSIC_PAGE: Music,
  ADMIN_PAGE: User,

  DATATABLE_NEXTPAGE: ChevronRightIcon,
  DATATABLE_PREVPAGE: ChevronLeftIcon,
  DATATABLE_FIRSTPAGE: ChevronsLeftIcon,
  DATATABLE_LASTPAGE: ChevronsRightIcon,
}
