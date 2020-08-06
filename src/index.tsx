import * as React from 'react'
import { render } from 'react-dom'
import { App } from './components/app'
import { LocalizationProvider, Locale } from './localization'

const defaultLocale: Locale = 'de'
const queryParams = window.location.search.split('&')
const locale =
  queryParams.map((q) => q.match(/locale=(.*)/)).filter(Boolean)[0]?.[1] ?? defaultLocale

render(
  <LocalizationProvider locale={locale as Locale}>
    <App />
  </LocalizationProvider>,
  document.getElementById('app'),
)
