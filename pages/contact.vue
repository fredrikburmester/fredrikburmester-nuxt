<template>
  <footer class="py-12">
    <article class=" prose">
      <div v-html="parse(page?.content)"></div>
      <span>Email me at: </span>
      <div class="tooltip text-primary cursor-pointer" :data-tip="copyInfoText" @click="copy($event)">
        fredrik.burmester@gmail.com
      </div>.
    </article>
  </footer>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
import {parse} from '~~/utils/useMarkdown'

const { getItems } = useDirectusItems()
const page = ref<Page>()
const imgId = ref<string>('')
const copyInfoText = ref<string>('Click to copy email to clipboard')

const copy = (e: Event) => {
  const el = e.target as HTMLElement
  navigator.clipboard.writeText(el.innerText)
  copyInfoText.value = 'Copied!'
}

try {
  const data = await getItems<Page[]>({
    collection: 'Page',
    params: {
      fields: ['*', 'image'],
      filter: {
        slug: {
          _eq: 'contact'
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
