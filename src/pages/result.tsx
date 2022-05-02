import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import type Anime from '../globals/types'

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const result = await prisma.anime.findMany()

  return {
    props: { result },
  }
}

const AnimeList: React.FC<{ anime: Anime }> = ({ anime }) => {
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

      <div className="p-4 italic text-3xl">Result</div>

      <div className="flex flex-col w-full max-w-4xl border">
        {data.map((curAnime: Anime) => (
          <AnimeList anime={curAnime} key={curAnime.id} />
        ))}
      </div>
    </div>
  )
}

export default Result
