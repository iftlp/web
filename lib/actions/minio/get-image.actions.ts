import minioClient from '@/lib/api/minioClient'
import mime from 'mime-types'

export async function getImageAction(path: string): Promise<string> {
  try {
    const stream = await minioClient.getObject('shizima', path)

    const chunks: Buffer[] = []

    return await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('end', () => {
        const imageBuffer = Buffer.concat(chunks)
        const contentType = mime.lookup(path) || 'application/octet-stream'
        const base64 = imageBuffer.toString('base64')
        const base64Url = `data:${contentType};base64,${base64}`
        resolve(base64Url)
      })
      stream.on('error', (err) => reject(err))
    })
  } catch (err: any) {
    throw new Error(
      `Erreur lors de la récupération de l'image : ${err.message}`,
    )
  }
}
