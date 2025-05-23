import minioClient from '@/lib/api/minioClient'
import mime from 'mime-types'

export async function getImageFileAction(path: string): Promise<File> {
  try {
    const stream = await minioClient.getObject('shizima', path)

    const chunks: Buffer[] = []

    return await new Promise((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => chunks.push(chunk))

      stream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const contentType = mime.lookup(path) || 'application/octet-stream'
        const fileName = path.split('/').pop() || 'image'

        const file = new File([buffer], fileName, { type: contentType })
        resolve(file)
      })

      stream.on('error', (err: Error) => {
        reject(err)
      })
    })
  } catch (err) {
    const e = err as Error
    throw new Error(`Erreur lors de la récupération de l'image : ${e.message}`)
  }
}
