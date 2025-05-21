import type { LucideIcon } from 'lucide-react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Disc,
  Music,
  Pause,
  Play,
  User,
  Volume1,
  Volume2,
  VolumeOff,
} from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
  MUSIC_PAGE: Music,
  ADMIN_PAGE: User,
  ARTIST_PAGE: User,
  TRY_PAGE: Disc,

  DATATABLE_NEXTPAGE: ChevronRightIcon,
  DATATABLE_PREVPAGE: ChevronLeftIcon,
  DATATABLE_FIRSTPAGE: ChevronsLeftIcon,
  DATATABLE_LASTPAGE: ChevronsRightIcon,

  MUSIC_DETAIL_PLAY: Play,
  MUSIC_DETAIL_PAUSE: Pause,
  MUSIC_DETAIL_DISC: Disc,
  MUSIC_DETAIL_SOUND_OFF: VolumeOff,
  MUSIC_DETAIL_SOUND_LOW: Volume1,
  MUSIC_DETAIL_SOUND_HIGH: Volume2,
}
