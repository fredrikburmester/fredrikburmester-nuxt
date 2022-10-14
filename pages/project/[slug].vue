<template>
  <div class="mb-24" v-if="project">
    <main class="prose">
      <h1 class="mb-0">{{project.title}}</h1>
      <span class="italic text-gray-400 ml-1">Published: {{ formatDate(project.date_created as string) }}</span>
      <div class="flex flex-row space-x-1 my-4">
        <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
      </div>
      <hr class="my-8">
      <div class="flex flex-row space-x-2">
        <a :href="project.github" class="text-white no-underline">
          <button v-if="project.github" class="btn btn-sm text-white btn-black justify-center flex">
            <Icon name="uil:github"  class="mr-2  scale-150"/>
            Github
            <Icon name="ic:baseline-open-in-new"  class="ml-2  scale-110"/>
          </button>
        </a>
        <a :href="project.website" class=" no-underline">
        <button v-if="project.website" class="btn text-white btn-sm btn-primary">
            Website
            <Icon name="ic:baseline-open-in-new"  class="ml-2  scale-110"/>

          </button>
        </a>
      </div>

      <img :src="getThumbnail(project?.image as string || '')" class="rounded-lg mb-12 w-full" alt="">
      <article v-html="parse(project?.content)"></article>

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

onMounted(() => {
  scroll(0,0)
})

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

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

const config = useRuntimeConfig()

const getFullUrlPath = () => {
  if(process.client)
    return window.location.href
  return config.hostName + route.fullPath.toString()
}

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
