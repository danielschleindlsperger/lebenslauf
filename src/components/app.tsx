import * as React from 'react'
import cx from 'classnames'
import { Basics } from './basics'
import { useResume } from '../resume'
import { Section } from './typo'
import { formatUrl } from '../util'

import '../styles.css'

export const App = () => {
  const resume = useResume()
  return (
    <>
      <Page>
        <Basics />

        <Section title="Berufliche Erfahrung">
          <ul>
            {resume.work.map((w) => (
              <li className="mt-6" key={w.company}>
                <div className="flex items-baseline justify-between">
                  <SubHeading title={w.company} url={w.website} overline={w.position} />
                  <Timestamp startDate={w.startDate} endDate={w.endDate} />
                </div>
                <BulletList className="mt-4" entries={w.highlights} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Ausbildung">
          <ul>
            {resume.education.map((edu) => (
              <li className="mt-4" key={edu.institution}>
                <div className="flex space-between items-baseline justify-between">
                  <div>
                    <p className="font-bold">
                      {edu.studyType} {edu.area}
                    </p>
                    <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  </div>
                  <Timestamp className="ml-4" startDate={edu.startDate} endDate={edu.endDate} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </Page>

      <Page>
        <Section title="Projekte">
          <ul>
            {resume.projects.map((proj) => (
              <li className="mt-6" key={proj.name}>
                <SubHeading title={proj.name} url={proj.url} overline={proj.company} />
                <p className="mt-3">{proj.description}</p>
                <Taglist className="mt-3" tags={proj.keywords} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Besondere Fähigkeiten">
          <ul>
            {resume.skills.map((skill) => (
              <li className="mt-2" key={skill.name}>
                <h3 className="text-lg font-bold">{skill.name}</h3>
                <BulletList className="mt-2" entries={skill.keywords} />
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
