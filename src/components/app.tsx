import * as React from 'react'
import cx from 'classnames'
import { Basics } from './basics'
import { useResume } from '../resume'
import { Section } from './typo'
import { formatUrl } from '../util'

import '../styles.css'
import { useLocalization, LocaleSwitcher } from '../localization'

export const App = () => {
  const resume = useResume()
  const { __ } = useLocalization()
  return (
    <>
      <LocaleSwitcher className="hide-for-print" />
      <Page>
        <Basics />

        <Section title={__(resume.translations.SUMMARY)}>
          <p>{__(resume.basics.summary)}</p>
        </Section>

        <Section title={__(resume.translations.PROFESSIONAL_EXPERIENCE)}>
          <ul>
            {resume.work.map((w) => (
              <li className="mt-6" key={__(w.company)}>
                <div className="flex items-baseline justify-between">
                  <SubHeading title={__(w.company)} url={__(w.website)} overline={__(w.position)} />
                  <Timestamp startDate={__(w.startDate)} endDate={__(w.endDate)} />
                </div>
                <BulletList className="mt-4" entries={__(w.highlights)} />
              </li>
            ))}
          </ul>
        </Section>
      </Page>

      <Page>
        <Section title={__(resume.translations.EDUCATION)}>
          <ul>
            {resume.education.map((edu) => (
              <li className="mt-4" key={__(edu.institution)}>
                <div className="flex space-between items-baseline justify-between">
                  <div>
                    <p className="font-bold">
                      {__(edu.studyType)} {__(edu.area)}
                    </p>
                    <p className="text-gray-700 font-semibold">{__(edu.institution)}</p>
                  </div>
                  <Timestamp
                    className="ml-4"
                    startDate={__(edu.startDate)}
                    endDate={__(edu.endDate)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title={__(resume.translations.PROJECTS)}>
          <ul>
            {resume.projects.map((proj) => (
              <li className="mt-6" key={__(proj.name)}>
                <SubHeading title={__(proj.name)} url={__(proj.url)} overline={__(proj.company)} />
                <p className="mt-3">{__(proj.description)}</p>
                <Taglist className="mt-3" tags={__(proj.keywords)} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title={__(resume.translations.NOTABLE_SKILLS)}>
          <ul>
            {resume.skills.map((skill) => (
              <li className="mt-2" key={__(skill.name)}>
                <h3 className="text-lg font-bold">{__(skill.name)}</h3>
                <BulletList className="mt-2" entries={__(skill.keywords)} />
              </li>
            ))}
          </ul>
        </Section>
      </Page>
    </>
  )
}

type TimestampProps = {
  startDate: string
  endDate: string
  className?: string
}
const Timestamp = ({ startDate, endDate, className }: TimestampProps) => {
  return (
    <div className={cx(className, 'font-semibold text-gray-700 text-sm')}>
      <time dateTime={startDate}>{startDate}</time> - <time dateTime={endDate}>{endDate}</time>
    </div>
  )
}

const BulletList = ({ entries, className }: { entries: string[]; className?: string }) => {
  if (entries.length === 0) return null
  return (
    <ul className={cx(className, 'list-disc ml-8')}>
      {entries.map((entry) => (
        <li key={entry}>{entry}</li>
      ))}
    </ul>
  )
}

const Taglist: React.FC<{ tags: string[]; className?: string }> = ({ tags, className }) => {
  return (
    <ul className={cx(className, 'flex')}>
      {tags.map((t) => (
        <li
          key={t}
          className="px-2 py-1 ml-2 first:ml-0 text-sm text-gray-700 font-semibold border-2 rounded "
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

type SubHeadingProps = {
  overline?: string
  title: string
  url?: string
  className?: string
}
const SubHeading = ({ overline, title, url, className }: SubHeadingProps) => {
  return (
    <div className={className}>
      {overline && <p className="text-gray-700 font-semibold">{overline}</p>}
      <div className="flex items-baseline">
        <h3 className="font-bold text-lg">{title}</h3>
        {url && <Link href={url} className="ml-4" />}
      </div>
    </div>
  )
}

const Link = ({ href, className }: { href: string; className?: string }) => {
  return (
    <a
      className={cx(
        className,
        'text-gray-500 font-semibold leading-tight border-b-2 border-gray-500',
      )}
      href={href}
    >
      {formatUrl(href)}
    </a>
  )
}

const Page = ({ children }: { children?: React.ReactNode }) => {
  return <div className="page">{children}</div>
}
