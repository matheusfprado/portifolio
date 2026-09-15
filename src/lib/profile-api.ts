import { experiences as localExperiences } from '@/data/profile'

type Experience = (typeof localExperiences)[number]

interface ExperienceResponse {
  experiences?: Experience[]
}

export async function getRemoteExperiences(): Promise<Experience[] | null> {
  const apiUrl = process.env.PROFILE_API_URL

  if (!apiUrl) return null

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, '')}/experiences`, {
      signal: AbortSignal.timeout(2000),
    })

    if (!response.ok) return null

    const payload = (await response.json()) as ExperienceResponse
    return payload.experiences?.length ? payload.experiences : null
  } catch {
    return null
  }
}
