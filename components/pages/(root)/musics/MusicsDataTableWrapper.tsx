'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import type { Music } from '@/types/music'
import { ROUTES } from '@/constants/routes'

type Props = {
  data: Music[]
  page: number
  pageSize: number
  totalItems: number
}

export function MusicsDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
}: Props) {
  const router = useRouter()

  const columns: ColumnDef<Music>[] = [
    {
      accessorKey: 'title',
      header: 'Titre',
    },
    {
      accessorKey: 'album.title',
      header: 'Album',
    },
  ]

  const onClick = (row: Music) => {
    router.push(
      `${ROUTES.ARTIST}/${row.album.artist.id}${ROUTES.ALBUM}/${row.album.id}${ROUTES.MUSIC}/${row.id}`,
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTableBackendPaginated
        columns={columns}
        data={data}
        onClick={onClick}
      />
      <DataTablePagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
