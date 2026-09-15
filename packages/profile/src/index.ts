export interface Experience {
  company: string
  period: string
  duration: string
  role: string
  employmentType: string
  location: string
  description: string[]
  responsibilities: string[]
  summary: string
  skills: string
  logo?: string
  cta?: {
    href: string
    label: string
  }
}

export interface ExperiencePayload {
  updatedAt: string
  experiences: Experience[]
}
