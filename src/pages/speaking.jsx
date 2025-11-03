import Head from 'next/head'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

const experiences = [
  {
    company: 'Albert',
    period: 'ago/2022 • atual',
    role: 'Desenvolvedor de software',
    description:
      'Atuação fullstack em produtos de saúde. Liderança técnica no front com Next.js, testes e design system. No back-end, foco em Adonis, TDD, integrações e orquestração de serviços.',
    skills:
      'Node.js · TypeScript · Next.js · Tailwind · Jest · Japa · Adonis · Postgres',
    cta: {
      href: 'https://www.linkedin.com/company/oialbert/mycompany/',
      label: 'Ver no LinkedIn',
    },
  },
  {
    company: 'Dify Tecnologia',
    period: 'nov/2021 • jun/2022',
    role: 'Estagiário',
    description:
      'Desenvolvimento web com foco em frontend, correção de bugs, testes automatizados e suporte à evolução de aplicações administrativas.',
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
      <Card.Eyebrow decorate>{experience.period}</Card.Eyebrow>
      <Card.Title>{experience.role}</Card.Title>
      <Card.Eyebrow className="mt-2 text-xs uppercase tracking-[0.35em] text-orange-600">
        {experience.company}
      </Card.Eyebrow>
      <Card.Description>{experience.description}</Card.Description>
      <Card.Skills>{experience.skills}</Card.Skills>
      <Link
        href={experience.cta.href}
        className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-500 transition hover:text-orange-700"
      >
        {experience.cta.label}
      </Link>
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
            <div className="grid gap-8 md:grid-cols-2">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.company} experience={experience} />
              ))}
            </div>
          </Section>
        </div>
      </SimpleLayout>
    </>
  )
}
