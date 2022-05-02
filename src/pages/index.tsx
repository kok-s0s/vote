import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type Anime from '../globals/types'

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
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

      <button className="border rounded-lg m-2 p-1 bg-gray-100 text-gray-800">Choose</button>

    </div>
  )
}

const Home: NextPage = () => {
  const [randomFirst, setRandomFirst] = useState({} as Anime)
  const [randomSecond, setRandomSecond] = useState({} as Anime)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const genRandomAnimes = async () => {
      await fetch('/api/randomOne')
        .then(res => res.json())
        .then((data) => {
          setRandomFirst(data)
        })

      await fetch('/api/randomOne')
        .then(res => res.json())
        .then((data) => {
          setRandomSecond(data)
        })

      setLoading(false)
    }

    genRandomAnimes()
  }, [])

  if (loading)
    return <div className="h-screen w-48 flex mx-auto"><img src="/rings.svg" alt="rings" /></div>

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Best-Anime</title>
      </Head>

      <div className="font-mono text-xl text-center pt-8 text-green-100 sm:text-2xl">Which anime do you prefer<span className="italic text-2xl text-yellow-100 sm:text-4xl">?</span></div>

      <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
        {randomFirst === null ? '' : <AnimeCard anime={randomFirst} />}
        <div className="p-8 italic text-xl">Vs</div>
        {randomFirst === null ? '' : <AnimeCard anime={randomSecond} />}
      </div>

      <div className="w-80 flex justify-around text-xl pb-4">
        <Link href="/result">
          <a>Result</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
    </div>
  )
}

export default Home
