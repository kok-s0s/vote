import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'next-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <>
         <Link href="/">
          <a>{t('home')}</a>
        </Link>

        <Link href="/about">
          <a>{t('about')}</a>
        </Link>

        <Link href="/result">
          <a>{t('result')}</a>
        </Link>
      </>
  )
}

export default Footer
