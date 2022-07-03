import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'next-i18next'

interface Props {
  href: string
}

const Footer: React.FC<Props> = (props) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <div className="w-80 flex justify-around text-xl pb-4">
      <Link href="/">
        <a>{t('home')}</a>
      </Link>

      <Link href="/about">
        <a>{t('about')}</a>
      </Link>

      <Link href="/result">
        <a>{t('result')}</a>
      </Link>

      <Link href={props.href} locale={router.locale === 'en' ? 'zh' : router.locale === 'zh' ? 'jp' : router.locale === 'jp' ? 'en' : ''}>
        <a>{t('change-locale')}</a>
      </Link>
    </div>
  )
}

export default Footer
