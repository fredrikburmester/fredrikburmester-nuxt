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
        <button v-if="project.github" class="btn btn-sm btn-primary">
          <a :href="project.github" class="text-white no-underline">
            Github
          </a>
        </button>
        <button v-if="project.website" class="btn btn-sm btn-primary">
          <a :href="project.website" class="text-white no-underline">
            Website
          </a>
        </button>
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
</script>
