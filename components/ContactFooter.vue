<template>
  <footer id="footer" class="lg:py-12 py-6 bg-black text-white prose min-w-full flex lg:flex-row flex-col px-4 fixed bottom-0 left-0 -z-10 justify-between">
    <div class="text-start">
      <h1 class="text-white mb-1">Contact me</h1>
      <p class="m-0">Have a question about my work? Want to work together? Don't hesitate to reach out!</p>
      <span>Email me at:</span>
      <div class="tooltip text-primary cursor-pointer" :data-tip="copyInfoText" @click="copy($event)">
        fredrik.burmester@gmail.com
      </div>
    </div>
    <div class="lg:text-end flex flex-col mt-8 lg:mt-0">
      <h1 class="text-white mb-1">Social Links</h1>
      <nuxt-link to="https://instagram.com/fredrikburmester" class="m-0 text-white cursor-pointer">
          Instagram
      </nuxt-link>
      <nuxt-link to="https://github.com/fredrikburmester" class="m-0 text-white cursor-pointer">
          Github
      </nuxt-link>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'

const { getItems } = useDirectusItems()
const page = ref<Page>()
const imgId = ref<string>('')
const copyInfoText = ref<string>('Click to copy email to clipboard')

onMounted(() => {
  const { $lenis } = useNuxtApp()

  if($lenis) {
    $lenis.on('scroll', ({ scroll, limit, velocity, direction, progress } : {scroll: number, limit: number, velocity: number, direction: string, progress: number}) => {
      const footer = document.getElementById('footer') as HTMLDivElement
      if (footer && Math.abs(scroll - limit) < 1) footer.setAttribute("style", "z-index: 1000;");
      else if (footer) footer.setAttribute("style", "z-index: 0;");
    })
  }
})

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
