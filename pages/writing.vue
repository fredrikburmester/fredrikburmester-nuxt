<template>
  <div class="flex flex-col justify-start" v-if="loaded">
    <transition-group name="list">
    <nuxt-link :to="`/article/${project.slug}`" v-for="project in projects" class="">
      <div class="flex flex-row  space-x-8 justify-between hover:scale-105 duration-500 transition-all">

        <div class="flex flex-col prose">
          <h2 class="mb-0">{{project.title}}</h2>
          <p v-if="project.description">{{project.description}}</p>
          <span class="mt-auto my-2">{{ formatDate(project.date_created as string)}}</span>
          <div class="flex flex-col space-y-2">
            <div class="flex flex-row flex-wrap">
              <span class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</span>
            </div>
          </div>
        </div>
        <div style="width: 100%; max-width: 100px; height: auto; max-height: 100px;" class=" overflow-hidden m-0 p-0">
          <img v-if="project.image" :src="img(project.image as string, {quality: 50, width: 736})" alt="project-image" class="m-0 p-0">
        </div>

      </div>

      <hr class="my-8">
    </nuxt-link>
        </transition-group>
  </div>
  <div v-else>
    TJOOO
  </div>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
import { formatDate } from '~~/utils/useFormatDate'
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
