'use server'

import type { Pagination } from '@/types/pagination'
import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'

export async function getAllArtists(pagination: Pagination) {
  const url = new URL(getApiUrl('artist/all'))
  const params = new URLSearchParams()

  params.append('pageIndex', String(pagination.pageIndex))
  params.append('pageSize', String(pagination.pageSize))
  url.search = params.toString()

  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...(await getAuthorizationHeader()),
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  })
}
