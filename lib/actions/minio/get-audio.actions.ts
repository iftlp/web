import minioClient from '@/lib/api/minioClient'
import mime from 'mime-types'

export async function getAudioAction(path: string): Promise<string> {
  try {
    const stream = await minioClient.getObject('shizima', path)

    const chunks: Buffer[] = []

    return await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('end', () => {
        const audioBuffer = Buffer.concat(chunks)
        const contentType = mime.lookup(path) || 'application/octet-stream'
        const base64 = audioBuffer.toString('base64')
        const base64Url = `data:${contentType};base64,${base64}`
        resolve(base64Url)
      })
      stream.on('error', (err) => reject(err))
    })
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du fichier audio`)
  }
}
