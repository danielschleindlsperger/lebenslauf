import * as React from 'react'
import cx from 'classnames'

export const typo = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl font-bold mt-4',
  h3: 'text-lg font-semibold',
}

type SectionProps = { title: string; children?: React.ReactNode }
export const Section = ({ title, children }: SectionProps) => {
  return (
    <section>
      <h2 className={cx(typo.h2, 'pb-1', 'border-b-2 border-gray-500')}>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}
