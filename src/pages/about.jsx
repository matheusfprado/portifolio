import Head from 'next/head'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
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
    title: 'Desenvolvedor de software · Albert',
    period: 'ago/2022 · atual',
    description:
      'Atuação fullstack em produtos SaaS, com React.js, Next.js, TypeScript, Node.js, SSR, testes automatizados, integrações REST e evolução de aplicações em produção.',
  },
  {
    title: 'Estagiário Front-End · Dify Tecnologia',
    period: 'jan/2021 · jul/2022',
    description:
      'Manutenção e evolução de aplicações web com JavaScript, Next.js e Jest, atuando em funcionalidades, correções, performance e experiência do usuário.',
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
            <span className="text-xs uppercase tracking-[0.2em] text-blue-700">
              sobre mim
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Tecnologia para criar histórias que as pessoas querem revisitar.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Software Engineer com mais de 4 anos de experiência no
              desenvolvimento de aplicações web e produtos digitais.
              Especialista em Front-End com React.js, Next.js e TypeScript,
              atuando também em integrações e desenvolvimento backend com
              Node.js.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Experiência na construção de aplicações escaláveis, otimização de
              performance, SSR, componentização, consumo de APIs, testes
              automatizados e evolução contínua de produtos SaaS em ambiente de
              produção.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Apaixonado por tecnologia, arquitetura frontend e boas práticas de
              engenharia de software, sempre buscando criar soluções
              performáticas, intuitivas e que gerem valor real para usuários e
              negócios.
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
                  <div key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-4 w-4 fill-current" />
                      {link.label}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                  design, interfaces web ou arquitetando APIs robustas.
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {timeline.map((job) => (
                <div
                  key={job.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-700">
                      {job.period}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-slate-900">
                      {job.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
