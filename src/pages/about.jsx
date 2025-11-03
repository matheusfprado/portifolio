import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { TiltCard } from '@/components/TiltCard'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import Avatar from '@/images/avatar.jpg'

const socialLinks = [
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
  {
    href: 'https://api.whatsapp.com/send?phone=5516996356302',
    label: 'Whatsapp',
    icon: WhatsappIcon,
  },
]

const timeline = [
  {
    title: 'Desenvolvedor de software - Albert',
    period: '2022 · atual',
    description:
      'Fullstack focado em produtos digitais de saúde. Lidero evoluções do front com Next.js, design system e arquitetura de componentes reutilizáveis. No back-end, atuo com testes, integrações e monitoração.',
  },
  {
    title: 'Estagiário - Dify Tecnologia',
    period: '2021 · 2022',
    description:
      'Desenvolvimento web com foco em Next.js, React e testes. Apliquei boas práticas, melhorias de performance e suporte na evolução do produto.',
  },
]

export default function About() {
  return (
    <>
      <Head>
        <title>Sobre - Matheus Prado</title>
        <meta
          name="description"
          content="Histórias, motivações e a bagagem que levo para cada projeto."
        />
      </Head>
      <Container className="relative z-10 mt-24 pb-24 sm:mt-32 sm:pb-32">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-orange-600">
              sobre mim
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Tecnologia para criar histórias que as pessoas querem revisitar.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Minha jornada começou cedo com curiosidade por tecnologia. Aos 9
              anos eu já explorava sistemas, hardware e redes. Depois de
              flertar com a ciência, voltei de vez para o desenvolvimento em
              2021 — desde então mergulhei em projetos que pedem visão de
              produto, código limpo e foco nas pessoas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Hoje atuo como desenvolvedor fullstack, entregando interfaces
              imersivas, integrações confiáveis e experiências que unem design,
              negócio e tecnologia. Adoro traduzir objetivos estratégicos em
              soluções que brilham nos detalhes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" className="px-6">
                Ver projetos
              </Button>
              <Button
                href="mailto:matheusfp.dev@gmail.com"
                variant="secondary"
                className="px-6"
              >
                Falar por e-mail
              </Button>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <TiltCard
                    key={link.label}
                    className="bg-transparent"
                    innerClassName="bg-transparent p-0"
                    overlay={false}
                  >
                    <Link
                      href={link.href}
                      className="flex h-full items-center justify-between rounded-[1.2rem] border border-orange-200/60 bg-white px-3 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 transition hover:border-orange-400/70 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  </TiltCard>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <TiltCard>
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full overflow-hidden rounded-3xl">
                  <Image
                    src={Avatar}
                    alt="Matheus Prado"
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 24rem, 20rem"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
                </div>
                <div className="text-center text-sm text-slate-600">
                  Sempre curioso por novas tecnologias, seja criando motion
                  design, experiências 3D no navegador ou arquitetando APIs
                  robustas.
                </div>
              </div>
            </TiltCard>
            <div className="space-y-6">
              {timeline.map((job) => (
                <TiltCard key={job.title}>
                  <div>
                    <span className="text-xs uppercase tracking-[0.4em] text-orange-600">
                      {job.period}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-slate-900">
                      {job.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {job.description}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
