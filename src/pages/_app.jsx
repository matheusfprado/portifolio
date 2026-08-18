import { useEffect, useRef } from 'react'

import { AnimatePresence } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageTransition, ScrollProgress } from '@/components/Motion'

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="relative isolate min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950 antialiased">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_34%),linear-gradient(to_bottom,#ffffff_0%,#f8fafc_48%,#eef2ff_100%)]" />
        <ScrollProgress />
        <Header />
        <main className="relative z-10 py-10">
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition pageKey={router.pathname}>
              <Component previousPathname={previousPathname} {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  )
}
