import type { Experience } from '@portfolio/profile'
import { fetchLinkedInExperiences } from './linkedin.js'

export async function fetchExperiences(): Promise<Experience[]> {
  return fetchLinkedInExperiences()
}
