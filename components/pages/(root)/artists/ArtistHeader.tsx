'use client'

import Image from 'next/image'

type Props = {
  name: string
  albumCount: number
  profileImage: string
}

export function ArtistHeader({ name, albumCount, profileImage }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
        <div className="relative w-full h-full overflow-hidden rounded-full shadow-md">
          <Image
            src={profileImage}
            alt=""
            width={192}
            height={192}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left space-y-2">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Artiste
        </div>
        <h1 className="text-4xl font-bold">{name}</h1>
        <div className="text-gray-600">
          {albumCount} album{albumCount > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
