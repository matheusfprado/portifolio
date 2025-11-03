import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'

const navigation = [
  { href: '/about', label: 'Sobre' },
  { href: '/projects', label: 'Projetos' },
  { href: '/speaking', label: 'Experiência' },
]

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover className="relative text-slate-900 md:hidden">
      <Popover.Button className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-orange-400 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        Menu
        <MenuIcon className="h-5 w-5 text-orange-500" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-4"
        >
          <Popover.Panel className="fixed inset-x-6 top-24 z-50 rounded-3xl border border-orange-200/60 bg-white p-6 shadow-[0_32px_90px_-50px_rgba(249,115,22,0.45)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.35em] text-orange-600">
                Navegação
              </span>
              <Popover.Button
                aria-label="Fechar menu"
                className="rounded-full border border-orange-200/60 p-2 text-orange-500 transition hover:text-orange-700"
              >
                <CloseIcon className="h-5 w-5" />
              </Popover.Button>
            </div>
            <nav className="mt-6 space-y-4">
              {navigation.map((item) => (
                <Popover.Button
                  key={item.href}
                  as={Link}
                  href={item.href}
                  className="block rounded-2xl border border-orange-200/60 bg-white px-4 py-3 text-base font-semibold text-slate-600 transition hover:border-orange-400/70 hover:bg-orange-50 hover:text-orange-600"
                >
                  {item.label}
                </Popover.Button>
              ))}
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  const router = useRouter()

  return (
    <header className="relative z-50 pt-10">
      <Container>
        <div className="flex items-center justify-between rounded-full border border-orange-200/60 bg-white px-6 py-4 shadow-[0_26px_80px_-60px_rgba(249,115,22,0.45)]">
          <Link href="/" className="flex items-center gap-4">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-orange-400 to-amber-200 p-[2px] shadow-[0_0_30px_rgba(249,115,22,0.55)]">
              <Image
                src={avatarImage}
                alt="Matheus Prado"
                className="h-full w-full rounded-full object-cover"
                priority
                sizes="3rem"
              />
            </span>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-xs uppercase tracking-[0.45em] text-slate-500">
                Portfólio
              </span>
              <span className="text-lg font-semibold text-slate-900">
                Matheus Prado
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative transition hover:text-orange-500',
                  router.pathname === item.href && 'text-orange-600'
                )}
              >
                <span>{item.label}</span>
                <span
                  className={clsx(
                    'pointer-events-none absolute inset-x-0 -bottom-2 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-300 to-orange-200 transition-transform duration-300',
                    router.pathname === item.href ? 'scale-x-100' : ''
                  )}
                />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              href="https://api.whatsapp.com/send?phone=5516996356302"
              className="hidden md:inline-flex px-6 text-sm font-semibold uppercase tracking-[0.3em]"
            >
              Contato
            </Button>
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  )
}
