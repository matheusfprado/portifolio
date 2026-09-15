import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

interface LinkedInToken {
  access_token: string
  refresh_token?: string
  expires_at: number
}

const tokenFile = path.resolve(
  process.env.LINKEDIN_TOKEN_FILE || 'data/linkedin-token.json'
)

export async function readLinkedInToken(): Promise<LinkedInToken | null> {
  try {
    const token = JSON.parse(await readFile(tokenFile, 'utf8')) as LinkedInToken
    return token.expires_at > Date.now() + 60_000 ? token : null
  } catch {
    return null
  }
}

export async function writeLinkedInToken(token: LinkedInToken) {
  await mkdir(path.dirname(tokenFile), { recursive: true })
  await writeFile(tokenFile, `${JSON.stringify(token, null, 2)}\n`, 'utf8')
}
