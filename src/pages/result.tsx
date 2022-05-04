import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import fetcher from '@utils/fetcher'
import type Anime from '@globals/types'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TiArrowBack } from 'react-icons/ti'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

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

const Result: React.FC = () => {
  const { data, error } = useSWR('/api/animes', fetcher)
  const { t } = useTranslation('common')

  if (error) {
    return (
      <div className="h-screen w-48 flex flex-col justify-center mx-auto">
        <img src="/github.png" alt="github"/>
        <span className="text-center italic text-3xl">Try Again!</span>
      </div>
    )
  }
  if (!data)
    return <div className="h-screen w-48 flex mx-auto"><img src="/rings.svg" alt="rings" /></div>

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>{t('result')}</title>
      </Head>

      <div className="absolute top-4 right-4">
        <Link href="/">
          <TiArrowBack className="text-3xl"/>
        </Link>
      </div>

      <div className="p-4 italic text-2xl">{t('result')}</div>

      <div className="p-2 italic text-xl border-t border-cyan-900 dark:border-gray-50">{t('warning')}</div>

      <div className="flex flex-col w-full max-w-4xl border border-cyan-900 dark:border-gray-50">
        {data.map((curAnime: Anime, index: number) => (
          <AnimeList key={curAnime.id} anime={curAnime} idx={index + 1}/>
        ))}
      </div>
    </div>
  )
}

export default Result
