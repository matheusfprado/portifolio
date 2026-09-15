import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { Experience, ExperiencePayload } from '@portfolio/profile'

const dataFile = path.resolve(
  process.env.PROFILE_DATA_FILE || 'data/experiences.json'
)

export async function readExperiences(): Promise<ExperiencePayload> {
  try {
    const content = await readFile(dataFile, 'utf8')
    return JSON.parse(content) as ExperiencePayload
  } catch {
    return { updatedAt: new Date(0).toISOString(), experiences: [] }
  }
}

export async function writeExperiences(experiences: Experience[]) {
  await mkdir(path.dirname(dataFile), { recursive: true })
  const payload: ExperiencePayload = {
    updatedAt: new Date().toISOString(),
    experiences,
  }
  await writeFile(dataFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  return payload
}
