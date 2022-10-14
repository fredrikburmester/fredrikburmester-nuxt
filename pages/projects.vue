<template>
  <div class="flex flex-col" v-if="loaded">
    <transition-group name="list" tag="div">
      <nuxt-link :to="`/project/${project.slug}`" v-for="project in projects"  :key="project.id" >
        <div class="[&:not(:last-child)]:border-b transition-all pb-8 [&:not(:last-child)]:border-gray-200 group flex flex-col lg:flex-row lg:place-items-center mb-8 lg:space-x-10 lg:hover:translate-x-2 space-y-8 lg:space-y-0">
          <div :class="imageClasses">
            <img @load="imagesLoaded.push(project.id)" v-if="project.image" :src="img(project.image, {quality: 10, width: 736})" alt="project-image" class="rounded-xl">
          </div>
          <div class="flex flex-col space-y-2 prose mt-4">
            <span class="font-bold text-3xl text-black">{{project.title}}</span>
            <div class="flex flex-row space-x-1">
              <span class="badge badge-ghost" v-for="l in project.language">{{l}}</span>
            </div>
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
} catch(e) {
  console.log("error", e)
}
</script>

<style>
/* .list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
} */

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
