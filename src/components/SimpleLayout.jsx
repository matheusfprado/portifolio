import clsx from 'clsx'
import { Container } from '@/components/Container'

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="relative z-10 mt-24 pb-24 sm:mt-32 sm:pb-32">
      <div className="border-t border-slate-200 pt-12 sm:pt-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-base text-slate-600 sm:text-lg">{intro}</p>
          )}
        </header>

        <div className={clsx('mt-12 sm:mt-16', !intro && 'pt-6 sm:pt-8')}>
          {children}
        </div>
      </div>
    </Container>
  )
}
