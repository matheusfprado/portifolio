import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Anos de código', value: '3+' },
  { label: 'Projetos entregues', value: '10+' },
  { label: 'Cursos intensivos', value: '9' },
]

const strengths = [
  {
    title: 'Produto e interface',
    description:
      'Fluxos claros, componentes reutilizáveis e atenção aos detalhes que sustentam a experiência.',
  },
  {
    title: 'Front-end performático',
    description:
      'Next.js, React e Tailwind aplicados com foco em responsividade, acessibilidade e velocidade.',
  },
  {
    title: 'Entrega ponta a ponta',
    description:
      'Do contexto do negócio à interface final, com decisões técnicas objetivas e rastreáveis.',
  },
]

const typewriterTexts = [
  'const developer = "Matheus Prado";',
  'build({ product, performance, clarity });',
  'ship("experiências que resolvem problemas");',
]

const socialLinks = [
  {
    href: 'https://api.whatsapp.com/send?phone=5516996356302',
    label: 'WhatsApp',
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

function Typewriter() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loop, setLoop] = useState(0)

  useEffect(() => {
    const fullText = typewriterTexts[loop % typewriterTexts.length]
    const isComplete = !isDeleting && text === fullText
    const isEmpty = isDeleting && text === ''
    const delay = isComplete ? 1200 : isDeleting ? 35 : 75

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true)
        return
      }

      if (isEmpty) {
        setIsDeleting(false)
        setLoop((current) => current + 1)
        return
      }

      setText((current) =>
        isDeleting
          ? current.slice(0, -1)
          : fullText.slice(0, current.length + 1)
      )
    }, delay)

    return () => clearTimeout(timer)
  }, [isDeleting, loop, text])

  return (
    <div className="font-mono text-sm leading-7 text-emerald-300">
      <span>{text}</span>
      <span className="ml-1 animate-pulse border-r-2 border-blue-300" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Matheus Prado — Desenvolvimento fullstack</title>
        <meta
          name="description"
          content="Desenvolvedor fullstack focado em produtos digitais claros, performáticos e fáceis de evoluir."
        />
      </Head>

      <section className="relative isolate overflow-hidden pb-8 pt-16 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(191,219,254,0.5),_transparent_42%),radial-gradient(circle_at_80%_65%,_rgba(96,165,250,0.14),_transparent_36%)]" />
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Badge>Disponível para novos projetos</Badge>

              <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.08]">
                Produtos digitais claros, rápidos e feitos para evoluir.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Sou Matheus Prado, desenvolvedor fullstack. Transformo
                necessidades reais em interfaces consistentes, arquitetura
                sustentável e experiências que facilitam a vida de quem usa o
                produto.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild className="px-6">
                  <Link href="/projects">Ver projetos</Link>
                </Button>
                <Button asChild variant="outline" className="px-6">
                  <Link href="/matheus-prado-cv.pdf" download>
                    Baixar CV
                  </Link>
                </Button>
              </div>

              <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur"
                  >
                    <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="group flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-4 w-4 text-blue-600" />
                      {social.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="relative hidden h-[380px] items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-2xl shadow-slate-950/10 lg:flex"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.24),transparent_55%)]" />
              <div className="relative w-full rounded-2xl border border-white/10 bg-black/40 p-6 shadow-inner">
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Em construção
                </p>
                <Typewriter />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="strengths-title">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Como trabalho
              </p>
              <h2
                id="strengths-title"
                className="mt-3 text-3xl font-semibold tracking-tight text-slate-950"
              >
                Técnica a serviço do produto.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {strengths.map((strength, index) => (
                <article
                  key={strength.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <span className="text-sm font-semibold tabular-nums text-blue-600">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-lg font-semibold text-slate-900">
                    {strength.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {strength.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-20" aria-labelledby="project-title">
        <Container>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/10 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Projeto em destaque
            </p>
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="project-title"
                  className="text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  InvestHub
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Dashboard cripto com onboarding, dados em tempo real e uma
                  experiência responsiva para acompanhar investimentos com
                  clareza.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white text-slate-950 hover:border-blue-200 hover:bg-blue-50"
              >
                <Link href="/projects">Ver case completo</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
