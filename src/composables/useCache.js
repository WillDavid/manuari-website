import { CACHE_TTL } from '../constants/config'

export function useCache() {
  const get = (key) => {
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null

      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp > CACHE_TTL) {
        localStorage.removeItem(key)
        return null
      }
      return data
    } catch {
      return null
    }
  }

  const set = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch (e) {
      console.warn('Cache write failed:', e)
    }
  }

  const remove = (key) => {
    localStorage.removeItem(key)
  }

  const clear = () => {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key)
      }
    })
  }

  return { get, set, remove, clear }
}

export async function fetchWithCache(key, fetcher, ttl = CACHE_TTL) {
  const cache = useCache()
  const cached = cache.get(key)
  
  if (cached) return cached

  const data = await fetcher()
  
  try {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.warn('Cache write failed:', e)
  }
  
  return data
}