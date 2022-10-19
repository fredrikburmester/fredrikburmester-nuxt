<template>
  <div class="flex flex-col mb-12" v-if="projects">
    <nuxt-link :to="`/project/${project.slug}`" v-for="(project, index) in projects"  :key="project.id">
      <div class="transition-all flex flex-col lg:flex-row lg:place-items-center lg:space-x-10 lg:hover:translate-x-2 lg:duration-300 space-y-8 lg:space-y-0">
        <div :class="imageClasses">
          <img @load="imagesLoaded.push(project.id)" v-if="project.image" :src="img(project.image as string, {quality: 10, width: 736})" alt="project-image" class="rounded-xl">
        </div>
        <div class="flex flex-col space-y-2 prose mt-4">
          <span class="font-bold text-3xl text-black">{{project.title}}</span>
          <div class="flex flex-row space-x-1">
            <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
          </div>
        </div>
      </div>
      <hr v-if="index !== projects.length-1" class="my-8">
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
