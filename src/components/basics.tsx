import * as React from 'react'
import cx from 'classnames'
import { useResume } from '../resume'
import { typo } from './typo'
import { formatUrl } from '../util'

export const Basics = () => {
  const resume = useResume()

  return (
    <div className="relative">
      <BackDrop />
      <h1 className={typo.h1}>{resume.basics.name}</h1>
      <h2 className={cx('text-xl text-gray-700 font-bold')}>Softwareentwickler</h2>
      <address className="mt-6 grid grid-cols-8 not-italic">
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
      </address>
    </div>
  )
}

const BackDrop = () => {
  return null
  return <div className="bg-green-200 w-screen h-full fixed" />
}
const RowTitle = ({ children }: { children?: React.ReactNode }) => {
  return <div className="font-semibold col-span-3">{children}</div>
}
