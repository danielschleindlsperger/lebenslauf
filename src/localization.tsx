import * as React from 'react'
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

type Localizable = Record<Locale, any>

export const useLocalization = () => {
  const { activeLocale } = React.useContext(LocalizationContext)
  /**
   * @example
   * const nested = {object: {translation: {en: "foo", de: "bar"}}}
   * __(nested.object.translation)
   */
  const __ = (translationObject: Localizable | any[] | string | undefined) => {
    if (
      !translationObject ||
      typeof translationObject === 'string' ||
      Array.isArray(translationObject)
    )
      return translationObject
    const value = translationObject[activeLocale]
    if (!value) {
      throw new Error(
        `Could not find localization value in Object '${JSON.stringify(
          translationObject,
          null,
          2,
        )}'.`,
      )
    }
    return value
  }

  return { __ }
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
