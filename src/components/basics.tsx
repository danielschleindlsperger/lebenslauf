import * as React from 'react'
import cx from 'classnames'
import { useResume } from '../resume'
import { typo, Section } from './typo'
import { formatUrl } from '../util'
import avatarUrl from '../Portrait_1000.jpg'

export const Basics = () => {
  const resume = useResume()

  return (
    <div className="relative">
      <BackDrop />
      <div className="flex justify-between">
        <div>
          <h1 className={typo.h1}>{resume.basics.name}</h1>
          <h2 className={cx('text-xl text-gray-700 font-bold')}>Softwareentwickler</h2>

          <address className="mt-6 mr-6 grid grid-cols-7 not-italic">
            <RowTitle>Adresse</RowTitle>
            <div className="col-span-5">{resume.basics.address}</div>

            <RowTitle>Geburtstag</RowTitle>
            <div className="col-span-5">{resume.basics.birthday}</div>

            <RowTitle>Telefon</RowTitle>
            <a className="col-span-5" href={'tel:' + resume.basics.phone}>
              {resume.basics.phone}
            </a>

            <RowTitle>Email</RowTitle>
            <a className="col-span-5" href={'mailto:' + resume.basics.email}>
              {resume.basics.email}
            </a>

            <RowTitle>Website</RowTitle>
            <a className="col-span-5" href={resume.basics.website}>
              {formatUrl(resume.basics.website)}
            </a>

            <Profiles />
          </address>
        </div>
        <Avatar className="w-64" />
      </div>
    </div>
  )
}

const Profiles = () => {
  const resume = useResume()

  return (
    <>
      {resume.profiles.map((p) => (
        <>
          <RowTitle key={p.name}>{p.name}</RowTitle>
          <a key={p.url} className="col-span-5" href={p.url}>
            {formatUrl(p.url)}
          </a>
        </>
      ))}
    </>
  )
}

const BackDrop = () => {
  return null
  return <div className="bg-green-200 w-screen h-full fixed" />
}
const RowTitle = ({ children }: { children?: React.ReactNode }) => {
  return <div className="font-semibold col-span-2">{children}</div>
}

const Avatar = ({ className }: { className?: string }) => (
  <div className={cx(className, 'relative')}>
    <div style={{ width: '100%', paddingBottom: '100%' }} />
    <img src={avatarUrl} className="absolute inset-0" />
  </div>
)
