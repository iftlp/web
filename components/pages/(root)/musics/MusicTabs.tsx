import Link from 'next/link'
import {
  PageTabs,
  PageTabsContent,
  PageTabsList,
  PageTabsTrigger,
} from '@/components/shared/PageTabs'
import type { Music } from '@/types/music'
import { getImageAction } from '@/lib/actions/minio/get-image.actions'
import { MusicPlayer } from '@/components/pages/(root)/musics/MusicPlayer'
import { getAudioAction } from '@/lib/actions/minio/get-audio.actions'

type Props = {
  activeTab: string
  music: Music
}

export async function MusicTabs({ activeTab, music }: Props) {
  const audioBufferBase64 = await getAudioAction(music.filePath)
  const albumCoverBase64 = await getImageAction(music.album.cover)

  return (
    <PageTabs defaultValue={activeTab} className="pt-2">
      <PageTabsList>
        <PageTabsTrigger asChild value="common">
          <Link href={`?tabs=common`}>Informations générales</Link>
        </PageTabsTrigger>
      </PageTabsList>

      <PageTabsContent value="common">
        <MusicPlayer
          music={music}
          albumCover={albumCoverBase64}
          audio={audioBufferBase64}
        />
      </PageTabsContent>
    </PageTabs>
  )
}
