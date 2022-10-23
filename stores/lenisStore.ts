
import { defineStore } from 'pinia'

export const useLenisStore = defineStore('lenis', {
  state: () => ({
      lenis: null,
  }),
  actions: {
    setLenis(l: any) {
      this.lenis = l
    }
  },
})
