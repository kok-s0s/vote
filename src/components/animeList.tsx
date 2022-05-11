import Image from 'next/image'
import React from 'react'
import type Anime from '@globals/types'
import { useTranslation } from 'next-i18next'

const AnimeList: React.FC<{ anime: Anime; idx: number }> = ({ anime, idx }) => {
  const { t } = useTranslation('common')

  return (
    <div className="relative flex border-b p-2 items-center justify-between border-cyan-900 dark:border-gray-50">
      <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex-none">
        <Image
          src={anime.image}
          alt={anime.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className="flex-initial w-32 text-base sm:text-xl ml-3 sm:ml-8">
        {anime.name}
      </div>

      <div className="flex-1 text-right text-base sm:text-xl mr-2">
        {t('score')} : {anime.count}
      </div>

      <div className="absolute top-0 right-0 z-20 flex items-center justify-center px-2 font-semibold text-gray-600 bg-gray-100 border-gray-50 dark:text-white dark:bg-gray-600 border dark:border-gray-500 shadow-lg rounded-bl-md">
        {idx}
      </div>
    </div>
  )
}

export default AnimeList

