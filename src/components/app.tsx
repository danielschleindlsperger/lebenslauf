import * as React from 'react'
import cx from 'classnames'
import { Basics } from './basics'
import { useResume } from '../resume'
import { Section } from './typo'

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
                <p className="text-gray-700 font-semibold">{w.position}</p>
                <div className="flex justify-start items-baseline">
                  <h3 className="font-bold text-lg">{w.company}</h3>
                  <a className="ml-4" href={w.website}>
                    {w.website}
                  </a>
                </div>
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
                <p className="text-gray-700 font-semibold">TODO Arbeitgeber</p>

                <h3 className="font-bold text-lg">{proj.name}</h3>

                <a className="" href={proj.url}>
                  {proj.url}
                </a>
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

const Page = ({ children }: { children?: React.ReactNode }) => {
  return <div className="page">{children}</div>
}
