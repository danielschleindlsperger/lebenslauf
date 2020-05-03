import * as React from 'react'
import cx from 'classnames'
import { useResume } from '../resume'
import { typo } from './typo'

export const Basics = () => {
  const resume = useResume()

  return (
    <div>
      <h1 className={typo.h1}>{resume.basics.name}</h1>
      <h2 className={cx('text-xl text-gray-700 font-bold')}>Softwareentwickler</h2>
      <div className="mt-6 grid grid-cols-2">
        <div className="font-semibold">Adresse</div>
        <div>{resume.basics.address}</div>

        <div className="font-semibold">Geburtstag</div>
        <div>{resume.basics.birthday}</div>

        <div className="font-semibold">Telefon</div>
        <div>{resume.basics.phone}</div>

        <div className="font-semibold">Email</div>
        <div>{resume.basics.email}</div>

        <div className="font-semibold">Website</div>
        <div>{resume.basics.website}</div>
      </div>
    </div>
  )
}
