import Image from 'next/image'
import React from 'react'
import type Anime from '@globals/types'
import { useTranslation } from 'next-i18next'

const AnimeCard: React.FC<{ anime: Anime; chooseState: boolean; setChooseState: (state: boolean) => void }> = ({ anime, chooseState, setChooseState }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-32 sm:w-48 sm:h-60 flex-none">
        <Image
          src={anime.image}
          alt={anime.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className="flex-initial w-48 text-base sm:text-xl text-center border-b-2 mt-2 border-cyan-900 dark:border-gray-50">
        {anime.name}
      </div>

      <button type="button" className="w-24 border rounded-md m-2 p-2 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800" onClick={() => {
        setChooseState(!chooseState)
      }}>{t('choose')}</button>
    </div>
  )
}

export default AnimeCard

