import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import type Anime from '../globals/types'

const AnimeList: React.FC<{ anime: Anime; idx: number }> = ({ anime, idx }) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
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
        Score : {anime.count}
      </div>

      <div className="absolute top-0 right-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-bl-md">
        {idx}
      </div>
    </div>
  )
}

const Result: React.FC = () => {
  const { data, error } = useSWR('/api/animes', fetcher)
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
        <title>Result</title>
      </Head>

      <div className="absolute top-4 right-4 border rounded-2xl bg-zinc-200 text-slate-600 p-2">
        <Link href="/">back</Link>
      </div>

      <div className="p-4 italic text-2xl">Result</div>

      <div className="p-2 italic text-xl border-t">Just for fun, don&apos;t take it seriously</div>

      <div className="flex flex-col w-full max-w-4xl border">
        {data.map((curAnime: Anime, index: number) => (
          <AnimeList key={curAnime.id} anime={curAnime} idx={index + 1}/>
        ))}
      </div>
    </div>
  )
}

export default Result
