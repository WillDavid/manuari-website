import { SEO_IMAGE_BY_ORIGINAL } from '../generated/seoImageMap'

export function getSeoImageUrl(url) {
  if (!url) return url

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return url
    }
  }

  return SEO_IMAGE_BY_ORIGINAL[url] || url
}

export function getSeoImageUrls(urls = []) {
  return urls.map((url) => getSeoImageUrl(url))
}
