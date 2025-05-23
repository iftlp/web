'use client'

import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { Music } from '@/types/music'
import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { ICONS } from '@/constants/icons'

type Props = {
  music: Music
  albumCover: string
  audio: string
}

export function MusicPlayer({ music, albumCover, audio }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    audioEl.load()

    const handleLoadedMetadata = () => {
      setDuration(audioEl.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audioEl.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audioEl.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioEl.addEventListener('timeupdate', handleTimeUpdate)
    audioEl.addEventListener('ended', handleEnded)

    return () => {
      audioEl.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audioEl.removeEventListener('timeupdate', handleTimeUpdate)
      audioEl.removeEventListener('ended', handleEnded)
    }
  }, [audio])

  useEffect(() => {
    const audioEl = audioRef.current
    if (audioEl) {
      audioEl.volume = volume / 100
    }
  }, [volume])

  const togglePlay = () => {
    const audioEl = audioRef.current
    if (!audioEl) return

    if (isPlaying) {
      audioEl.pause()
    } else {
      audioEl.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const getVolumeIcon = () => {
    if (volume === 0)
      return <ICONS.MUSIC_DETAIL_SOUND_OFF className="h-4 w-4 text-gray-500" />
    if (volume <= 70)
      return <ICONS.MUSIC_DETAIL_SOUND_LOW className="h-4 w-4 text-gray-500" />
    return <ICONS.MUSIC_DETAIL_SOUND_HIGH className="h-4 w-4 text-gray-500" />
  }

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0 w-full md:w-48 flex flex-col items-center">
          <Link
            href={`${ROUTES.ARTIST}/${music.album.artist.id}`}
            className="relative group cursor-pointer w-full h-48 overflow-hidden block"
          >
            <Image
              src={albumCover}
              alt=""
              width={192}
              height={192}
              className="w-full aspect-square object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ICONS.MUSIC_DETAIL_DISC className="h-5 w-5" />
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-2 mt-4 w-full">
            {getVolumeIcon()}
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        <div className="w-full flex-1 space-y-6">
          <div className="space-y-2">
            <div className="uppercase tracking-wide text-sm font-semibold">
              <Link
                href={`${ROUTES.ARTIST}/${music.album.artist.id}`}
                className="flex items-center text-lg hover:text-primary transition-colors group"
              >
                {music.album?.artist.name}
                <ChevronRight className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold">{music.title}</h1>
            <p className="text-gray-500">
              <Link
                href={`${ROUTES.ARTIST}/${music.album.artist.id}`}
                className="flex items-center text-lg hover:text-primary transition-colors group"
              >
                Album: {music.album?.title}
                <ChevronRight className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <audio ref={audioRef} src={audio} preload="metadata" />

            <div className="flex items-center space-x-2">
              <Button
                onClick={togglePlay}
                variant="default"
                size="icon"
                className="bg-primary h-12 w-12 rounded-full"
              >
                {isPlaying ? (
                  <ICONS.MUSIC_DETAIL_PAUSE className="h-6 w-6" />
                ) : (
                  <ICONS.MUSIC_DETAIL_PLAY className="h-6 w-6 ml-1" />
                )}
              </Button>

              <span className="text-sm text-gray-500">
                {formatTime(currentTime)}
              </span>

              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={handleProgressChange}
                className="flex-1"
              />

              <span className="text-sm text-gray-500">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
