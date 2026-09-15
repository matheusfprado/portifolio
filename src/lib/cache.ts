// @ts-nocheck
export function setSsrCache(res: { setHeader: (name: string, value: string) => void }, seconds = 3600) {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${seconds}, stale-while-revalidate=${seconds * 12}`
  )
}
// @ts-nocheck
