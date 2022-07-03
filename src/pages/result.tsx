import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import fetcher from '@utils/fetcher'
import type Anime from '@globals/types'
import type { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TiArrowBack } from 'react-icons/ti'
import AnimeList from '@components/animeList'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

const Result: React.FC = () => {
  const { data, error } = useSWR('/api/animes', fetcher)
  const { t } = useTranslation('common')

  if (error) {
    return (
      <div className="h-screen w-48 flex flex-col justify-center mx-auto">
        <img src="/github.png" alt="github" />
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

      <div className="absolute top-4 right-4 cursor-pointer">
        <Link href="/" passHref><TiArrowBack className="text-3xl" /></Link>
      </div>

      <div className="p-4 italic text-2xl">{t('result')}</div>

      <div className="p-2 italic text-xl border-t border-cyan-900 dark:border-gray-50">{t('warning')}</div>

      <div className="flex flex-col w-full max-w-4xl border border-cyan-900 dark:border-gray-50">
        {data.map((curAnime: Anime, index: number) => (
          <AnimeList key={curAnime.id} anime={curAnime} idx={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default Result
