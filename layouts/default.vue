<template>
  <NavBar class="z-20" />
  <div class="relative min-h-screen flex flex-col p-4">
    <div class="relative z-10 max-w-3xl ml-auto mr-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Lenis from '@studio-freight/lenis'

if (process.client) {
  const lenis = new Lenis({
    duration: 0.5,
    easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net/en#easeOutExpo
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  })
  const raf = (time: any) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
} else {
  console.log('@studio-freight/lenis: not client')
}
</script>
