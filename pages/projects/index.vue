<template>
  <div class="grid md:grid-cols-2 max-w-3xl gap-12 md:gap-8 mt-12 mb-12 px-2">
    <div v-if="projects" class="grid grid-cols-1 gap-12 md:gap-8">
      <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in firstHalf"  :key="project.id" class="">
        <figure class="my-2">
          <img :src="img(project.image as string, {quality: 100})" class=""/>
        </figure>
        <h1 class="text-2xl font-bold">{{ project.title}}</h1>
        <p class="text-sm py-2 opacity-90">{{shortText(project.description || '', 120)}}</p>
        <div class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</div>
      </nuxt-link>
    </div>
    <div v-if="projects" class="grid grid-cols-1 gap-12 md:gap-8">
      <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in secondHalf"  :key="project.id" class="">
        <figure class="my-2">
          <img :src="img(project.image as string, {quality: 100})" class=""/>
        </figure>
        <h1 class="text-2xl font-bold">{{ project.title}}</h1>
        <p class="text-sm py-2 opacity-90">{{shortText(project.description || '', 120)}}</p>
        <div class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</div>
      </nuxt-link>
    </div>
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


const shortText = (t: string, l: number) => {
  if (t.length > l) {
    return t.substring(0, l) + '...'
  }
  return t
}

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
      },
      status: {
        _eq: 'published'
      }
    },
  },
})
projects.value = data

const firstHalf = ref(projects.value.slice(0, Math.ceil(projects.value.length / 2)))
const secondHalf = ref(projects.value.slice(Math.ceil(projects.value.length / 2), projects.value.length))

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
