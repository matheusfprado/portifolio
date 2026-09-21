// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { ParallaxLayer, Reveal } from '@/components/Motion'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Badge } from '@/components/ui/badge'
import { getGitHubRepositoryMap } from '@/lib/github'
import { getVercelProjectMap } from '@/lib/vercel'

import LogoINH from '@/images/logos/InvestHub.png'

const NEW_PROJECT_WINDOW_IN_DAYS = 30

function isNewProject(addedAt) {
  if (!addedAt) return false

  const addedAtDate = new Date(`${addedAt}T00:00:00`)
  const expiresAt = new Date(addedAtDate)
  expiresAt.setDate(expiresAt.getDate() + NEW_PROJECT_WINDOW_IN_DAYS)

  return Date.now() < expiresAt.getTime()
}

const curatedProjects = [
  {
    name: 'InvestHub',
    featured: true,
    repository: 'next-login',
    vercelProject: 'next-login',
    description:
      'Login e dashboard de cripto com dados em tempo real. Experiência focada em onboarding fluido, gráficos dinâmicos e responsividade completa.',
    link: {
      href: 'https://investhub.prado-labs.com/',
      label: 'Ver projeto',
    },
    logoImage: LogoINH,
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_48%),#f8fafc]',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
    role: 'Fullstack',
    highlights: [
      'Onboarding orientado por contexto',
      'Dados em tempo real no dashboard',
      'Interface responsiva para desktop e mobile',
    ],
  },
  {
    name: 'Luma',
    repository: 'luma-app',
    vercelProject: 'luma-app',
    description:
      'Planner mobile-first para rotina, tarefas, leitura e playlists, com Supabase, RLS e notificações push.',
    link: {
      href: 'https://github.com/matheusfprado/luma-app',
      label: 'Ver repositório',
    },
    logoImage: '/project-logos/luma.png',
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_48%),#fdf2f8]',
    addedAt: '2026-08-12',
    role: 'Produto e fullstack',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Zod'],
    highlights: [
      'Monorepo com pacotes compartilhados',
      'Supabase com RLS e migrations',
      'Fluxos mobile-first com rotina e notificações',
    ],
  },
  {
    name: 'Frank Tattoo',
    repository: 'tattoo-landing',
    vercelProject: 'tattoo-landing',
    description:
      'Site institucional para estúdio de tatuagem, com identidade visual forte e apresentação direta dos serviços.',
    link: {
      href: 'https://frank-tatto.prado-labs.com/',
      label: 'Ver projeto',
    },
    logoImage: '/project-logos/frank-tattoo.png',
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.14),_transparent_48%),#fff7ed]',
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
    repository: 'anime',
    vercelProject: 'anime',
    description:
      'Plataforma com identidade visual imersiva para uma comunidade de fãs de anime.',
    link: {
      href: 'https://animeverse.prado-labs.com/',
      label: 'Ver projeto',
    },
    logoImage: '/project-logos/animeverse.png',
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_48%),#eef2ff]',
    addedAt: '2026-06-24',
    role: 'Web design e desenvolvimento',
    tags: ['Next.js', 'React', 'Tailwind'],
    highlights: [
      'Direção visual inspirada no universo anime',
      'Interface pensada para engajamento da comunidade',
      'Layout responsivo e orientado a conteúdo',
    ],
  },
  {
    name: 'Web Scrappin',
    repository: 'web-scrappin',
    description:
      'Ferramenta em Node.js para coletar produtos em marketplaces, ordenar por preço e exportar dados estruturados.',
    link: {
      href: 'https://github.com/matheusfprado/web-scrappin',
      label: 'Ver repositório',
    },
    addedAt: '2026-06-24',
    role: 'Backend e automação',
    tags: ['Node.js', 'TypeScript', 'Playwright', 'Express'],
    highlights: [
      'Scraping com Chromium automatizado',
      'API HTTP para executar buscas',
      'Exportação de resultados para Excel',
    ],
    logoText: 'Web Scrappin',
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_48%),#f0f9ff]',
  },
  {
    name: 'Infinity Identiface',
    repository: 'projeto-faceid',
    vercelProject: 'projeto-faceid',
    description:
      'Laboratório multimodal no navegador com reconhecimento facial, áudio, avatares e dashboard em tempo real.',
    link: {
      href: 'https://github.com/matheusfprado/projeto-faceid',
      label: 'Ver repositório',
    },
    logoImage: '/project-logos/faceid.ico',
    coverClass: 'bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_48%),#faf5ff]',
    role: 'IA no navegador',
    tags: ['Next.js', 'TensorFlow', 'face-api.js', 'Web Audio'],
    highlights: [
      'Reconhecimento facial com modelos locais',
      'Análise de áudio e expressões',
      'Dashboard com métricas em tempo real',
    ],
  },
]

