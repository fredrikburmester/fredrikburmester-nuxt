<template>
  <nav v-if="navbar" class="navbar bg-base-100 flex flex-row justify-center sticky top-0 lg:mt-12 z-50">
    <div class="max-w-3xl flex justify-between w-full">
      <NuxtLink class="btn bg-white border-0 text-black hover:bg-white  normal-case w-36 text-xl rounded-full" to="/">
        <!-- {{ navbar.title }} -->
        <AnimatedLogo />
        <!-- <AnimatedWelcome /> -->
      </NuxtLink>
      <div class="flex flex-col ml-auto">
        <ul ref="linksRef" :key="routeName" class="flex flex-row">
          <NuxtLink :to="l.url" v-for="l in links" :key="l.id" :class="linkClass(l)" :id="l.text">
              {{ l.text }}
          </NuxtLink>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { Link, NavBar } from '~~/types/generated'
const { getItems } = useDirectusItems()
const route = useRoute();

const links = ref<Link[]>([])
const navbar = ref<NavBar>()
const linksRef = ref([])
let routeName = ref<string>('')

// onMounted(() => {
//   if(route.name)
//     routeName.value = route.name.toString()
// })

// watch(route, async (newRoute, oldRoute) => {
//   if(newRoute.name) {
//     routeName.value = newRoute.name.toString()
//   }
// })

const linkClass = (link: Link) => {
  const navItem = link.text.toLowerCase()
  return {
    'lg:ml-4 ml-1 hover:text-gray-500 transition-all hover:bg-gray-200 rounded px-2 py-1 hover:text-black': true,
    'bg-gray-100': navItem === route.name,
  }
}

try {
  const data = await getItems<NavBar>({
    collection: 'NavBar',
    params: {
      fields: ['*', 'links.*'],
    },
  })
  navbar.value = data
  links.value = data.links as Link[]
} catch (error) {
  // navigateTo('/error')
}
</script>

<style>
.active {
  color: gray;
  border-bottom: 1px solid gray;
}
</style>
