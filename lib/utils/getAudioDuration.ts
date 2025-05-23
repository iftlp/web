export function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = document.createElement('audio')
    audio.preload = 'metadata'

    audio.onloadedmetadata = () => {
      resolve(Math.floor(audio.duration))
      URL.revokeObjectURL(audio.src)
    }

    audio.onerror = () =>
      reject(new Error('Impossible de charger le fichier audio'))

    audio.src = URL.createObjectURL(file)
  })
}
