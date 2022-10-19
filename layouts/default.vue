<template>
  <div class="min-h-screen">
    <NavBar class="z-20" />
    <div class="relative flex flex-col z-10">
      <div id="hero-teleport" />
      <div class="max-w-3xl ml-auto mr-auto px-4 lg:px-0 lg:pb-12 pt-6">
        <slot />
      </div>
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
