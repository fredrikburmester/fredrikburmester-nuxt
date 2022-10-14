<template>
  <div class="flex flex-col" v-if="loaded">
    <transition-group name="list">
    <nuxt-link :to="`/article/${project.slug}`" v-for="project in projects" class="[&:not(:last-child)]:border-b pb-8 [&:not(:last-child)]:border-gray-200 lg:hover:translate-x-2 justify-evenly group flex flex-col lg:[&:nth-child(odd)]:flex-row lg:[&:nth-child(even)]:flex-row-reverse lg:place-items-center mb-8 lg:space-x-8 space-y-4 lg:space-y-0 transition-all">
      <div v-if="project.image" class="w-full lg:w-80 h-48 rounded-2xl overflow-hidden  transition-all shadow-xl">
        <img :src="img(project.image, {quality: 50, width: 736})" alt="project-image" class="rounded-2xl">
      </div>
      <div v-if="!project.image" class=" w-80 h-48 cover animate-pulse bg-gray-100 rounded-2xl"></div>
      <div class="flex flex-col space-y-2 prose">
        <h1 class="mb-0">{{project.title}}</h1>
        <div class="flex flex-row space-x-1">
          <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
        </div>
      </div>
    </nuxt-link>
        </transition-group>
  </div>
  <div v-else>
    TJOOO
  </div>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
import { parse } from '~~/utils/useMarkdown'
const { getThumbnail: img } = useDirectusFiles();

const { getItems } = useDirectusItems()
const projects = ref<Page[]>()
const loaded = ref(false)

const imgLoaded = (e: Event, img: string) => {
  const el = e.target as HTMLImageElement
  el.classList.remove('hidden')
}

try {
  const data = await getItems<Page[]>({
    collection: 'Page',
    params: {
      fields: ['*', 'image'],
      filter: {
        type: {
          _eq: 'article'
        }
      }
    },
  })
  projects.value = data
  loaded.value = true

} catch(e) {
  console.log("error", e)
}

</script>


<style>
.fade-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
