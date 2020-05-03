import * as React from 'react'
import cx from 'classnames'

export const typo = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl font-bold',
  h3: 'text-lg font-semibold',
}

type SectionProps = { title: string; children?: React.ReactNode; className?: string }
export const Section = ({ title, children, className }: SectionProps) => {
  return (
    <section className={cx(className, 'mt-6')}>
      <h2 className={cx(typo.h2, 'pb-1', 'border-b-2 border-gray-500')}>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}
