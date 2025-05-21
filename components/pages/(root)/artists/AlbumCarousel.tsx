'use client'

import type React from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Album } from '@/types/album'
import Link from 'next/link'
import { ACTIONS_ROUTES, ROUTES } from '@/constants/routes'
import { AddButton } from '@/components/shared/button/AddButton'
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal'

type Props = {
  albums: {
    album: Album
    coverBase64: string
  }[]
  selectedAlbumId: number | null
  onSelectAlbum: (albumId: number) => void
  artistId: number
  onDeleteAlbum: (id: number) => Promise<{ message: string } | undefined>
}

export function AlbumCarousel({
  albums,
  selectedAlbumId,
  onSelectAlbum,
  artistId,
  onDeleteAlbum,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Albums</h2>

      <div className="absolute right-0 top-0 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollRight}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Link
          href={`${ROUTES.ARTIST}/${artistId}${ROUTES.ALBUM}${ACTIONS_ROUTES.CREATE}`}
          className="ml-4"
        >
          <AddButton />
        </Link>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-6 pt-1 px-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {albums.length === 0 && <span>Aucun album trouvé</span>}
        {albums.map((album) => (
          <div
            key={album.album.id}
            className={`relative flex-shrink-0 w-48 aspect-square cursor-pointer group rounded-md overflow-hidden transition ring-offset-2 ${
              selectedAlbumId === album.album.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectAlbum(album.album.id)}
          >
            <Image
              src={album.coverBase64 || '/placeholder.svg'}
              alt={`Couverture de ${album.album.title}`}
              fill
              className="object-cover"
            />

            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/*<Link*/}
              {/*  href={`${ROUTES.ARTIST}/${artistId}${ROUTES.ALBUM}/${album.album.id}${ACTIONS_ROUTES.UPDATE}`}*/}
              {/*  onClick={(e) => e.stopPropagation()}*/}
              {/*>*/}
              {/*  <Button*/}
              {/*    variant="secondary"*/}
              {/*    size="icon"*/}
              {/*    className="h-7 w-7 bg-white/80 hover:bg-white/90 backdrop-blur-sm"*/}
              {/*  >*/}
              {/*    <Settings className="h-3.5 w-3.5 text-gray-700" />*/}
              {/*  </Button>*/}
              {/*</Link>*/}
              <DeleteConfirmationModal
                deleteId={album.album.id}
                action={onDeleteAlbum}
                description={`Souhaitez-vous vraiment supprimer l'album ${album.album.title} ?`}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-7 w-7 bg-white/80 hover:bg-white/90 hover:text-red-600 backdrop-blur-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 text-gray-700" />
                </Button>
              </DeleteConfirmationModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
