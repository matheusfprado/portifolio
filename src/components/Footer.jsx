import Link from 'next/link'

import { Container } from '@/components/Container'

export function Footer() {
  const navigation = [
    { href: '/about', label: 'Sobre' },
    { href: '/projects', label: 'Projetos' },
    { href: '/speaking', label: 'Experiência' },
  ]

  return (
    <footer className="relative z-10 mt-24 border-t border-slate-200 py-10">
      <Container>
        <div className="px-4 sm:px-8">
          <div className="flex flex-col gap-8 text-slate-600 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                vamos construir algo
              </span>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                &copy; {new Date().getFullYear()} Matheus Prado
              </p>
            </div>
            <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-600">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-slate-950"
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
