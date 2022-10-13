import { defineStore } from 'pinia'

export const usePageStore = defineStore('counter', {
  state: () => ({
      name: '' as string,
  }),
  actions: {
    setName(name: any) {
      this.name = name
    }
  },
})
