// @ts-nocheck
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
      <Popover.Button className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-medium shadow-sm shadow-slate-950/[0.03] backdrop-blur transition hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        Menu
        <MenuIcon className="h-5 w-5 text-slate-700" />
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
          <Popover.Overlay className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm" />
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
          <Popover.Panel className="fixed inset-x-6 top-20 z-50 rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Navegação
              </span>
              <Popover.Button
                aria-label="Fechar menu"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
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
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
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
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-4">
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white p-[2px] shadow-sm shadow-slate-950/[0.03]">
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
          <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 p-1 text-sm font-medium text-slate-600 shadow-sm shadow-slate-950/[0.03] md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative rounded-full px-4 py-2 transition hover:bg-slate-50 hover:text-slate-950',
                  router.pathname === item.href &&
                    'bg-slate-950 text-white hover:bg-slate-950 hover:text-white'
                )}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              href="https://api.whatsapp.com/send?phone=5516996356302"
              className="hidden px-6 text-sm font-semibold md:inline-flex"
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
// @ts-nocheck
