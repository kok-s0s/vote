import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import type Anime from '../globals/types'

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

      <div className="font-mono text-2xl text-center pt-8">Which anime do you prefer？</div>

      <ul>
        {data.map((post: Anime) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>

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
