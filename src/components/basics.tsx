import * as React from 'react'
import cx from 'classnames'
import { useResume } from '../resume'
import { typo, Section } from './typo'
import { formatUrl } from '../util'
import avatarUrl from '../Portrait_1000.jpg'
import { useLocalization } from '../localization'

export const Basics = () => {
  const resume = useResume()
  const { __ } = useLocalization()

  return (
    <div className="relative">
      <BackDrop />
      <div className="flex justify-between">
        <div>
          <h1 className={typo.h1}>{resume.basics.name}</h1>
          <h2 className={cx('text-xl text-gray-700 font-bold')}>
            {__(resume.translations.SOFTWARE_DEVELOPER)}
          </h2>

          <address className="mt-6 mr-6 grid grid-cols-8 not-italic">
            <RowTitle>{__(resume.translations.ADDRESS)}</RowTitle>
            <div className="col-span-5">{resume.basics.address}</div>

            <RowTitle>{__(resume.translations.BIRTHDAY)}</RowTitle>
            <div className="col-span-5">{resume.basics.birthday}</div>

            <RowTitle>{__(resume.translations.PHONE)}</RowTitle>
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
        <Avatar className="w-48" />
      </div>
    </div>
  )
}

const Profiles = () => {
  const resume = useResume()

  return (
    <>
      {resume.profiles.map((p) => (
        <React.Fragment key={p.name}>
          <RowTitle>{p.name}</RowTitle>
          <a className="col-span-5" href={p.url}>
            {formatUrl(p.url)}
          </a>
        </React.Fragment>
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
