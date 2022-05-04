import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps } from 'next'
import Github from '@components/github'
import Footer from '@components/footer'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'about'])),
      // Will be passed to the page component as props
    },
  }
}

const AboutPage = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'about'])

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>{t('about')}</title>
      </Head>

      <Github />

      <h2 className="font-mono text-3xl sm:mt-8 p-4 border-double sm:border-b-8 border-gray-600 dark:border-gray-100">{t('about')}</h2>

      <div className="max-w-xl flex flex-col items-stretch">
        <div className="font-mono border m-6 p-1.5 sm:p-3 rounded-xl shadow-md border-2 shadow-gray-900 border-gray-600 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800 dark:shadow-sky-300 dark:border-gray-100">
          <div className="m-2 text-xl">{t('about:about-title')}</div>
          <div>- {t('about:name')}</div>
          <div>- {t('about:job')}</div>
          <div>- {t('about:feature')}</div>
        </div>

        <div className="tracking-wide border m-6 p-1.5 sm:p-3 rounded-xl shadow-md border-2 shadow-gray-900 border-gray-600 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800 dark:shadow-sky-300 dark:border-gray-100">
          <div className="m-2 text-xl">{t('about:why-title')}</div>
          <div className="my-2 indent-4">{t('about:why-1')}</div>
          <div className="my-2 indent-4">{t('about:why-2')}</div>
          <div className="my-2 indent-4">{t('about:why-3')}</div>
        </div>
      </div>

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
