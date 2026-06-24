import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

const experiences = [
  {
    company: 'Albert',
    period: 'ago/2022 - o momento',
    role: 'Desenvolvedor de software',
    employmentType: 'Tempo integral',
    location: 'São José dos Campos, São Paulo, Brasil · Remoto',
    description: [
      'Durante 3 anos e 11 meses, atuei no desenvolvimento e evolução de aplicações web modernas utilizando React.js, Next.js, Node.js e TypeScript, contribuindo principalmente para o front-end de produtos digitais em ambiente de produção.',
      'Ao longo desse período, participei da construção de interfaces escaláveis, componentização de aplicações, otimização de performance e implementação de boas práticas de engenharia de software, utilizando TDD para garantir qualidade, previsibilidade e confiabilidade no código.',
      'Também colaborei com integrações backend utilizando Node.js e APIs REST, participando da comunicação entre serviços e do desenvolvimento de funcionalidades que contribuíram para a evolução contínua dos produtos digitais da empresa.',
    ],
    responsibilities: [
      'Desenvolvimento de aplicações web modernas e responsivas utilizando React.js, Next.js e TypeScript',
      'Estruturação de componentes reutilizáveis e escaláveis',
      'Implementação de Server Side Rendering (SSR) e otimizações de performance',
      'Integração com APIs REST e serviços externos',
      'Desenvolvimento de funcionalidades backend utilizando Node.js',
      'Aplicação de testes automatizados e práticas de TDD',
      'Correção de bugs, melhorias contínuas e evolução de produtos digitais em produção',
    ],
    summary:
      'Durante minha trajetória na empresa, adquiri experiência no desenvolvimento de produtos SaaS, arquitetura frontend, qualidade de software e evolução de aplicações utilizadas por usuários em ambiente de produção.',
    skills:
      'Node.js · TypeScript · Next.js · Tailwind · Jest · Japa · Adonis · Postgres',
    cta: {
      href: 'https://www.linkedin.com/company/oialbert/mycompany/',
      label: 'Ver no LinkedIn',
    },
  },
  {
    company: 'Dify Tecnologia',
    period: 'jan/2021 - jul/2022',
    role: 'Estagiário Front-End',
    employmentType: 'Estágio',
    location: 'São Paulo, Brasil',
    description: [
      'Atuei como Estagiário Front-End na Dify Tecnologia durante 1 ano e 7 meses, participando da manutenção e evolução de aplicações web utilizadas em ambiente corporativo.',
      'Durante esse período, contribuí para o desenvolvimento de novas funcionalidades, correção de bugs e melhorias contínuas na experiência do usuário, adquirindo experiência prática com desenvolvimento frontend e processos de engenharia de software.',
      'Também participei da implementação de testes unitários e de integração utilizando Jest, contribuindo para a qualidade, estabilidade e confiabilidade das aplicações. Além disso, trabalhei em colaboração com a equipe de desenvolvimento na otimização de performance e evolução dos produtos digitais.',
    ],
    responsibilities: [
      'Desenvolvimento e manutenção de aplicações web utilizando JavaScript e Next.js',
      'Correção de bugs e implementação de novas funcionalidades',
      'Criação e manutenção de testes automatizados com Jest',
      'Colaboração na evolução de interfaces e experiência do usuário',
      'Otimização de performance e estabilidade das aplicações',
      'Trabalho em equipe utilizando boas práticas de desenvolvimento de software',
    ],
    summary:
      'Essa experiência foi fundamental para consolidar minha base técnica em desenvolvimento frontend e preparar minha evolução para projetos de maior complexidade em ambiente de produção.',
    skills:
      'React.js · JavaScript · TypeScript · Next.js · Tailwind · Jest · Git · HTML · CSS',
    cta: {
      href: 'https://www.linkedin.com/company/dify-tecnologia/',
      label: 'Ver no LinkedIn',
    },
  },
]

function ExperienceCard({ experience }) {
  return (
    <Card>
      <Card.Title>{experience.role}</Card.Title>
      <p className="mt-2 text-sm font-medium text-slate-700">
        {experience.company} · {experience.employmentType}
      </p>
      <p className="mt-1 text-sm text-slate-500">{experience.period}</p>
      <p className="mt-1 text-sm text-slate-500">{experience.location}</p>
      <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-slate-600">
        {experience.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8 max-w-4xl border-t border-slate-100 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Principais atuações
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {experience.responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-2">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
              />
              {responsibility}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">
        {experience.summary}
      </p>
      <Card.Skills>{experience.skills}</Card.Skills>
      <a
        href={experience.cta.href}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 transition hover:text-blue-800"
      >
        {experience.cta.label}
      </a>
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <Head>
        <title>Experiência - Matheus Prado</title>
        <meta
          name="description"
          content="Experiências profissionais e aprendizados que moldam minha forma de construir produtos digitais."
        />
      </Head>
      <SimpleLayout
        title="Experiência e aprendizados em construir produtos digitais."
        intro="Desde squads em cashback digital até plataformas administrativas, sempre unindo visão técnica e foco no usuário."
      >
        <div className="space-y-10">
          <Section title="Jornada">
            <div className="grid gap-8">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.company}
                  experience={experience}
                />
              ))}
            </div>
          </Section>
        </div>
      </SimpleLayout>
    </>
  )
}
