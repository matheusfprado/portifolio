const VERCEL_API_URL = 'https://api.vercel.com'

function createVercelHeaders() {
  if (!process.env.VERCEL_TOKEN) {
    return null
  }

  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
  }
}

function createVercelUrl(path, params = {}) {
  const url = new URL(`${VERCEL_API_URL}${path}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  if (process.env.VERCEL_TEAM_ID) {
    url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID)
  }

  return url
}

function normalizeDeploymentUrl(url) {
  if (!url) return null

  return url.startsWith('http') ? url : `https://${url}`
}

async function getVercelProject(projectName) {
  const headers = createVercelHeaders()

  if (!headers || !projectName) {
    return null
  }

  try {
    const response = await fetch(createVercelUrl(`/v9/projects/${projectName}`), {
      headers,
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

async function getLatestProductionDeployment(projectId) {
  const headers = createVercelHeaders()

  if (!headers || !projectId) {
    return null
  }

  try {
    const response = await fetch(
      createVercelUrl('/v6/deployments', {
        projectId,
        target: 'production',
        state: 'READY',
        limit: '1',
      }),
      { headers }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    return data.deployments?.[0] || null
  } catch {
    return null
  }
}

async function getVercelProjectMeta(projectName) {
  const project = await getVercelProject(projectName)
  const deployment = await getLatestProductionDeployment(project?.id)

  if (!project && !deployment) {
    return null
  }

  const productionUrl =
    project?.targets?.production?.alias?.[0] ||
    project?.targets?.production?.url ||
    deployment?.url

  return {
    projectName,
    url: normalizeDeploymentUrl(productionUrl),
    deploymentUrl: normalizeDeploymentUrl(deployment?.url),
    updatedAt: deployment?.createdAt || project?.updatedAt || null,
  }
}

export async function getVercelProjectMap(projectNames) {
  const uniqueProjectNames = [...new Set(projectNames.filter(Boolean))]
  const projects = await Promise.all(
    uniqueProjectNames.map((projectName) => getVercelProjectMeta(projectName))
  )

  return projects.reduce((projectMap, project) => {
    if (project) {
      projectMap[project.projectName] = project
    }

    return projectMap
  }, {})
}
