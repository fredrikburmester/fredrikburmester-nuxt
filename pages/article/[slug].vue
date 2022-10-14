<template>
  <div class="mb-24" v-if="project">
    <main class="">
      <h1 class="font-bold text-3xl lg:text-7xl text-black mb-4">{{project.title}}</h1>
      <span class="italic text-gray-500">Published: {{ formatDate(project.date_created as string) }}</span>
      <div class="flex flex-row space-x-1 my-4">
        <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
      </div>
      <div class="w-full max-h-screen rounded-lg mb-12 overflow-hidden">
        <img :src="getThumbnail(project.image as string)">
      </div>
      <article class="prose" v-html="parse(project.content)"></article>
    </main>
  </div>
</template>


<script setup lang="ts">
import { Page } from '~~/types/generated'
import { parse } from '~~/utils/useMarkdown'
const { getThumbnail } = useDirectusFiles();
const { getItems } = useDirectusItems()
const project = ref<Page>()

const route = useRoute()
console.log(route.fullPath.split('/').pop())

try {
  const data = await getItems<Page[]>({
    collection: 'Page',
    params: {
      fields: ['*', 'image'],
      filter: {
        slug: {
          _eq: route.fullPath.split('/').pop()
        }
      }
    },
  })
  project.value = data[0]
} catch(e) {
  console.log("error", e)
}

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

useHead({
  meta: [
  { hid: 'og:title', property: 'og:title', content: project.value?.title },
  { hid: 'og:image', property: 'og:image', content: project.value?.image },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.NUXT_HOST_NAME + route.fullPath,
  },
  ],
})
</script>
