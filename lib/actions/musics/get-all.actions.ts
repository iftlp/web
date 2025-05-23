'use server'

import type { Music } from '@/types/music'
import { getAllMusics } from '@/services/musics/getAll'
import type { Pagination } from '@/types/pagination'
import type { Paginated } from '@/types/paginated'

export async function getAllMusicsAction(
  pagination: Pagination,
): Promise<Paginated<Music>> {
  const response = await getAllMusics(pagination)

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
