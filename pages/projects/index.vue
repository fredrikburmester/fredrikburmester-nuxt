<template>
  <div v-if="projects" class="flex flex-col lg:mt-12 w-screen lg:max-w-xl">
    <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in projects"  :key="project.id" class="">
      <div class="cursor-pointer mb-12 card rounded-none lg:rounded-xl lg:shadow-md lg:hover:shadow-lg  transition-all">

      <figure class="">
        <img :src="img(project.image as string, {quality: 50, width: 500})" class="relative w-screen lg:w-full"/>
      </figure>
      <div class="card-body p-4 lg:p-8">
        <h1 class="card-title text-3xl underline">{{ project.title }}</h1>
        <div class="stat-desc whitespace-pre-wrap text-sm" v-if="project.description">{{shortText(project.description, 200)}}</div>
        <div class="card-actions flex flex-col">
          <div class="justify-start flex-wrap lg:px-0">
            <div class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</div>
          </div>
          <button class="btn-ghost btn-outline rounded-lg mt-2 lg:visible hidden">See more</button>
        </div>
      </div>
    </div>

      <!-- <div class="stats rounded-none shadow-none card-body">
        <div class="stat lg:px-0 px-4 py-2">
          <div class="stat-value whitespace-pre-wrap max-w-12">{{project.title}}</div>
          <div class="stat-desc whitespace-pre-wrap text-sm" v-if="project.description">{{shortText(project.description, 200)}}</div>
        </div>
      </div>
      <div class="justify-start flex-wrap lg:px-0 px-4">
        <div class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</div>
      </div> -->
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
