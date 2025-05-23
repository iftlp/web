import type { Album } from '@/types/album'
import type { Artist } from '@/types/artist'

export type Music = {
  id: number
  title: string
  album: Album
  artists: Artist[]
  durationInSec: number
  filePath: string
}
