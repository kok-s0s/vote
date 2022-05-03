import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps } from 'next'
import Footer from '@components/footer'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  }
}

const AboutPage = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>{t('about')}</title>
      </Head>

      <h2 className="text-2xl p-4">{t('about')}</h2>
      <p className="max-w-xl">My name is kok-s0s</p>

      <div className="w-80 flex justify-around text-xl pb-4">
        <Footer />

        <Link href="/about" locale={router.locale === 'en' ? 'zh' : 'en'}>
          <button>
            {t('change-locale')}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
