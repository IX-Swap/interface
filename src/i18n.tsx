import React, { useEffect, useState } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { ReactNode } from 'react'
import { useActiveLocale, useSetLocaleFromUrl } from 'hooks/useActiveLocale'
import { SupportedLocale } from 'constants/locales'

export async function dynamicActivate(locale: SupportedLocale) {
  try {
    const { messages } = await import(`./locales/${locale}`)
    i18n.loadAndActivate({locale, messages})
  } catch (e) {}
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  useSetLocaleFromUrl()
  const locale = useActiveLocale()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dynamicActivate(locale)
      .then(() => {
        setLoaded(true)
      })
      .catch((error) => {
        console.error('Failed to activate locale', locale, error)
      })
  }, [locale])

  // prevent the app from rendering with placeholder text before the locale is loaded
  if (!loaded) return null

  return (
    <I18nProvider i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
