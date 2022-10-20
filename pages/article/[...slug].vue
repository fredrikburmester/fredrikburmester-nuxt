<template>
  <div v-if="project">
    <header>
      <h1 class="mb-0">{{project.title}}</h1>
      <span class="text-gray-500">Published: {{ formatDate(project.date_created as string) }}</span>
      <div class="flex flex-row flex-wrap my-4">
        <span class="badge badge-ghost p-2 mr-1 mb-1" v-for="l in project.language">{{l}}</span>
      </div>
    </header>
    <div class="w-screen ml-auto mr-auto max-h-80 rounded-lg mb-12 overflow-hidden grid place-items-center">
      <img class="max-h-80" :src="getThumbnail(project.image as string)">
    </div>
    <main>
      <article v-html="parse(project.content)"></article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Page } from '~~/types/generated'
import { formatDate } from '~~/utils/useFormatDate'

const { getThumbnail } = useDirectusFiles();
const { getItems } = useDirectusItems()
const project = ref<Page>()
const route = useRoute()
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

const config = useRuntimeConfig()

const getFullUrlPath = () => {
  if(process.client)
    return window.location.href
  return config.hostName + route.fullPath.toString()
}

console.log(getFullUrlPath())

useHead({
  meta: [
    { hid: 'og:title', property: 'og:title', content: project.value.title },
    { hid: 'og:image', property: 'og:image', content: `${config.apiBase}assets/${project.value.image}` },
    {
      hid: 'og:url',
      property: 'og:url',
      content: getFullUrlPath(),
    },
  ],
})
</script>


<style>
article {
  max-width: calc(100vw - 2rem);
  word-wrap: break-word;
}

/* a {
  word-wrap: break-word;
} */
</style>
