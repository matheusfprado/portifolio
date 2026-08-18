import clsx from 'clsx'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Motion'

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="relative z-10 mt-16 pb-24 sm:mt-24 sm:pb-32">
      <div className="pt-10 sm:pt-14">
        <Reveal as="header" className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.08]">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>

        <Reveal
          delay={0.08}
          className={clsx('mt-12 sm:mt-16', !intro && 'pt-6 sm:pt-8')}
        >
          {children}
        </Reveal>
      </div>
    </Container>
  )
}
