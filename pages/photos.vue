<script setup lang="ts">
const { getThumbnail } = useDirectusFiles();
</script>

<template>
  <div ref="hero" id="photo-page-hero" class="hero w-screen min-h-screen" :style="`background-image: url(${getThumbnail('bce28360-a8e1-48fd-93d7-5089ab9244e2', {width: width})});`">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Photo Portfolio</h1>
        <p class="mb-5">I take a lot of pictures, check them out!</p>
        <nuxt-link to="https://fredrik.studio">
          <button class="btn btn-outline btn-ghost text-white hover:bg-white hover:text-black">Website</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
