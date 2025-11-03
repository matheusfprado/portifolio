import clsx from 'clsx'
import { Container } from '@/components/Container'

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="relative z-10 mt-24 pb-24 sm:mt-32 sm:pb-32">
      <div className="relative overflow-hidden rounded-lg border border-orange-200/60 bg-white px-8 py-12 sm:px-12 sm:py-16">
        {/* Gradiente interno laranja */}
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_top_left,_rgba(255,237,213,0.6),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(254,215,170,0.6),_transparent_55%)]" />

        {/* Conteúdo */}
        <header className="relative z-10 max-w-3xl">
          <h1 className="mt-6 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-base text-slate-600 sm:text-lg">{intro}</p>
          )}
        </header>

        <div
          className={clsx(
            'relative z-10 mt-12 sm:mt-16',
            !intro && 'pt-6 sm:pt-8'
          )}
        >
          {children}
        </div>
      </div>
    </Container>
  )
}
