import type { Experience } from '@portfolio/profile'

import { readLinkedInToken, writeLinkedInToken } from './token-store.js'

const authorizationUrl = 'https://www.linkedin.com/oauth/v2/authorization'
const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'
const defaultApiUrl = 'https://api.linkedin.com/rest/identityMe'

interface LinkedInTokenResponse {
  access_token: string
  expires_in: number
  refresh_token?: string
  refresh_token_expires_in?: number
}

interface LinkedInExperienceRecord {
  companyName?: string
  organizationName?: string
  company?: { name?: string }
  title?: string
  role?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: string
}

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} nao foi configurada`)
  return value
}

export function createLinkedInAuthorizationUrl(state: string) {
  const url = new URL(authorizationUrl)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', getRequiredEnv('LINKEDIN_CLIENT_ID'))
  url.searchParams.set('redirect_uri', getRequiredEnv('LINKEDIN_REDIRECT_URI'))
  url.searchParams.set(
    'scope',
    process.env.LINKEDIN_SCOPES || 'openid'
  )
  url.searchParams.set('state', state)
  return url
}

export async function exchangeLinkedInCode(code: string) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: getRequiredEnv('LINKEDIN_CLIENT_ID'),
    client_secret: getRequiredEnv('LINKEDIN_CLIENT_SECRET'),
    redirect_uri: getRequiredEnv('LINKEDIN_REDIRECT_URI'),
  })

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(5000),
  })

  if (!response.ok) {
    throw new Error(`LinkedIn token respondeu HTTP ${response.status}`)
  }

  const token = (await response.json()) as LinkedInTokenResponse
  await writeLinkedInToken({
    ...token,
    expires_at: Date.now() + token.expires_in * 1000,
  })
}

function normalizeExperience(record: LinkedInExperienceRecord): Experience {
  const company =
    record.companyName || record.organizationName || record.company?.name

  if (!company || !record.title) {
    throw new Error('Resposta do LinkedIn nao possui empresa e cargo')
  }

  const period = [record.startDate, record.endDate || 'atual']
    .filter(Boolean)
    .join(' - ')

  return {
    company,
    period,
    duration: '',
    role: record.title || record.role || '',
    employmentType: '',
    location: record.location || '',
    description: record.description ? [record.description] : [],
    responsibilities: [],
    summary: record.description || '',
    skills: '',
  }
}

export async function fetchLinkedInExperiences(): Promise<Experience[]> {
  const token = await readLinkedInToken()
  if (!token) {
    throw new Error('Token do LinkedIn ausente ou expirado. Acesse /auth/linkedin')
  }

  const response = await fetch(
    process.env.LINKEDIN_EXPERIENCE_API_URL || defaultApiUrl,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'LinkedIn-Version': process.env.LINKEDIN_VERSION || '202510.03',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      signal: AbortSignal.timeout(5000),
    }
  )

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        'O aplicativo nao possui permissao para consultar experiencias no LinkedIn.'
      )
    }
    throw new Error(`LinkedIn perfil respondeu HTTP ${response.status}`)
  }

  const payload = (await response.json()) as {
    experiences?: LinkedInExperienceRecord[]
    positions?: LinkedInExperienceRecord[]
  }
  const records = payload.experiences || payload.positions || []

  if (!records.length) {
    throw new Error(
      'LinkedIn nao retornou experiencias. Verifique o produto e as permissoes do aplicativo.'
    )
  }

  return records.map(normalizeExperience)
}
