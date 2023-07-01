import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, skills, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Skills>{skills}</Card.Skills>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function speaking() {
  return (
    <>
      <Head>
        <title>Experiencia</title>
        <meta name="description" content="" />
      </Head>
      <SimpleLayout title="Experência">
        <div className="space-y-20">
          <SpeakingSection title="albert">
            <Appearance
              href="https://www.linkedin.com/company/oialbert/mycompany/"
              title="Desenvolvedor de software"
              description="Como Desenvolvedor full-stack no Albert, sou responsável pelo desenvolvimento front-end utilizando Next.js, aplicação de TDD nos aplicativos e também auxilio no back-end. Além disso, realizo ajustes nos aplicativos no front-end para aprimorar sua funcionalidade e usabilidade."
              skills="Competências: Node.js · TypeScript · Next.js · Tailwind · Jest · Japa · Adonis · Postegres"
              event="ago de 2022 - o momento"
              cta="link para linkedin"
            />
          </SpeakingSection>
          <SpeakingSection title="dify tecnologia">
            <Appearance
              href="https://www.linkedin.com/company/dify-tecnologia/"
              title="Estagiário"
              description="Desenvolvimento web com JavaScript, NextJS 
              Trabalhei no frontend da aplicação administrativo de aplicativos, ajudando na correção de bugs e realização de testes unitários e de integração."
              skills="Competências: React.js · JavaScript · TypeScript · Next.js · Tailwind · Jest · Git · GitHub · HTML · CSS"
              event="nov de 2021 - jun de 2022 · 8 meses"
              cta="link para linkedin"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
