import { useEffect, useRef } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

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
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(253,186,116,0.22),_rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-x-0 top-[35%] h-[24rem] -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.8),_rgba(255,255,255,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,237,213,0.35),rgba(255,255,255,0)_48%,rgba(254,215,170,0.25))]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.6)_0.9px,transparent_1px)] bg-[length:100%_32px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,230,138,0.3)_0.9px,transparent_1px)] bg-[length:32px_100%]" />
      </div>
      <div className="relative min-h-screen bg-white text-slate-900 antialiased">
        <Header />
        <main className="relative z-10 py-10">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
