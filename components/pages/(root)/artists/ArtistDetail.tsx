'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import type { Artist } from '@/types/artist'
import type { Album } from '@/types/album'
import { AlbumCarousel } from '@/components/pages/(root)/artists/AlbumCarousel'
import { AlbumMusics } from '@/components/pages/(root)/artists/AlbumMusics'

type Props = {
  artist: Artist
  albums: {
    album: Album
    coverBase64: string
  }[]
  handleDeleteAlbum: (id: number) => Promise<{ message: string } | undefined>
}

export function ArtistDetail({ artist, albums, handleDeleteAlbum }: Props) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)

  useEffect(() => {
    if (albums.length > 0 && !selectedAlbumId) {
      setSelectedAlbumId(albums[0].album.id)
    }
  }, [albums, selectedAlbumId])

  useEffect(() => {
    if (selectedAlbumId) {
      const album =
        albums.find((album) => album.album.id === selectedAlbumId) || null
      setSelectedAlbum(album?.album ?? albums[0].album)
      setSelectedAlbumId(album?.album.id ?? albums[0].album.id)
    } else {
      setSelectedAlbum(null)
    }
  }, [selectedAlbumId, albums])

  return (
    <div className="space-y-6">
      <AlbumCarousel
        albums={albums}
        selectedAlbumId={selectedAlbumId}
        onSelectAlbum={setSelectedAlbumId}
        onDeleteAlbum={handleDeleteAlbum}
        artistId={artist.id}
      />

      {selectedAlbum && (
        <>
          <Separator />
          <AlbumMusics album={selectedAlbum} artistId={artist.id} />
        </>
      )}
    </div>
  )
}
