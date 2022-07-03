import Basic from '@layouts/basic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'about'])),
      // Will be passed to the page component as props
    },
  }
}

const AboutPage = () => {
  const { t } = useTranslation(['about'])

  return (
    <Basic href="/about">
      <Head>
        <title>{t('about')}</title>
      </Head>

      <h2 className="font-mono text-3xl sm:mt-8 p-4 border-double sm:border-b-8 border-gray-600 dark:border-gray-100">{t('about')}</h2>

      <div className="max-w-xl flex flex-col items-stretch">
        <div className="font-mono m-6 p-1.5 sm:p-3 rounded-xl shadow-md border-2 shadow-gray-900 border-gray-600 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800 dark:shadow-sky-300 dark:border-gray-100">
          <div className="m-2 text-xl">{t('about-title')}</div>
          <div>- {t('name')}</div>
          <div>- {t('job')}</div>
          <div>- {t('feature')}</div>
        </div>

        <div className="tracking-wide m-6 p-1.5 sm:p-3 rounded-xl shadow-md border-2 shadow-gray-900 border-gray-600 bg-gray-600 text-gray-100 dark:bg-gray-100 dark:text-gray-800 dark:shadow-sky-300 dark:border-gray-100">
          <div className="m-2 text-xl">{t('why-title')}</div>
          <div className="my-2 indent-4">{t('why-1')}</div>
          <div className="my-2 indent-4">{t('why-2')}</div>
          <div className="my-2 indent-4">{t('why-3')}</div>
        </div>
      </div>
    </Basic>
  )
}

export default AboutPage
