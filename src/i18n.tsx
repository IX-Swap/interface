import React, { useEffect, useState, createContext, useContext } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { ReactNode } from 'react'
import { useActiveLocale, useSetLocaleFromUrl } from 'hooks/useActiveLocale'
import { SupportedLocale } from 'constants/locales'
// Import your locale files
import en from './translations/english.json'
import cn from './translations/chinese.json'
import jp from './translations/japanese.json'
import ko from './translations/korean.json'

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

// New Localization Implementation
export const LOCALES = [
  {
    code: 'en',
    fullName: 'English', // Text shown when the dropdown is open
    shortName: 'EN', // Text shown on the dropdown itself
    translations: en,
  },
  {
    code: 'cn',
    fullName: 'Chinese',
    shortName: 'CN',
    translations: cn,
  },
  {
    code: 'jp',
    fullName: 'Japanese',
    shortName: 'JP',
    translations: jp,
  },
  {
    code: 'ko',
    fullName: 'Korean',
    shortName: 'KO',
    translations: ko,
  },
  // Add more languages as needed
]

interface LocalizationContextProps {
  t: (key: string, params?: Record<string, string>) => string;
  switchLanguage: (lang: string) => void;
  language: string;
}

const LocalizationContext = createContext<LocalizationContextProps>({
  t: (key) => key,
  switchLanguage: () => {},
  language: 'en',
});

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en'); // Default language is 'en'

  const t = (key: string, params: Record<string, string> = {}): string => {
    const currentLocale = LOCALES.find((locale) => locale.code === language)?.translations || en;
    const keys = key.split('.');
    let translation: any = currentLocale;

    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }

    if (!translation) return key; // Fallback to the key if not found

    // Replace placeholders with dynamic values
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });

    return translation;
  };

  const switchLanguage = (lang: string): void => {
    const localeExists = LOCALES.some((locale) => locale.code === lang);
    if (localeExists) {
      setLanguage(lang);
    } else {
      console.warn(`Language "${lang}" is not supported.`);
    }
  };

  return (
    <LocalizationContext.Provider value={{ t, switchLanguage, language }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextProps =>
  useContext(LocalizationContext);