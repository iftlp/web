import Link from 'next/link'
import {
  PageTabs,
  PageTabsContent,
  PageTabsList,
  PageTabsTrigger,
} from '@/components/shared/PageTabs'
import { ArtistDetail } from '@/components/pages/(root)/artists/ArtistDetail'
import { getArtistByIdAction } from '@/lib/actions/artists/get-by-id.actions'
import { getAlbumsByArtistIdAction } from '@/lib/actions/albums/get-by-artist-id.actions'
import type { Album } from '@/types/album'
import { getImageAction } from '@/lib/actions/minio/get-image.actions'
import { deleteAlbumAction } from '@/lib/actions/albums/delete.actions'

type Props = {
  artistId: number
  activeTab: string
}

export async function ArtistTabs({ activeTab, artistId }: Props) {
  const artist = await getArtistByIdAction(artistId)
  const albums = await getAlbumsByArtistIdAction(artistId)
  const albumsWithCover = await Promise.all(
    albums.map(async (album: Album) => {
      return {
        album,
        coverBase64: await getImageAction(album.cover),
      }
    }),
  )

  const handleDeleteAlbum = async (id: number) => {
    'use server'
    return deleteAlbumAction(id, artistId)
  }

  return (
    <PageTabs defaultValue={activeTab} className="pt-2">
      <PageTabsList>
        <PageTabsTrigger asChild value="common">
          <Link href={`?tabs=common`}>Informations générales</Link>
        </PageTabsTrigger>
      </PageTabsList>

      <PageTabsContent value="common">
        <ArtistDetail
          artist={artist}
          albums={albumsWithCover}
          handleDeleteAlbum={handleDeleteAlbum}
        />
      </PageTabsContent>
    </PageTabs>
  )
}
