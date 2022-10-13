import { DirectusFile } from "nuxt-directus/dist/runtime/types"

export default defineEventHandler((id) => {
  const data = fetch(`${process.env.NUXT_API_URL}assets/` + id + '?key=image') as DirectusFile
  return data
})