function formatDate(date) {
  if (!date) return null

  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function ProjectCover({ project }) {
  if (project.logoImage) {
    return (
      <div className={`group relative flex h-full items-center justify-center overflow-hidden p-6 ${project.coverClass || 'bg-slate-50'}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1/2 translate-x-[-35%] rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[35%] group-hover:opacity-100"
        />
        <ParallaxLayer
          offset={26}
          className="relative w-full max-w-md overflow-hidden rounded-[1rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/[0.12] transition duration-500 will-change-transform group-hover:-translate-y-1 group-hover:rotate-1 group-hover:scale-[1.035]"
        >
          <div className="flex h-9 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-[10px] font-medium text-slate-400">
              {project.repository}
            </span>
          </div>
          <div className="flex min-h-40 items-center justify-center p-8">
            <Image
              src={project.logoImage}
              alt={`Logo do projeto ${project.name}`}
              width={220}
              height={220}
              className="max-h-28 w-auto object-contain"
            />
          </div>
        </ParallaxLayer>
      </div>
    )
  }

  return (
    <div
      className={`group relative flex h-full items-center justify-center overflow-hidden p-6 ${project.coverClass || 'bg-slate-50'}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1/2 translate-x-[-35%] rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[35%] group-hover:opacity-100"
      />
      <div className="relative rounded-[1rem] border border-slate-200 bg-white px-6 py-5 text-center shadow-lg shadow-slate-950/[0.08] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-1 group-hover:scale-105">
        <p className="text-xl font-semibold tracking-tight text-slate-950">
          {project.logoText || project.name}
        </p>
      </div>
    </div>
  )
}

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

export default function Projects({ projects }) {
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
          {projects.map((project, index) => {
            const isNew = isNewProject(project.addedAt)
            const isFeatured = project.featured

            return (
              <Reveal
                key={project.name}
                as="li"
                delay={index * 0.05}
                className={isFeatured ? 'h-full md:col-span-2' : 'h-full'}
              >
                <Card className={isFeatured ? 'md:p-8' : undefined}>
                  {project.logoImage || project.logoText ? (
                    <div
                      className={
                        isFeatured
                          ? 'relative mb-8 aspect-[21/9] overflow-hidden rounded-[1rem] border border-slate-200 bg-slate-50'
                          : 'relative mb-6 aspect-[16/9] overflow-hidden rounded-[1rem] border border-slate-200 bg-slate-50'
                      }
                    >
                      {isNew ? (
                        <Badge className="absolute left-3 top-3 z-10 border-emerald-200 bg-emerald-500 px-3 py-1 text-[10px] tracking-[0.16em] text-white shadow-sm">
                          Novo
                        </Badge>
                      ) : null}
                      <ProjectCover project={project} />
                    </div>
                  ) : isNew ? (
                    <Badge className="mb-4 w-fit border-emerald-200 bg-emerald-500 px-3 py-1 text-[10px] tracking-[0.16em] text-white shadow-sm">
                      Novo
                    </Badge>
                  ) : null}
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Card.Title>{project.name}</Card.Title>
                        {isFeatured ? (
                          <Badge className="border-blue-200 bg-blue-50 px-3 py-1 text-[10px] tracking-[0.16em] text-blue-700">
                            Destaque
                          </Badge>
                        ) : null}
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
                  <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-600">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.github ? (
                    <dl className="mt-6 grid grid-cols-3 gap-3 text-xs">
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3">
                        <dt className="text-slate-500">Linguagem</dt>
                        <dd className="mt-1 font-semibold text-slate-950">
                          {project.github.language || 'N/A'}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3">
                        <dt className="text-slate-500">Stars</dt>
                        <dd className="mt-1 font-semibold text-slate-950">
                          {project.github.stars}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3">
                        <dt className="text-slate-500">Update</dt>
                        <dd className="mt-1 font-semibold text-slate-950">
                          {formatDate(project.github.updatedAt)}
                        </dd>
                      </div>
                    </dl>
                  ) : null}
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 transition hover:text-blue-900"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {project.link.label}
                  </a>
                  {project.github?.url &&
                  project.github.url !== project.link.href ? (
                    <a
                      href={project.github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 transition hover:text-blue-700"
                    >
                      <LinkIcon className="h-4 w-4" />
                      Repositório
                    </a>
                  ) : null}
                </Card>
              </Reveal>
            )
          })}
        </ul>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const [repositories, vercelProjects] = await Promise.all([
    getGitHubRepositoryMap(curatedProjects.map((project) => project.repository)),
    getVercelProjectMap(curatedProjects.map((project) => project.vercelProject)),
  ])

  return {
    revalidate: 300,
    props: {
      projects: curatedProjects.map((project) => {
        const github = repositories[project.repository] || null
        const vercel = vercelProjects[project.vercelProject] || null
        const liveUrl = vercel?.url || github?.homepage

        return {
          ...project,
          github,
          vercel,
          link: liveUrl
            ? {
                href: liveUrl,
                label: 'Ver projeto',
              }
            : project.link,
        }
      }),
    },
  }
}
// @ts-nocheck
