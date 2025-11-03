import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'

function Article({ article }) {
  return (
    <article>
      <Card>
        <Card.Title
          href={`/articles/${article.slug}`}
          className="text-2xl font-semibold"
        >
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="mt-3"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Ler artigo</Card.Cta>
      </Card>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Artigos - Matheus Prado</title>
        <meta
          name="description"
          content="Reflexões sobre desenvolvimento, arquitetura e experiências digitais."
        />
      </Head>
      <SimpleLayout
        title="Conteúdo para quem vive web moderna."
        intro="Compartilho experiências sobre arquitetura frontend, back-end escalável, animações 3D e o que aprendo construindo produtos digitais."
      >
        <div className="flex max-w-3xl flex-col space-y-12">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
