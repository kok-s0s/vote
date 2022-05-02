import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Best-Anime</title>
      </Head>

      <div className="font-mono text-2xl text-center pt-8">Which anime do you prefer？</div>

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
