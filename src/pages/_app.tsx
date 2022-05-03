import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { RiGithubLine } from 'react-icons/ri'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-screen w-screen">
      <a href="https://github.com/kok-s0s/vote" target="_blank" rel="noreferrer">
        <div className="absolute cursor-pointer w-0 h-0 border-sky-500 border-solid border-t-[64px] border-r-[64px] border-r-transparent sm:border-t-[128px] border-r-[128px]">
          <RiGithubLine className="absolute -top-14 left-2 text-3xl text-light-200 -rotate-45 sm:-top-28 left-4 text-6xl" />
        </div>
      </a>
      <Component {...pageProps}>
      </Component>
    </div>
  )
}

export default appWithTranslation(MyApp)
