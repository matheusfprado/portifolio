import { createServer } from 'node:http'
import { randomBytes } from 'node:crypto'

import {
  createLinkedInAuthorizationUrl,
  exchangeLinkedInCode,
} from './linkedin.js'
import { fetchExperiences } from './source.js'
import { readExperiences, writeExperiences } from './store.js'

const port = Number(process.env.PORT || 8787)

function getCookie(request: { headers: { cookie?: string } }, name: string) {
  return request.headers.cookie
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split('=')[1]
}

const server = createServer(async (request, response) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')

  if (request.method === 'GET' && request.url === '/auth/linkedin') {
    const state = randomBytes(24).toString('hex')
    response.setHeader(
      'Set-Cookie',
      `linkedin_oauth_state=${state}; HttpOnly; SameSite=Lax; Path=/; Max-Age=600`
    )
    response.writeHead(302, { Location: createLinkedInAuthorizationUrl(state).toString() })
    response.end()
    return
  }

  if (request.method === 'GET' && request.url?.startsWith('/auth/linkedin/callback')) {
    const callbackUrl = new URL(request.url, `http://localhost:${port}`)
    const providerError = callbackUrl.searchParams.get('error')
    const providerErrorDescription = callbackUrl.searchParams.get('error_description')
    const code = callbackUrl.searchParams.get('code')
    const state = callbackUrl.searchParams.get('state')
    const savedState = getCookie(request, 'linkedin_oauth_state')

    if (providerError) {
      response.writeHead(400)
      response.end(
        JSON.stringify({
          error: providerError,
          error_description: providerErrorDescription,
        })
      )
      return
    }

    if (!code || !state || state !== savedState) {
      response.writeHead(400)
      response.end(JSON.stringify({ error: 'OAuth state invalido' }))
      return
    }

    try {
      await exchangeLinkedInCode(code)
      response.writeHead(302, { Location: '/health' })
      response.end()
    } catch (error) {
      response.writeHead(502)
      response.end(JSON.stringify({ error: String(error) }))
    }
    return
  }

  if (request.method === 'GET' && request.url === '/health') {
    response.writeHead(200)
    response.end(JSON.stringify({ ok: true }))
    return
  }

  if (request.method === 'GET' && request.url === '/experiences') {
    response.writeHead(200)
    response.end(JSON.stringify(await readExperiences()))
    return
  }

  if (request.method === 'POST' && request.url === '/sync') {
    try {
      const payload = await writeExperiences(await fetchExperiences())
      response.writeHead(200)
      response.end(JSON.stringify(payload))
    } catch (error) {
      response.writeHead(502)
      response.end(JSON.stringify({ error: String(error) }))
    }
    return
  }

  response.writeHead(404)
  response.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(port, () => {
  console.log(`Profile API ouvindo em http://localhost:${port}`)
})
