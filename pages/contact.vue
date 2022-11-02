<template>
  <footer class="py-12 bg-black text-white prose px-4">
    <h1 class="text-white">Contact me</h1>
    <p>Have a question about my work? Want to work together? Don't hesitate to reach out!</p>
    <span>Email me at:&nbsp;</span>
    <div class="tooltip text-primary cursor-pointer" :data-tip="copyInfoText" @click="copy($event)">
       fredrik.burmester@gmail.com
    </div>.
  </footer>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'

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
