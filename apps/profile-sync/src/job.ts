import { fetchExperiences } from './source.js'
import { writeExperiences } from './store.js'

try {
  const experiences = await fetchExperiences()
  const payload = await writeExperiences(experiences)
  console.log(`Perfil sincronizado: ${payload.experiences.length} experiencias`)
} catch (error) {
  console.error('Falha ao sincronizar experiencias:', error)
  process.exitCode = 1
}
