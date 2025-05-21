'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { useRouter } from 'next/navigation'
import type { Album } from '@/types/album'
import type { Music } from '@/types/music'
import Link from 'next/link'
import { AddButton } from '@/components/shared/button/AddButton'
import { ACTIONS_ROUTES, ROUTES } from '@/constants/routes'

type Props = {
  album: Album
  artistId: number
}

export function AlbumMusics({ album, artistId }: Props) {
  const router = useRouter()

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const columns: ColumnDef<Music>[] = [
    {
      accessorKey: 'title',
      header: 'Titre',
      enableGlobalFilter: true,
    },
    {
      accessorKey: 'durationInSec',
      header: 'Durée',
      cell: ({ row }) => formatDuration(row.original.durationInSec),
    },
  ]

  const table = useReactTable({
    data: album.musics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleClick = (row: Music) => {
    router.push(
      `${ROUTES.ARTIST}/${artistId}${ROUTES.ALBUM}/${album.id}${ROUTES.MUSIC}/${row.id}`,
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Titres de {album.title}</h2>
        <Link
          href={`${ROUTES.ARTIST}/${artistId}${ROUTES.ALBUM}/${album.id}${ROUTES.MUSIC}${ACTIONS_ROUTES.CREATE}`}
        >
          <AddButton />
        </Link>
      </div>

      <DataTable table={table} columns={columns} onClick={handleClick} />
    </div>
  )
}
