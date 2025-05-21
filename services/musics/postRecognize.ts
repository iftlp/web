'use server'

import { getApiUrl } from '@/lib/api/getApiUrl'
import { getAuthorizationHeader } from '@/lib/api/getAuthorizationHeader'
import type { TryFormSchema } from '@/lib/schemas/try.schema'

export async function postRecognize(values: TryFormSchema) {
  const formData = new FormData()
  formData.append('AudioFile', values.audio)

  return fetch(getApiUrl(`recognition/wavFile`), {
    method: 'POST',
    headers: {
      ...(await getAuthorizationHeader()),
    },
    body: formData,
  })
}
