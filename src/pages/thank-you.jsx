import Head from 'next/head'

import { SimpleLayout } from '@/components/SimpleLayout'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Obrigado por se inscrever - Matheus Prado</title>
        <meta
          name="description"
          content="Receba novidades sobre novos projetos e conteúdos imersivos."
        />
      </Head>
      <SimpleLayout
        title="Inscrição concluída com sucesso."
        intro="Eu aviso você sempre que lançar um novo artigo, projeto ou experimento criativo. Enquanto isso, fique à vontade para explorar os projetos e conectar comigo nas redes."
      />
    </>
  )
}
