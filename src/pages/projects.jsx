import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import LogoINH from '@/images/logos/InvestHub.png'

const projects = [
  {
    name: 'InvestHub',
    description:
      'Login e dashboard de cripto com dados em tempo real. Experiência focada em onboarding fluido, gráficos dinâmicos e responsividade completa.',
    link: {
      href: 'https://next-login-two.vercel.app/dashboard',
      label: 'Ver demo',
    },
    logo: LogoINH,
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
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
        title="Projetos que misturam estética, performance e estratégia."
        intro="Uma curadoria de experiências digitais em que atuei do planejamento ao desenvolvimento. Sempre buscando conectar objetivos de negócio a interfaces cativantes."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <li key={project.name} className="h-full">
              <Card>
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center rounded-2xl border border-orange-200/60 bg-white p-2 shadow-sm">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      className=" w-20 "
                      unoptimized
                    />
                  </span>
                  <div>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Eyebrow className="mt-1 text-[10px] text-orange-600">
                      {project.tags.join(' · ')}
                    </Card.Eyebrow>
                  </div>
                </div>
                <Card.Description>{project.description}</Card.Description>
                <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.4em] text-orange-600">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-orange-200/60 bg-white px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={project.link.href}
                  className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-500 transition hover:text-orange-700"
                >
                  <LinkIcon className="h-4 w-4" />
                  {project.link.label}
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
