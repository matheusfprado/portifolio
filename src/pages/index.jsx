import { Fragment, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Reveal } from '@/components/Motion'
import { setSsrCache } from '@/lib/cache'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import CssLogo from '@/images/logos/css3.svg'
import HtmlLogo from '@/images/logos/html5.svg'
import JavascriptLogo from '@/images/logos/javascript.svg'
import NextLogo from '@/images/logos/next.svg'
import NodeLogo from '@/images/logos/nodejs.svg'
import ReactLogo from '@/images/logos/react.png'
import TailwindLogo from '@/images/logos/tailwind.svg'
import TypescriptLogo from '@/images/logos/typescript.svg'

const stats = [
  { label: 'Experiencia', value: '4+ anos' },
  { label: 'Principal foco', value: 'Front-end' },
  { label: 'Produtos', value: 'SaaS / Web' },
]

const strengths = [
  {
    title: 'Interface',
    description:
      'Componentes reutilizaveis, responsividade e experiencia visual consistente.',
  },
  {
    title: 'Engenharia',
    description:
      'TypeScript, SSR, testes, integracao com APIs e evolucao em producao.',
  },
  {
    title: 'Produto',
    description:
      'Decisoes tecnicas conectadas ao fluxo real de uso e ao objetivo do negocio.',
  },
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
    href: 'https://www.linkedin.com/in/matheus-felipe-do-prado-267079249/',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
]

const stackLogos = [
  {
    name: 'React',
    logo: ReactLogo,
    description:
      'Biblioteca principal para criar interfaces componentizadas, reutilizaveis e com estados bem organizados.',
    use: 'Uso para construir UIs escalaveis, fluxos interativos e experiencias ricas no navegador.',
  },
  {
    name: 'Next.js',
    logo: NextLogo,
    description:
      'Framework React para aplicacoes com SSR, rotas, otimizacao de imagens, API routes e boa performance em producao.',
    use: 'Uso para portfolios, landing pages, dashboards e produtos SaaS com renderizacao otimizada.',
  },
  {
    name: 'TypeScript',
    logo: TypescriptLogo,
    description:
      'Superset do JavaScript que adiciona tipagem estatica e deixa o codigo mais previsivel.',
    use: 'Uso para reduzir bugs, documentar contratos e dar mais seguranca em componentes, APIs e regras de negocio.',
  },
  {
    name: 'JavaScript',
    logo: JavascriptLogo,
    description:
      'Linguagem base da web, usada para interatividade, integracoes e logica de aplicacoes frontend e backend.',
    use: 'Uso no desenvolvimento diario de interfaces, automacoes, consumo de APIs e regras client-side.',
  },
  {
    name: 'Node.js',
    logo: NodeLogo,
    description:
      'Runtime JavaScript para backend, scripts, integracoes e ferramentas de desenvolvimento.',
    use: 'Uso para APIs, servicos, automacoes, workers e integracoes entre sistemas.',
  },
  {
    name: 'NestJS',
    logo: '/stack-logos/nestjs.svg',
    description:
      'Framework Node.js opinativo para construir APIs modulares, testaveis e escalaveis.',
    use: 'Uso para organizar backends com controllers, services, modulos, validacoes e arquitetura consistente.',
  },
  {
    name: 'Tailwind CSS',
    logo: TailwindLogo,
    description:
      'Framework utility-first para criar interfaces responsivas com velocidade e consistencia visual.',
    use: 'Uso para montar layouts modernos, estados de hover/focus e design systems leves.',
  },
  {
    name: 'HTML5',
    logo: HtmlLogo,
    description:
      'Base semantica das paginas web, importante para acessibilidade, SEO e estrutura correta da interface.',
    use: 'Uso para criar marcacao clara, hierarquia de conteudo e componentes acessiveis.',
  },
  {
    name: 'CSS3',
    logo: CssLogo,
    description:
      'Tecnologia de estilos da web para layout, responsividade, animacoes e acabamento visual.',
    use: 'Uso para refinamento de UI, microinteracoes, grids, estados visuais e adaptacao mobile.',
  },
  {
    name: 'PostgreSQL',
    logo: '/stack-logos/postgresql.svg',
    description:
      'Banco de dados relacional robusto para persistencia, consultas estruturadas e integridade dos dados.',
    use: 'Uso em produtos com dados transacionais, filtros, relatorios e regras consistentes.',
  },
  {
    name: 'REST APIs',
    logo: '/stack-logos/openapiinitiative.svg',
    description:
      'Padrao de comunicacao HTTP para integrar frontend, backend e servicos externos.',
    use: 'Uso para conectar interfaces com dados reais, autenticacao, dashboards e operacoes de produto.',
  },
  {
    name: 'Jest',
    logo: '/stack-logos/jest.svg',
    description:
      'Framework de testes para validar componentes, funcoes, integracoes e regras de negocio.',
    use: 'Uso para testes automatizados, regressao de bugs e confiabilidade em entregas continuas.',
  },
  {
    name: 'Docker',
    logo: '/stack-logos/docker.svg',
    description:
      'Plataforma de containers para padronizar ambiente, dependencias e execucao de aplicacoes.',
    use: 'Uso para facilitar setup local, deploy e consistencia entre desenvolvimento e producao.',
  },
  {
    name: 'Git',
    logo: '/stack-logos/git.svg',
    description:
      'Sistema de controle de versao usado para versionar codigo e colaborar com times.',
    use: 'Uso com branches, pull requests, revisoes e historico organizado de evolucao do produto.',
  },
  {
    name: 'CI/CD',
    logo: '/stack-logos/githubactions.svg',
    description:
      'Pipeline automatizado para validar, testar, buildar e publicar aplicacoes com mais seguranca.',
    use: 'Uso para reduzir erro manual e manter entregas consistentes em producao.',
  },
  {
    name: 'SSR',
    logo: '/stack-logos/ssr.svg',
    description:
      'Server-Side Rendering gera HTML no servidor, melhorando carregamento inicial, SEO e percepcao de performance.',
    use: 'Uso em paginas que precisam carregar rapido, indexar bem e entregar conteudo pronto ao usuario.',
  },
  {
    name: 'TDD',
    logo: '/stack-logos/tdd.svg',
    description:
      'Pratica de desenvolvimento guiado por testes para criar codigo mais confiavel e evolutivo.',
    use: 'Uso para desenhar comportamentos antes da implementacao e proteger fluxos importantes.',
  },
  {
    name: 'Prisma',
    logo: '/stack-logos/prisma.svg',
    description:
      'ORM para Node.js e TypeScript que facilita modelagem, queries e migrations de banco.',
    use: 'Uso para acesso tipado ao banco, evolucao de schema e integracao com PostgreSQL.',
  },
  {
    name: 'Supabase',
    logo: '/stack-logos/supabase.svg',
    description:
      'Plataforma backend com Postgres, autenticacao, storage, realtime e recursos serverless.',
    use: 'Uso para acelerar produtos com banco, auth, politicas de acesso e funcionalidades realtime.',
  },
  {
    name: 'Zod',
    logo: '/stack-logos/zod.svg',
    description:
      'Biblioteca de validacao e parsing de dados com tipagem forte para TypeScript.',
    use: 'Uso para validar formularios, payloads de API, variaveis de ambiente e contratos de entrada.',
  },
]

