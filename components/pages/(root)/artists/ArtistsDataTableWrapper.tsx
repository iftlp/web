'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { DataTableBackendPaginated } from '@/components/shared/datatable/DataTableBackendPaginated'
import { DataTablePagination } from '@/components/shared/datatable/DataTablePagination'
import { ROUTES } from '@/constants/routes'
import type { Artist } from '@/types/artist'

type Props = {
  data: Artist[]
  page: number
  pageSize: number
  totalItems: number
}

export function ArtistsDataTableWrapper({
  data,
  page,
  pageSize,
  totalItems,
}: Props) {
  const router = useRouter()

  const columns: ColumnDef<Artist>[] = [
    {
      accessorKey: 'name',
      header: 'Artiste',
    },
  ]

  const onClick = (row: Artist) => {
    router.push(`${ROUTES.ARTIST}/${row.id}`)
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
