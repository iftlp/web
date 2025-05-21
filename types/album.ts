import type { Music } from '@/types/music'

export type Album = {
  id: number
  title: string
  cover: string
  musics: Music[]
  artist: {
    id: number
    name: string
  }
}
