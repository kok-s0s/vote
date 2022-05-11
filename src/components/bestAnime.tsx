import Image from 'next/image'
import React from 'react'
import type Anime from '@globals/types'

const BestAnime: React.FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-60 sm:w-64 sm:h-80 flex-none">
        <Image
          src={anime.image}
          alt={anime.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
    </div>
  )
}

export default BestAnime

