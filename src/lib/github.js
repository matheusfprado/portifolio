const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_OWNER = 'matheusfprado'

function createGitHubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'matheus-prado-portfolio',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

async function getGitHubRepository(repositoryName) {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${GITHUB_OWNER}/${repositoryName}`,
      {
        headers: createGitHubHeaders(),
      }
    )

    if (!response.ok) {
      return null
    }

    const repository = await response.json()

    return {
      name: repository.name,
      description: repository.description,
      language: repository.language,
      stars: repository.stargazers_count,
      updatedAt: repository.updated_at,
      url: repository.html_url,
      homepage: repository.homepage,
    }
  } catch {
    return null
  }
}

export async function getGitHubRepositoryMap(repositoryNames) {
  const repositories = await Promise.all(
    repositoryNames.map((repositoryName) => getGitHubRepository(repositoryName))
  )

  return repositories.reduce((repositoryMap, repository) => {
    if (repository) {
      repositoryMap[repository.name] = repository
    }

    return repositoryMap
  }, {})
}
