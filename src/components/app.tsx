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

        <Section title="Kurzprofil">
          <p>{resume.basics.summary}</p>
        </Section>

        <Section title="Berufliche Erfahrung">
          <ul>
            {resume.work.map((w) => (
              <li key={w.company}>
                <SubHeading title={w.company} url={w.website} overline={w.position} />
                <ul className="ml-8 mt-4 list-disc">
                  {w.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Ausbildung">
          <ul>
            {resume.education.map((edu) => (
              <li key={edu.institution}>
                <div className="flex space-between">
                  <div>
                    <p className="font-bold">
                      {edu.studyType} {edu.area}
                    </p>
                    <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  </div>
                  <div className="ml-4 text-gray-700 font-semibold">
                    <time>{edu.startDate}</time> - <time>{edu.endDate}</time>
                  </div>
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
              <li key={proj.name}>
                <SubHeading title={proj.name} url={proj.url} overline="TODO: Arbeitgeber" />
                <p className="mt-3">{proj.description}</p>

                <h4 className="mt-3 font-semibold">Technologien</h4>
                <Taglist tags={proj.keywords} className="mt-2" />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Besondere Fähigkeiten" />
      </Page>
    </>
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
