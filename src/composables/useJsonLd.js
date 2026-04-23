let currentKey = ''
let currentScript = null

const _inject = (key, data) => {
  if (currentKey === key) return

  try {
    if (currentScript) {
      currentScript.remove()
    }

    const script = document.createElement('script')
    script.id = 'dynamic-json-ld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    currentKey = key
    currentScript = script
  } catch (e) {
    console.warn('JSON-LD injection failed:', e)
  }
}

const _remove = () => {
  if (currentScript) {
    currentScript.remove()
    currentScript = null
    currentKey = ''
  }
}

export function useJsonLd() {
  const inject = (key, data) => _inject(key, data)
  const remove = () => _remove()
  return { inject, remove }
}

export const jsonLd = {
  inject: _inject,
  remove: _remove
}