<template>
  <div>
    <div class="avatar pb-12">
      <div class="h-48 w-48 rounded-full shadow-sm">
        <img v-if="page?.image" :src="getThumbnail(imgId)" class="relative top-0 left-0"/>
      </div>
    </div>
    <main>
      <article class="prose" v-html="parse(page?.content)"></article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Page } from '~~/types/generated'
import { parse } from '~~/utils/useMarkdown'

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
