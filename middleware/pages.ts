import { usePageStore } from '@/stores/pageStore'

export default defineNuxtRouteMiddleware((to, from) => {
  // const userStore = usePageStore()

  // let _from = from.fullPath.split('/').pop()
  // let _to = to.fullPath.split('/').pop()

  // if (_to === '') {
  //   _to = 'home'
  // }

  // userStore.setName(_to)

  // console.log(`${from.name?.toString()}->${to.name?.toString()}`)
  return
})
