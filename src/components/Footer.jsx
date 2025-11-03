import Link from 'next/link'

import { Container } from '@/components/Container'

export function Footer() {
  const navigation = [
    { href: '/about', label: 'Sobre' },
    { href: '/projects', label: 'Projetos' },
    { href: '/speaking', label: 'Experiência' },
  ]

  return (
    <footer className="relative z-10 mt-32 pb-16">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-orange-200/60 bg-white px-8 py-10 shadow-[0_30px_85px_-55px_rgba(249,115,22,0.45)]">
          <div className="flex flex-col gap-8 text-slate-600 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.45em] text-orange-500">
                vamos construir algo
              </span>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                &copy; {new Date().getFullYear()} Matheus Prado
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-orange-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
