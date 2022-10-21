import Lenis from "@studio-freight/lenis"

export default defineNuxtPlugin(() => {
  if(process.client) {
    const lenis = new Lenis({
      duration: 0.8,
      easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net/en#easeOutExpo
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      direction: "vertical"
    })
    const raf = (time: any) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    if (process.client) {
      requestAnimationFrame(raf)
    }

    // inject('lenis', lenis)
    return {
      provide: {
        lenis: lenis
      }
    }
  }
})
