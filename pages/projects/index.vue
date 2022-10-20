<template>
  <div v-if="projects" class="flex flex-col lg:mt-12">
    <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in projects"  :key="project.id" class=" cursor-pointer">
        <figure class="lg:mb-4 shadow-lg">
          <img :src="img(project.image as string, {quality: 50, width: 736})" class="relative w-screen lg:w-full lg:shadow-xl"/>
        </figure>
        <div class="stats rounded-none shadow-none">
          <div class="stat lg:px-0">
            <div class="stat-value whitespace-pre-wrap max-w-12">{{project.title}}</div>
            <div class="stat-desc" v-if="project.description">{{project.description}}</div>
          </div>
        </div>
        <div class="justify-start flex-wrap lg:px-0 px-5 mb-12">
          <div class="badge badge-success mr-1 mb-1" v-for="l in project.language">{{l}}</div>
        </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
const { getItems } = useDirectusItems()
const projects = ref<Page[]>()
const imagesLoaded = ref<string[]>([])
const { getThumbnail: img } = useDirectusFiles();

definePageMeta({
  middleware: ["pages"]
})

const imageClasses = {
  'w-full': true,
  'lg:w-80': true,
  'h-48': true,
  'rounded-2xl': true,
  'overflow-hidden': true,
  'transition-all': true,
  'shadow-xl': true,
}

const data = await getItems<Page[]>({
  collection: 'Page',
  params: {
    fields: ['*', 'image'],
    filter: {
      type: {
        _eq: 'project'
      }
    }
  },
})
projects.value = data
</script>

<style>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

hr {
  border-color: rgb(201 201 201);
}

</style>
