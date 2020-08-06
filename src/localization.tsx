import * as React from 'react'
import { get } from 'lodash'
import cx from 'classnames'

export type Locale = 'de' | 'en'
export const availableLocales: Locale[] = ['de', 'en']

const LocalizationContext = React.createContext<{
  activeLocale: Locale
  setLocale?: (l: Locale) => void
}>({ activeLocale: 'de' })

type LocalizationProviderProps = { locale: Locale; children: React.ReactNode }

export const LocalizationProvider = ({
  locale: defaultLocale,
  children,
}: LocalizationProviderProps) => {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale)
  return (
    <LocalizationContext.Provider value={{ activeLocale: locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = () => {
  const { activeLocale } = React.useContext(LocalizationContext)
  return {
    __: (what: object, path: string) => {
      const value = get(what, `${path}.${activeLocale}`)
      if (!value) {
        throw new Error(`Could not find localization value in path '${path}'.`)
      }
      return value
    },
  }
}

export const LocaleSwitcher = ({ className }: { className?: string }) => {
  const { activeLocale, setLocale } = React.useContext(LocalizationContext)
  const inactiveClasses = 'bg-white'
  const activeClasses = 'bg-gray-700 text-gray-100'

  return (
    <ul
      className={cx(className, 'fixed top-0 right-0 mt-3 mr-3 flex rounded-md overflow-hidden')}
      aria-label="Switch locale"
    >
      {availableLocales.map((l) => (
        <li key={l}>
          <button
            className={cx(
              'font-semibold px-3 py-2',
              l === activeLocale ? activeClasses : inactiveClasses,
            )}
            onClick={() => setLocale && setLocale(l)}
          >
            {l}
          </button>
        </li>
      ))}
    </ul>
  )
}
