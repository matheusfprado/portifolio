import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

const stats = [
  { label: 'Anos de código', value: '3+' },
  { label: 'Projetos entregues', value: '10+' },
  { label: 'Cursos intensivos', value: '9' },
]

const socialLinks = [
  {
    href: 'https://api.whatsapp.com/send?phone=5516996356302',
    label: 'Whatsapp',
    icon: WhatsappIcon,
  },
  {
    href: 'https://github.com/matheusfprado',
    label: 'GitHub',
    icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/matheus-felipe-267079249/',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
]

// Componente do efeito de digitação
function Typewriter() {
  const texts = [
    'const user = "Matheus Prado";',
    'console.log("Criando experiências digitais...");',
    'function build() { return "Código limpo e performático"; }',
  ]
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loop, setLoop] = useState(0)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const current = loop % texts.length
      const fullText = texts[current]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setSpeed(isDeleting ? 40 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoop(loop + 1)
      }
    }

    const timer = setTimeout(handleTyping, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting])

  return (
    <div className="font-mono text-lg text-orange-700">
      <span>{text}</span>
      <span className="border-r-2 border-orange-500 ml-1 animate-pulse" />
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Matheus Prado — Experiências digitais imersivas</title>
        <meta
          name="description"
          content="Construo aplicações web fullstack com foco em interações 3D, alta performance e experiências memoráveis."
        />
      </Head>

      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(253,186,116,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.18),_transparent_55%)]" />
        <Container className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_1fr]">
            {/* Texto esquerdo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-white px-4 py-2 text-xs uppercase tracking-[0.45em] text-orange-600">
                Fullstack imersivo
              </span>

              <h1 className="mt-6 text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl sm:leading-tight">
                Interfaces com profundidade, performance e histórias que prendem
                o olhar.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-600">
                Sou Matheus Prado, desenvolvedor fullstack. Transformo conceitos
                em produtos digitais com animações 3D, arquitetura escalável e
                foco total na experiência das pessoas.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/projects" className="px-6">
                  Ver projetos em destaque
                </Button>
                <Button
                  href="https://drive.google.com/file/d/1dQMzfr-6-Uq5NJZeaXlx0eZf7M7VfBY1/view?usp=sharing"
                  variant="secondary"
                  className="px-6"
                >
                  Baixar CV
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-full border border-orange-200/60 bg-white px-5 py-3 text-sm shadow-[0_12px_32px_-24px_rgba(249,115,22,0.35)]"
                  >
                    <span className="text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </span>
                    <span className="ml-2 text-xs uppercase tracking-[0.3em] text-orange-600">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-5 text-slate-500">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="group flex items-center gap-3 rounded-full border border-orange-200/60 bg-white px-4 py-2 text-sm uppercase tracking-[0.35em] text-slate-500 transition hover:border-orange-400/80 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Icon className="h-5 w-5 text-orange-500 transition group-hover:text-orange-600" />
                      {social.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Espaço visual direito com efeito de digitação */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative flex items-center justify-center w-full max-w-md h-[380px] rounded-[2rem] overflow-hidden border border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-[0_0_40px_-15px_rgba(249,115,22,0.25)] p-8"
              >
                <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.1),transparent_60%)]" />
                <div className="relative z-10 w-full">
                  <div className="bg-black/90 text-green-400 rounded-xl p-6 font-mono text-sm shadow-inner border border-orange-300/30">
                    <Typewriter />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 3)
        .map(({ component, ...meta }) => meta),
    },
  }
}
