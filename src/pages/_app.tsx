import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <Head>
        <meta name="title" content="Best-Anime" />
        <meta name="description" content="Choose your favorite anime" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vote-anime.vercel.app/" />
        <meta property="og:title" content="Best-Anime" />
        <meta property="og:description" content="Choose your favorite anime" />
        <meta property="og:image" content="/images/gundam.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://vote-anime.vercel.app/" />
        <meta property="twitter:title" content="Best-Anime" />
        <meta property="twitter:description" content="Choose your favorite anime" />
        <meta property="twitter:image" content="/images/gundam.png" />
        <link rel="icon" href="/images/icons8-son-goku-cute-color-favicons/Web/icons8-son-goku-cute-color-120.png" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
