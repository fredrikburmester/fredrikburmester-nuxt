<template>
  <!-- <div v-if="projects" class="flex flex-row lg:mt-12 w-screen space-x-4">
    <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in projects"  :key="project.id" class="">
      <div class="cursor-pointer mb-12 card rounded-none lg:rounded-xl lg:shadow-md lg:hover:shadow-lg transition-all w-96 h-96">
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
    </nuxt-link>
  </div> -->
  <div v-if="projects" class="flex flex-col max-w-2xl sm:space-y-12 sm:pt-12 sm:pb-24 snap-y">
    <nuxt-link :to="`/projects/${project.slug}`" v-for="(project, index) in projects"  :key="project.id" class="snap-center">
     <div class="relative image-full bg-base-100">
        <figure class="mobile:w-screen mobile:image-full mobile:text-center mobile:grid mobile:place-content-center">
          <img :src="img(project.image as string, {quality: 100})" class="mobile:max-w-none mobile:h-[calc(100vh-64px)]"/>
        </figure>
        <div class="mobile:h-[calc(30vh)] bg-transparent text-white absolute bottom-0 left-0 p-4 max-w-screen lg:p-12 glass shadow-md hover:shadow-lg transition-all hover:bg-accent hover:text-white duration-500">
          <h1 class="text-3xl sm:text-5xl font-bold z-100 mb-2">{{ project.title}}</h1>
          <p>{{project.description}}</p>
          <div class="justify-start flex-wrap lg:px-0 mt-4">
            <div class="badge badge-ghost text-gray-500 whitespace-nowrap my-1 mr-1" v-for="l in project.language">{{l}}</div>
          </div>
        </div>
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
