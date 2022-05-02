import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import type Anime from '../globals/types'

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <div className="flex flex-col items-center">

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

      <div className="flex-initial w-32 text-base sm:text-xl text-center border-b mt-2">
        {anime.name}
      </div>

      <button className="border rounded-lg m-2 p-1 bg-gray-100 text-gray-800">Choose</button>

    </div>
  )
}

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/animes', fetcher)
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
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Best-Anime</title>
      </Head>

      {data.map((curAnime: Anime) => (
          <AnimeCard anime={curAnime} key={curAnime.id} />
      ))}

      <div className="font-mono text-xl text-center pt-8 text-green-100 sm:text-2xl">Which anime do you prefer<span className="italic text-2xl text-yellow-100 sm:text-4xl">?</span></div>

      <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
        <div className="h-36 w-36 bg-pink-300"></div>
        <div className="p-8 italic text-xl">Vs</div>
        <div className="h-36 w-36 bg-pink-300"></div>
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
