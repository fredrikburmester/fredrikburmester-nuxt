<script setup lang="ts">
const { getThumbnail } = useDirectusFiles();
</script>

<template>
  <div ref="hero" id="photo-page-hero" class="hero w-screen min-h-screen" :style="`background-image: url(${getThumbnail('bce28360-a8e1-48fd-93d7-5089ab9244e2')});`">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Photography</h1>
        <p class="mb-5 text-start">I love taking photos and I post my favourite ones on my photo portfolio website.<br> <br> You can also check out my instagram, link at the bottom of the page!</p>
        <nuxt-link to="https://fredrik.studio">
          <button class="btn btn-outline btn-ghost text-white hover:bg-white hover:text-black">Check it out</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
