import Head from 'next/head'

import { Card } from '@/components/Card'
import { Reveal } from '@/components/Motion'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { experiences } from '@/data/profile'
import { setSsrCache } from '@/lib/cache'

function ExperienceCard({ experience }) {
  return (
    <article className="relative pl-12">
      <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-xs font-semibold uppercase text-white shadow-sm shadow-slate-950/20">
        {experience.company.slice(0, 2)}
      </div>
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Card.Title>{experience.role}</Card.Title>
            <p className="mt-2 text-sm font-medium text-slate-700">
              {experience.company} · {experience.employmentType}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {experience.period} · {experience.duration}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {experience.location}
            </p>
          </div>
          <a
            href={experience.cta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-slate-600">
          {experience.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 max-w-4xl border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-950">
            Principais atuações
          </h3>
          <ul className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            {experience.responsibilities.map((responsibility) => (
              <li key={responsibility} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">
          {experience.summary}
        </p>
        <Card.Skills>{experience.skills}</Card.Skills>
      </Card>
    </article>
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
            <div className="relative grid gap-8 before:absolute before:bottom-0 before:left-[17px] before:top-0 before:w-px before:bg-slate-200">
              {experiences.map((experience, index) => (
                <Reveal
                  key={experience.company}
                  delay={index * 0.08}
                >
                  <ExperienceCard experience={experience} />
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      </SimpleLayout>
    </>
  )
}

export function getServerSideProps({ res }) {
  setSsrCache(res)

  return {
    props: {},
  }
}
