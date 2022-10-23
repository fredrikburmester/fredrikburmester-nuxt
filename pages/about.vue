<template>
  <div>
    <div class="avatar lg:pt-12 mb-6">
      <div class="h-94 w-screen lg:w-48 lg:rounded-full shadow-sm">
        <img v-if="page?.image" :src="getThumbnail(imgId, {width: 600})" class="relative top-0 left-0"/>
      </div>
    </div>
    <main class="">
      <article class="prose" v-html="parse(page?.content)"></article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Page } from '~~/types/generated'

const { getItems } = useDirectusItems()
const { getThumbnail } = useDirectusFiles();

const page = ref<Page>()
const imgId = ref<string>('')

try {
  const data = await getItems<Page[]>({
    collection: 'Page',
    params: {
      fields: ['*', 'image'],
      filter: {
        slug: {
          _eq: 'about'
        }
      }
    },
  })


  page.value = data[0]
  imgId.value = data[0].image as string

} catch(e) {
  console.log("error", e)
}


</script>
