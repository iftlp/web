import minioClient from '@/lib/api/minioClient'
import mime from 'mime-types'

export async function getImageFileAction(path: string): Promise<File> {
  try {
    const stream = await minioClient.getObject('shizima', path)

    const chunks: Buffer[] = []

    return await new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const contentType = mime.lookup(path) || 'application/octet-stream'
        const fileName = path.split('/').pop() || 'image'

        // Crée un objet File à partir du buffer
        const file = new File([buffer], fileName, { type: contentType })
        resolve(file)
      })
      stream.on('error', (err) => reject(err))
    })
  } catch (err: any) {
    throw new Error(
      `Erreur lors de la récupération de l'image : ${err.message}`,
    )
  }
}
