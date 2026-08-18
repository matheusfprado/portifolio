export function setSsrCache(res, seconds = 3600) {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${seconds}, stale-while-revalidate=${seconds * 12}`
  )
}
