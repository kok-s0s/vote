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
import { useTheme } from 'next-themes'
import { GiAztecCalendarSun } from 'react-icons/gi'
import { MdDarkMode } from 'react-icons/md'

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

      <div className="flex-initial w-32 text-base sm:text-xl text-center border-b-2 mt-2 border-cyan-900 dark:border-gray-50">
        {anime.name}
      </div>

      <button className="border rounded-md m-2 p-1 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800" onClick={() => {
        setChooseState(!chooseState)
      }}>Choose</button>
    </div>
  )
}

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

const Home: NextPage = () => {
  const [randomFirst, setRandomFirst] = useLocalStorage('randomFirst', {} as Anime)
  const [chooseFirst, setChooseFirst] = useState(false)
  const [randomSecond, setRandomSecond] = useLocalStorage('randomSecond', {} as Anime)
  const [chooseSecond, setChooseSecond] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation('common')
  const { theme, setTheme } = useTheme()
  const [animeArr, setAnimeArr] = useLocalStorage('animeArr', [])
  const [animesLen, setAnimesLen] = useLocalStorage('animeLen', 0)
  const [bestAnime, setBestAnime] = useLocalStorage('bestAnime', {} as Anime)

  useEffect(() => {
    const getAnimesLen = async () => {
      const body = 'len'

      await fetch('/api/animes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then((data) => {
          setAnimesLen(data)
        })
    }

    getAnimesLen()
  }, [])

  useEffect(() => {
    setLoading(true)

    const genRandomAnimes = async () => {
      if (Object.keys(randomFirst).length === 0 && Object.keys(randomSecond).length === 0) {
        const first = await fetch('/api/randomOne')
          .then(res => res.json())
          .then((data) => {
            setRandomFirst(data)
            setAnimeArr((prev: Array<string>) => [...prev, data.id])
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
            setAnimeArr((prev: Array<string>) => [...prev, data.id])
          })
      }
      else if (chooseFirst) {
        setBestAnime(randomFirst)
        const pendingUpgrade = randomSecond
        const changeless = randomFirst
        const body = { pendingUpgrade, changeless }

        while (true) {
          if (animeArr.length === animesLen) {
            setAnimeArr((prev: Array<string>) => [...prev, 'over'])
            break
          }

          let flag = false

          await fetch('/api/randomOne', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
            .then(res => res.json())
            .then((data) => {
              if (!animeArr.includes(data.id)) {
                setRandomSecond(data)
                setAnimeArr((prev: Array<string>) => [...prev, data.id])
                flag = true
              }
            })

          if (flag)
            break
        }

        setChooseFirst(!chooseFirst)
      }
      else if (chooseSecond) {
        setBestAnime(randomSecond)
        const pendingUpgrade = randomFirst
        const changeless = randomSecond
        const body = { pendingUpgrade, changeless }

        while (true) {
          if (animeArr.length === animesLen) {
            setAnimeArr((prev: Array<string>) => [...prev, 'over'])
            break
          }

          let flag = false

          await fetch('/api/randomOne', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
            .then(res => res.json())
            .then((data) => {
              if (!animeArr.includes(data.id)) {
                setRandomFirst(data)
                setAnimeArr((prev: Array<string>) => [...prev, data.id])
                flag = true
              }
            })

          if (flag)
            break
        }

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

      <div className="flex items-center p-4">
        <div
          className="cursor-pointer hidden sm:block"
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
          {theme === 'light' ? <MdDarkMode className="text-3xl text-gray-800" /> : <GiAztecCalendarSun className="text-3xl text-yellow-500" />}
        </div>
        <div className="font-mono text-xl text-center ml-4 dark:text-green-100 sm:text-2xl">{t('title')}<span className="italic text-2xl dark:text-yellow-100 sm:text-4xl">?</span></div>
      </div>

      {animeArr.length === animesLen + 1
        ? (
          <BestAnime anime={bestAnime} />
          )
        : (
          <div className="p-8 flex justify-between items-center max-w-2xl flex-col sm:flex-row animate-fade-in">
            {randomFirst === null ? '' : <AnimeCard anime={randomFirst} chooseState={chooseFirst} setChooseState={setChooseFirst} />}
            <div className="p-8 italic text-xl">{t('vs')}</div>
            {randomFirst === null ? '' : <AnimeCard anime={randomSecond} chooseState={chooseSecond} setChooseState={setChooseSecond} />}
          </div>
          )}

      <div className="w-80 flex justify-around text-xl pb-4">
        <Footer />

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
