import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Badge } from '@/components/ui/badge'

import LogoINH from '@/images/logos/InvestHub.png'
import AnimeverseImage from '@/images/projects/animeverse.png'
import FrankTattooImage from '@/images/projects/frank-tattoo.png'

const NEW_PROJECT_WINDOW_IN_DAYS = 30

function isNewProject(addedAt) {
  if (!addedAt) return false

  const addedAtDate = new Date(`${addedAt}T00:00:00`)
  const expiresAt = new Date(addedAtDate)
  expiresAt.setDate(expiresAt.getDate() + NEW_PROJECT_WINDOW_IN_DAYS)

  return Date.now() < expiresAt.getTime()
}

const projects = [
  {
    name: 'InvestHub',
    description:
      'Login e dashboard de cripto com dados em tempo real. Experiência focada em onboarding fluido, gráficos dinâmicos e responsividade completa.',
    link: {
      href: 'https://investhub.prado-labs.com/',
      label: 'Ver projeto',
    },
    logo: LogoINH,
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
    role: 'Fullstack',
    highlights: [
      'Onboarding orientado por contexto',
      'Dados em tempo real no dashboard',
      'Interface responsiva para desktop e mobile',
    ],
  },
  {
    name: 'Frank Tattoo',
    description:
      'Site institucional para estúdio de tatuagem, com identidade visual forte e apresentação direta dos serviços.',
    link: {
      href: 'https://frank-tatto.prado-labs.com/',
      label: 'Ver projeto',
    },
    image: FrankTattooImage,
    addedAt: '2026-06-24',
    role: 'Web design e desenvolvimento',
    tags: ['Next.js', 'React', 'Tailwind'],
    highlights: [
      'Identidade visual alinhada ao estúdio',
      'Navegação focada na conversão de contatos',
      'Experiência responsiva para diferentes dispositivos',
    ],
  },
  {
    name: 'Animeverse',
    description:
      'Plataforma com identidade visual imersiva para uma comunidade de fãs de anime.',
    link: {
      href: 'https://animeverse.prado-labs.com/',
      label: 'Ver projeto',
    },
    image: AnimeverseImage,
    addedAt: '2026-06-24',
    role: 'Web design e desenvolvimento',
    tags: ['Next.js', 'React', 'Tailwind'],
    highlights: [
      'Direção visual inspirada no universo anime',
      'Interface pensada para engajamento da comunidade',
      'Layout responsivo e orientado a conteúdo',
    ],
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projetos - Matheus Prado</title>
        <meta
          name="description"
          content="Seleção de projetos com foco em experiências imersivas, interfaces modernas e entregas consistentes."
        />
      </Head>
      <SimpleLayout
        title="Projetos com decisões técnicas claras."
        intro="Uma seleção de produtos em que atuei do planejamento à entrega, conectando objetivos de negócio, experiência e engenharia."
      >
        <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const isNew = isNewProject(project.addedAt)

            return (
              <li key={project.name} className="h-full">
                <Card>
                  <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                    {isNew ? (
                      <Badge className="absolute left-3 top-3 z-10 border-emerald-200 bg-emerald-500 px-3 py-1 text-[10px] tracking-[0.16em] text-white shadow-sm">
                        Novo
                      </Badge>
                    ) : null}
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Capa do projeto ${project.name}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.2),_transparent_55%)] p-10">
                        <Image
                          src={project.logo}
                          alt={`Logo do projeto ${project.name}`}
                          className="max-h-24 w-auto rounded-2xl bg-white p-4 shadow-lg"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Card.Title>{project.name}</Card.Title>
                      </div>
                      <Card.Eyebrow className="mt-1 text-[10px] text-blue-700">
                        {project.role}
                      </Card.Eyebrow>
                    </div>
                  </div>
                  <Card.Description>{project.description}</Card.Description>
                  <ul className="mt-6 space-y-3 border-y border-slate-100 py-5 text-sm text-slate-600">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-700">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 transition hover:text-blue-800"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {project.link.label}
                  </a>
                </Card>
              </li>
            )
          })}
        </ul>
      </SimpleLayout>
    </>
  )
}
