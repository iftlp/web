'use server'

import type { Pagination } from '@/types/pagination'
import type { Paginated } from '@/types/paginated'
import type { Artist } from '@/types/artist'
import { getAllArtists } from '@/services/artists/getAll'

export async function getAllArtistsAction(
  pagination: Pagination,
): Promise<Paginated<Artist>> {
  const response = await getAllArtists(pagination)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
  }

  const total = response.headers.get('x-pagination-total')
  const index = response.headers.get('x-pagination-index')
  const size = response.headers.get('x-pagination-size')
  const items = await response.json()

  return {
    items,
    total: Number(total),
    index: Number(index),
    size: Number(size),
  }
}
