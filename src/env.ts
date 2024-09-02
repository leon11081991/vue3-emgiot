const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const apiVersion = import.meta.env.VITE_API_VERSION || 'v1'

if (!apiBaseUrl) {
  throw new Error('Missing VITE_API_BASE_URL')
}

export const env = {
  apiBaseUrl,
  apiVersion
}