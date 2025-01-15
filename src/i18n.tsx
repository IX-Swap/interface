import React, { useEffect, useState, createContext, useContext } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { ReactNode } from 'react'
import { useActiveLocale, useSetLocaleFromUrl } from 'hooks/useActiveLocale'
import { SupportedLocale } from 'constants/locales'
// Import your locale files
import en from './locales/en-US.json'
import ph from './locales/fil-PH.json'

export async function dynamicActivate(locale: SupportedLocale) {
  try {
    const { messages } = await import(`./locales/${locale}`)
    i18n.loadAndActivate({ locale, messages })
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

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}

const locales = { en, ph } // Add more languages as needed

interface LocalizationContextProps {
  t: (key: string, params?: Record<string, string>) => string
  switchLanguage: (lang: string) => void
  language: string
}

const LocalizationContext = createContext<LocalizationContextProps>({
  t: (key) => key,
  switchLanguage: () => {},
  language: 'en',
})

interface LocalizationProviderProps {
  children: ReactNode
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('ph') // Default language

  const t = (key: string, params: Record<string, string> = {}): string => {
    // @ts-expect-error
    let translation = locales[language]?.[key] || key

    // Replace placeholders with dynamic values
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{{${param}}}`, params[param])
    })

    return translation
  }

  const switchLanguage = (lang: string): void => {
    // @ts-expect-error
    if (locales[lang]) {
      setLanguage(lang)
    } else {
      console.warn(`Language "${lang}" is not supported.`)
    }
  }

  return <LocalizationContext.Provider value={{ t, switchLanguage, language }}>{children}</LocalizationContext.Provider>
}

export const useLocalization = (): LocalizationContextProps => useContext(LocalizationContext)
