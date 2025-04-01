export function getApiUrl(path: string) {
  return `${process.env.API_URL}/${path}`
}