const codeLines = [
  'type Stack = "React" | "Next.js" | "TypeScript"',
  '',
  'export function ProductInterface() {',
  '  return build({',
  '    performance: "fast",',
  '    experience: "responsive",',
  '    quality: "tested",',
  '  })',
  '}',
]

function StackLogo({ stack, className = 'max-h-10 w-auto object-contain' }) {
  return (
    <Image
      src={stack.logo}
      alt={`Logo ${stack.name}`}
      width={64}
      height={64}
      className={className}
      unoptimized
    />
  )
}

function StackModal({ stack, onClose }) {
  return (
    <Transition.Root show={Boolean(stack)} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-8 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-6 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-2xl shadow-slate-950/30">
                {stack ? (
                  <>
                    <div className="bg-slate-950 px-6 pb-8 pt-6 text-white sm:px-8 sm:pt-8">
                      <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white shadow-sm transition hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Fechar modal"
                      >
                        X
                      </button>

                      <div className="flex flex-col gap-6 pr-12 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white shadow-lg shadow-blue-950/30">
                            <StackLogo
                              stack={stack}
                              className="max-h-12 w-auto object-contain"
                            />
                          </div>
                          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
                            Tecnologia
                          </p>
                          <Dialog.Title className="mt-3 text-4xl font-light tracking-tight text-white sm:text-5xl">
                            {stack.name}
                          </Dialog.Title>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                          Front-end toolkit
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            O que e
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-slate-700">
                            {stack.description}
                          </p>
                        </section>
                        <section className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                            Como eu uso
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-slate-700">
                            {stack.use}
                          </p>
                        </section>
                      </div>

                      <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50 p-5">
                        <p className="text-sm leading-7 text-slate-700">
                          No portfolio, essa stack representa minha base para
                          criar interfaces responsivas, produtos SaaS,
                          integracoes com APIs, testes, deploy e evolucao em
                          ambiente de producao.
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function ShowcaseFrame() {
  const frameRef = useRef(null)
  const reduceMotion = useReducedMotion()

  function handlePointerMove(event) {
    if (reduceMotion || !frameRef.current) return

    const rect = frameRef.current.getBoundingClientRect()
    frameRef.current.style.setProperty(
      '--glow-x',
      `${event.clientX - rect.left}px`
    )
    frameRef.current.style.setProperty(
      '--glow-y',
      `${event.clientY - rect.top}px`
    )
  }

  function handlePointerLeave() {
    if (!frameRef.current) return

    frameRef.current.style.setProperty('--glow-x', '50%')
    frameRef.current.style.setProperty('--glow-y', '30%')
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 30 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative mx-auto flex aspect-square w-full max-w-[580px] items-center justify-center"
    >
      <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-slate-300/70 motion-reduce:animate-none" />
      <div className="absolute inset-10 rounded-full border border-slate-300/50" />
      <div className="absolute inset-20 animate-[spin_36s_linear_infinite_reverse] rounded-full border border-dashed border-slate-300/40 motion-reduce:animate-none" />

      {['SSR', 'Jest', 'APIs'].map((label, index) => (
        <motion.div
          key={label}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.45 + index * 0.12, duration: 0.35 },
            y: {
              delay: index * 0.3,
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className={[
            'absolute hidden rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm backdrop-blur sm:block',
            index === 0 ? 'left-2 top-1/2 -translate-y-1/2' : '',
            index === 1 ? 'right-5 top-24' : '',
            index === 2 ? 'bottom-20 right-8' : '',
          ].join(' ')}
        >
          {label}
        </motion.div>
      ))}

      <div
        ref={frameRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-[82%] overflow-hidden rounded-[28px] border border-slate-300 bg-white shadow-2xl shadow-slate-950/15"
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,30%),rgba(37,99,235,0.18),transparent_34%)]" />
        <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-[#f7f7f5] px-5">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-slate-500">frontend.system</span>
        </div>

        <div className="grid bg-white md:grid-cols-[1fr_0.9fr]">
          <div className="border-b border-slate-200 bg-slate-950 p-5 md:border-b-0 md:border-r">
            <div className="font-mono text-[11px] leading-6 text-slate-300">
              {codeLines.map((line, index) => (
                <motion.p
                  key={`${line}-${index}`}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.05, duration: 0.25 }}
                >
                  <span className="mr-4 select-none text-slate-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {line || '\u00A0'}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-700">
                Interface
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Front-end para produtos digitais.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Layouts responsivos, componentes claros e atencao ao detalhe
                visual.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {stackLogos.slice(0, 6).map((stack, index) => (
                <motion.div
                  key={stack.name}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.04, duration: 0.25 }}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.04 }}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3"
                  title={stack.name}
                >
                  <StackLogo
                    stack={stack}
                    className="max-h-7 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const reduceMotion = useReducedMotion()
  const [selectedStack, setSelectedStack] = useState(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.2])
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const trackScale = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <>
      <Head>
        <title>Matheus Prado - Front-end Developer</title>
        <meta
          name="description"
          content="Desenvolvedor Front-end / Full Stack focado em React.js, Next.js, TypeScript e produtos SaaS."
        />
      </Head>

      <section
        ref={heroRef}
        className="relative overflow-hidden pb-16 pt-8 sm:pb-24"
      >
        <Container>
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <motion.div
            aria-hidden="true"
            style={reduceMotion ? undefined : { scaleX: trackScale }}
            className="absolute left-8 right-8 top-24 h-px origin-left bg-slate-950/20"
          />
          <div className="grid min-h-[calc(100vh-9rem)] grid-rows-[auto_1fr_auto] gap-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between gap-6 text-xs uppercase tracking-[0.24em] text-slate-500 sm:flex-row"
            >
              <span>Matheus Prado</span>
              <span>Front-end / Full Stack</span>
              <span>React - Next.js - TypeScript</span>
            </motion.div>

            <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : { y: titleY, opacity: titleOpacity }
                }
              >
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="text-sm font-medium text-slate-500"
                >
                  Disponivel para projetos, produtos SaaS e oportunidades
                  front-end.
                </motion.p>
                <motion.h1
                  initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.14,
                  }}
                  className="mt-6 max-w-4xl text-6xl font-light tracking-tight text-slate-950 sm:text-8xl sm:leading-[0.92]"
                >
                  Front-end com precisao visual.
                </motion.h1>
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  className="mt-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
                >
                  Construo interfaces responsivas, escalaveis e prontas para
                  producao com React.js, Next.js, TypeScript e boas praticas de
                  engenharia.
                </motion.p>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.34 }}
                  className="mt-10 flex flex-wrap items-center gap-3"
                >
                  <Button asChild className="px-6">
                    <Link href="https://api.whatsapp.com/send?phone=5516996356302">
                      Falar comigo
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="px-6">
                    <Link href="/projects">Ver projetos</Link>
                  </Button>
                  <Button asChild variant="outline" className="px-6">
                    <Link href="/matheus-prado-cv.pdf" download>
                      Baixar CV
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div style={reduceMotion ? undefined : { y: frameY }}>
                <ShowcaseFrame />
              </motion.div>
            </div>

            <Reveal>
              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 shadow-sm shadow-slate-950/[0.04] sm:grid-cols-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/90 px-6 py-5"
                  >
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 text-2xl font-semibold text-slate-950">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden bg-slate-50 py-16 sm:py-24"
        aria-labelledby="stack-title"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
                  Stack
                </p>
                <h2
                  id="stack-title"
                  className="mt-4 max-w-md text-4xl font-light tracking-tight text-slate-950 sm:text-5xl"
                >
                  Ferramentas que entram no produto real.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
                  Clique em uma tecnologia para ver onde ela entra no meu fluxo
                  de front-end, back-end, testes, dados e deploy.
                </p>
              </div>
            </Reveal>
            <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-2 shadow-xl shadow-slate-950/[0.05] backdrop-blur sm:p-3">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {stackLogos.map((stack, index) => (
                <Reveal key={stack.name} delay={index * 0.04}>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedStack(stack)}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm shadow-slate-950/[0.03] transition duration-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    aria-label={`Abrir explicacao sobre ${stack.name}`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 transition duration-200 group-hover:border-blue-100 group-hover:bg-blue-50">
                      <StackLogo
                        stack={stack}
                        className="max-h-9 w-auto object-contain transition duration-200 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-4 text-sm font-semibold text-slate-700">
                      {stack.name}
                    </span>
                    <span className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition duration-200 group-hover:bg-blue-600 group-hover:text-white group-focus-visible:bg-blue-600 group-focus-visible:text-white">
                      Detalhes
                    </span>
                  </motion.button>
                </Reveal>
              ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="work-title">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-[32px] border border-slate-200 bg-slate-200 shadow-xl shadow-slate-950/[0.06] md:grid-cols-3">
            {strengths.map((strength, index) => (
              <Reveal key={strength.title} delay={index * 0.08}>
                <article className="h-full bg-white/90 p-8">
                  <span className="text-xs uppercase tracking-[0.24em] text-blue-700">
                    0{index + 1}
                  </span>
                  <h2
                    id={index === 0 ? 'work-title' : undefined}
                    className="mt-10 text-3xl font-light tracking-tight text-slate-950"
                  >
                    {strength.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {strength.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28" aria-labelledby="contact-title">
        <Container>
          <Reveal>
            <div className="grid gap-10 rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
                  Contato
                </p>
                <h2
                  id="contact-title"
                  className="mt-4 max-w-3xl text-4xl font-light tracking-tight sm:text-6xl"
                >
                  Vamos construir uma interface com acabamento de produto.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                  {profile.headline}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.div
                      key={social.label}
                      whileHover={reduceMotion ? undefined : { y: -3 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    >
                      <Link
                        href={social.href}
                        aria-label={social.label}
                        className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <Icon className="h-4 w-4 fill-current text-blue-200 transition group-hover:text-slate-950" />
                        {social.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <StackModal
        stack={selectedStack}
        onClose={() => setSelectedStack(null)}
      />
    </>
  )
}

export function getServerSideProps({ res }) {
  setSsrCache(res)

  return {
    props: {},
  }
}
