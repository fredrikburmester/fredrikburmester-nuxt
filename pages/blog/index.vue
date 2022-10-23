<template>
  <div class="flex flex-col justify-start mt-2 lg:mt-12 w-screen px-4 lg:px-0 lg:max-w-3xl mb-12" v-if="loaded">
    <nuxt-link :to="`/blog/${project.slug}`" v-for="project, index in projects">
      <hr class="my-4" v-if="index != 0 && index != projects?.length">
      <div class="flex flex-row  space-x-8 justify-between lg:hover:translate-x-2 duration-300 transition-all py-4">
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
        <div v-if="project.image" style="width: 100%; max-width: 100px; height: auto; max-height: 100px;" class=" overflow-hidden m-0 p-0">
          <img :src="img(project.image as string, {quality: 50, width: 736})" alt="project-image" class="m-0 p-0">
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
import { formatDate } from '~~/utils/useFormatDate'
const { getThumbnail: img } = useDirectusFiles();

const { getItems } = useDirectusItems()
const projects = ref<Page[]>()
const loaded = ref(false)

try {
  const data = await getItems<Page[]>({
    collection: 'Page',
    params: {
      fields: ['*', 'image'],
      filter: {
        type: {
          _eq: 'article'
        },
        status: {
          _eq: 'published'
        }
      },
      sort: ['-date_created']
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
