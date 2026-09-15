// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Motion'
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import { experiences, profile, profileLinks } from '@/data/profile'
import { getRemoteExperiences } from '@/lib/profile-api'
import Avatar from '@/images/avatar.jpg'

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsappIcon,
}

export default function About({ experiences: remoteExperiences }) {
  const reduceMotion = useReducedMotion()
  const displayedExperiences = remoteExperiences?.length
    ? remoteExperiences
    : experiences

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
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-blue-700">
              sobre mim
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Tecnologia para criar histórias que as pessoas querem revisitar.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              {profile.summary[0]}
            </p>
            {profile.summary.slice(1).map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-slate-600"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" className="px-6">
                Ver projetos
              </Button>
              <Button
                href={`mailto:${profile.email}`}
                variant="secondary"
                className="px-6"
              >
                Falar por e-mail
              </Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {profileLinks.map((link, index) => {
                const Icon = socialIcons[link.id]
                return (
                  <Reveal key={link.label} delay={index * 0.05}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/[0.04] backdrop-blur transition hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                    >
                      <Icon className="h-4 w-4 fill-current" />
                      {link.label}
                    </a>
                  </Reveal>
                )
              })}
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <motion.div
              whileHover={reduceMotion ? undefined : { rotateX: 2, rotateY: -3 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-950/[0.08] backdrop-blur [transform-style:preserve-3d]"
            >
              <div className="flex h-10 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-500">about.jsx</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-full overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={Avatar}
                      alt="Matheus Prado"
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 24rem, 20rem"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent" />
                  </div>
                  <div className="text-center text-sm text-slate-600">
                    {profile.note}
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="space-y-6">
              {displayedExperiences.map((job, index) => (
                <Reveal
                  key={job.company}
                  delay={index * 0.08}
                  className="rounded-[1.25rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm shadow-slate-950/[0.04] backdrop-blur"
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-700">
                      {job.period} · {job.duration}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-slate-950">
                      {job.role} · {job.company}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {job.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    revalidate: 60,
    props: { experiences: (await getRemoteExperiences()) || experiences },
  }
}
// @ts-nocheck
