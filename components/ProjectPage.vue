<template>
  <div class="mb-24" v-if="project">
    <!-- <img :src="getThumbnail(project?.image as string || '')" class="rounded-lg mb-12" alt=""> -->
    <div>
    </div>
    <main class="prose">
      <h1 class="mb-0">{{project.title}}</h1>
      <span class="italic text-gray-500">Published: {{ formatDate(project.date_created as string) }}</span>
      <div class="flex flex-row space-x-1 my-4">
          <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
      </div>
      <article v-html="parse(project?.content)"></article>
    </main>
  </div>
</template>


<script setup lang="ts">
import { Page } from '~~/types/generated'

definePageMeta({
  middleware: ["pages"]
})

// props
defineProps<{
  project: Page
}>()

const { getThumbnail } = useDirectusFiles();
// const { getItems } = useDirectusItems()
// const project = ref<Page>()
// const route = useRoute()

// try {
//   const data = await getItems<Page[]>({
//     collection: 'Page',
//     params: {
//       fields: ['*', 'image'],
//       filter: {
//         slug: {
//           _eq: route.fullPath.split('/').pop()
//         }
//       }
//     },
//   })

//   project.value = data[0]
// } catch(e) {
//   console.log("error", e)
// }

const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}
</script>
