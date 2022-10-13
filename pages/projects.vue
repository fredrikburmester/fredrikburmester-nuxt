<template>
  <div class="flex flex-col" v-if="loaded">
    <!-- <NuxtPage :project="selectedProject" /> -->
    <transition-group name="list">
      <nuxt-link :to="`/project/${project.slug}`" v-for="project in projects" class="[&:not(:last-child)]:border-b pb-8 [&:not(:last-child)]:border-gray-200 group flex flex-col lg:flex-row lg:place-items-center mb-8 lg:space-x-10 hover:translate-x-2  space-y-8 lg:space-y-0 transition-all">
        <div :class="imageClasses">
          <img v-if="project.image" :src="img(project.image as string)" alt="project-image" class="rounded-xl">
        </div>
        <div v-if="!project.image" class=" w-80 h-48 cover animate-pulse bg-gray-100 rounded-xl"></div>
        <div class="flex flex-col space-y-2 prose">
          <span class="font-bold text-3xl text-black">{{project.title}}</span>
          <div class="flex flex-row space-x-1">
            <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
          </div>
        </div>
      </nuxt-link>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { Page } from '~~/types/generated'
const { getItems } = useDirectusItems()
const projects = ref<Page[]>()
const loaded = ref(false)
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
}

try {
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
  loaded.value = true

  console.log(projects.value)
} catch(e) {
  console.log("error", e)
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}</style>
