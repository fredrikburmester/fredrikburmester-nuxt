<template>
  <nav v-if="navbar" class="h-40 lg:h-40 lg:mb-12 mb-6 navbar bg-base-100 flex flex-row justify-center items-start sticky top-0 lg:mt-12 z-50">
    <div class="max-w-3xl flex justify-between w-full">
      <NuxtLink class="btn bg-white border-0 text-black hover:bg-white  normal-case w-36 text-xl rounded-full" to="/">
        <!-- {{ navbar.title }} -->
        <AnimatedLogo />
        <!-- <AnimatedWelcome /> -->
      </NuxtLink>
      <div class="flex flex-col ml-auto">
        <ul ref="linksRef" :key="routeName" class="flex flex-row">
          <NuxtLink :to="l.url" v-for="l in links" :key="l.id" :class="linkClass(l)" :id="l.text" @click="animate($event)">
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

let invertTranslateX = 0
let lastEl: any = null
let el: any = null

const animate = (event: Event) => {
  el = event.target as HTMLElement
  if(!el) return

  if(lastEl != null) {
    console.log("invert translate", invertTranslateX)
    lastEl.style.transform = ''
    // lastEl.style.transform = `scale(1) translateY(80px) translateX(${invertTranslateX / 3}px) `
  }

  lastEl = event.target

  let screenWidth = window.innerWidth

  let padding = 25
  let pos2firstEl = 0

  if(screenWidth > 768){
    pos2firstEl = ((screenWidth ) - 768) / 2 // 768 is the width of the content
  } else {
    pos2firstEl = 10
  }

  let pos2Target = el.getBoundingClientRect()
  let elPadding = 20
  let translateX = (pos2Target.x - pos2firstEl) + elPadding

  invertTranslateX = translateX

  el.style.transform = `translateX(-${translateX}px) translateY(50px) scale(3)`
}

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
    'lg:ml-4 ml-1  transition-all px-2 py-1 ': true,
    'hover:text-gray-500 rounded hover:text-black': navItem !== route.name,
    'font-bold relative': navItem === route.name,
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
a{
  transform-origin:top left;
}
.moveTo {
  transform: translateX(-100px);
  transition: transform 1s ease;
}
</style>
