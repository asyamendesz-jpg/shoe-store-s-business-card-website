import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  interpolate,
  translations,
  type Lang,
  type TranslationKey,
} from '../i18n/translations'

declare global {
  interface Window {
    FORMA_LANG?: {
      get: () => string
      set: (lang: string) => void
    }
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  const fromWindow = window.FORMA_LANG?.get()
  if (fromWindow === 'en' || fromWindow === 'ru') return fromWindow
  const saved = localStorage.getItem('forma_lang')
  return saved === 'en' ? 'en' : 'ru'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    window.FORMA_LANG?.set(next)
  }, [])

  useEffect(() => {
    const onLang = (event: Event) => {
      const detail = (event as CustomEvent<{ lang: string }>).detail
      if (detail?.lang === 'ru' || detail?.lang === 'en') {
        setLangState(detail.lang)
      }
    }
    window.addEventListener('forma:lang', onLang)
    return () => window.removeEventListener('forma:lang', onLang)
  }, [])

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const value = translations[lang][key] ?? translations.ru[key]
      return vars ? interpolate(value, vars) : value
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
