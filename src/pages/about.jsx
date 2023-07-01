import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import Matheus from '@/images/matheus.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Matheus Prado</title>
        <meta
          name="description"
          content="Olá, me chamo Matheus Prado e sou desenvolvedor Fullstack"
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={Matheus}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Olá, me chamo Matheus Prado e sou desenvolvedor Fullstack
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Desde pequeno, sempre fui apaixonado por tecnologia e ciência.
                Iniciei minha jornada na área de TI aos 9 anos, realizando
                cursos de digitação, manutenção de computadores e redes, além de
                adquirir conhecimento em sistemas operacionais como Windows e
                Linux.
              </p>
              <p>
                Embora tenha me desviado um pouco do caminho da tecnologia ao
                seguir pela ciência, em 2021 decidi retornar à área e comecei a
                estudar e estagiar em programação. Em 2022, tive a oportunidade
                de ingressar como desenvolvedor júnior, atuando como fullstack.
                A cada dia, minha paixão por essa área cresce e vejo um desejo
                genuíno de desenvolver minha carreira.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://github.com/matheusfprado"
                icon={GitHubIcon}
                className="mt-4"
              >
                Siga no GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/matheus-felipe-267079249/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Siga no LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:matheusfp.dev@gmail.com"
                icon={MailIcon}
                className="mt-4"
              >
                matheusfp.dev@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
