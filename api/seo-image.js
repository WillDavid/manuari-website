import { SEO_IMAGE_BY_ALIAS } from '../src/generated/seoImageMap.js'

export default async function handler(req, res) {
  const aliasPath = Array.isArray(req.query.path)
    ? req.query.path.join('/')
    : req.query.path

  const normalizedPath = decodeURIComponent(String(aliasPath || '')).replace(/^\/+/, '')
  const lookupKeys = [
    normalizedPath,
    `seo-images/${normalizedPath}`
  ]

  const remoteUrl = lookupKeys
    .map((key) => SEO_IMAGE_BY_ALIAS[key])
    .find(Boolean)

  if (!remoteUrl) {
    res.statusCode = 404
    res.end('Image not found')
    return
  }

  const response = await fetch(remoteUrl)

  if (!response.ok) {
    res.statusCode = response.status
    res.end('Image fetch failed')
    return
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg'
  const buffer = Buffer.from(await response.arrayBuffer())

  res.setHeader('Content-Type', contentType)
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.statusCode = 200
  res.end(buffer)
}
