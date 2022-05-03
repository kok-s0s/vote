import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type Anime from '@globals/types'
import useLocalStorage from '@hooks/useLocalStorage'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Github from '@components/github'
import Footer from '@components/footer'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

interface Props {
  anime: Anime
  chooseState: Boolean
  setChooseState: Function
}

const AnimeCard: React.FC<Props> = ({ anime, chooseState, setChooseState }) => {
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

      <div className="flex-initial w-32 text-base sm:text-xl text-center border-b mt-2">
        {anime.name}
      </div>

      <button className="border rounded-lg m-2 p-1 bg-gray-100 text-gray-800" onClick={() => {
        setChooseState(!chooseState)
      }}>Choose</button>
    </div>
  )
}

const Home: NextPage = () => {
  const [randomFirst, setRandomFirst] = useLocalStorage('randomFirst', {} as Anime)
  const [chooseFirst, setChooseFirst] = useState(false)
  const [randomSecond, setRandomSecond] = useLocalStorage('randomSecond', {} as Anime)
  const [chooseSecond, setChooseSecond] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation('common')

  useEffect(() => {
    setLoading(true)

    const genRandomAnimes = async () => {
      if (Object.keys(randomFirst).length === 0 && Object.keys(randomSecond).length === 0) {
        const first = await fetch('/api/randomOne')
          .then(res => res.json())
          .then((data) => {
            setRandomFirst(data)
            return data
          })
        const body = { first }

        await fetch('/api/randomOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then((data) => {
            setRandomSecond(data)
          })
      }
      else if (chooseFirst) {
        const pendingUpgrade = randomSecond
        const changeless = randomFirst
        const body = { pendingUpgrade, changeless }

        await fetch('/api/randomOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then((data) => {
            setRandomSecond(data)
          })

        setChooseFirst(!chooseFirst)
      }
      else if (chooseSecond) {
        const pendingUpgrade = randomFirst
        const changeless = randomSecond
        const body = { pendingUpgrade, changeless }

        await fetch('/api/randomOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then((data) => {
            setRandomFirst(data)
          })

        setChooseSecond(!chooseSecond)
      }

      setLoading(false)
    }

    genRandomAnimes()
  }, [chooseFirst, chooseSecond])

  if (loading)
    return <div className="h-screen w-48 flex mx-auto"><img src="/rings.svg" alt="rings" /></div>

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>{t('best-anime')}</title>
      </Head>

      <Github />

      <div className="font-mono text-xl text-center pt-8 text-green-100 sm:text-2xl">{t('title')}<span className="italic text-2xl text-yellow-100 sm:text-4xl">?</span></div>

      <div className="p-8 flex justify-between items-center max-w-2xl flex-col sm:flex-row animate-fade-in">
        {randomFirst === null ? '' : <AnimeCard anime={randomFirst} chooseState={chooseFirst} setChooseState={setChooseFirst}/>}
        <div className="p-8 italic text-xl">{t('vs')}</div>
        {randomFirst === null ? '' : <AnimeCard anime={randomSecond} chooseState={chooseSecond} setChooseState={setChooseSecond}/>}
      </div>

      <div className="w-80 flex justify-around text-xl pb-4">
        <Footer/>

        <Link href="/" locale={router.locale === 'en' ? 'zh' : 'en'}>
          <button>
            {t('change-locale')}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
