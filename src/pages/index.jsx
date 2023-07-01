import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsappIcon,
} from '@/components/SocialIcons'
import logoAdonis from '@/images/logos/adonisjs.svg'
import logoReact from '@/images/logos/react.png'
import logoNext from '@/images/logos/next.svg'
import logoTailwind from '@/images/logos/tailwind.svg'
import logoTypescript from '@/images/logos/typescript.svg'
import logoNodejs from '@/images/logos/nodejs.svg'
import logoJavascript from '@/images/logos/javascript.svg'
import logoCss from '@/images/logos/css3.svg'
import logoHtml from '@/images/logos/html5.svg'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      title: 'Adonis.js',
      company: 'Udemy',
      logo: logoAdonis,
      start: 'JUN-2023',
      end: 'JUN-2023'
      // end: {
      //   label: 'PRESENT',
      //   dateTime: new Date().getFullYear(),
      // },
    },
    {
      title: 'React.js',
      company: 'Udemy',
      logo: logoReact,
      start: 'JAN-2022',
      end: 'MAR-2022',
    },
    {
      title: 'Next.js',
      company: 'Udemy',
      logo: logoNext,
      start: 'JAN-2022',
      end: 'MAR-2022',
    },
    {
      title: 'Tailwind CSS',
      company: 'Udemy',
      logo: logoTailwind,
      start: 'JAN-2022',
      end: 'MAR-2022',
    },
    {
      title: 'Typescript',
      company: 'Udemy',
      logo: logoTypescript,
      start: 'JAN-2022',
      end: 'MAR-2022',
    },
    {
      title: 'Node.js',
      company: 'Rockseat',
      logo: logoNodejs,
      start: 'SET-2021',
      end: 'DEZ-2021',
    },
    {
      title: 'JavaScript',
      company: 'Rockseat',
      logo: logoJavascript,
      start: 'SET-2021',
      end: 'DEZ-2021',
    },
    {
      title: 'CSS3',
      company: 'Rockseat',
      logo: logoCss,
      start: 'SET-2021',
      end: 'DEZ-2021',
    },
    {
      title: 'HTML5',
      company: 'Rockseat',
      logo: logoHtml,
      start: 'SET-2021',
      end: 'DEZ-2021',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Competências</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.title}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.company}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="https://drive.google.com/file/d/1dQMzfr-6-Uq5NJZeaXlx0eZf7M7VfBY1/view?usp=sharing"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex-wrap justify-center overflow-hidden py-4 sm:gap-8">
        {[image1, image2].map((image) => (
          <div
            key={image.src}
            className={
              'relative aspect-[9/10] w-44 overflow-hidden rounded-lg sm:w-72 sm:rounded-2xl'
            }
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 20rem, 11rem"
              className="relative inset-1 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Matheus Felipe Do Prado - Desenvolvedor Fullstack</title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Desenvolvedor Fullstack
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Olá, sou Matheus Felipe do Prado, um desenvolvedor de software
            apaixonado por tecnologia e inovação. Com uma busca constante por
            atualização e consistência no mercado, estou sempre empenhado em
            encontrar as melhores soluções para resolver problemas. Meu objetivo
            é criar soluções eficientes e impactantes, impulsionando o mundo
            digital com meu conhecimento e habilidades em desenvolvimento.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://api.whatsapp.com/send?phone=5516996356302"
              aria-label="Follow on whatsapp"
              icon={WhatsappIcon}
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="-mt-20 grid-cols-4 gap-16">
            <Photos />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
