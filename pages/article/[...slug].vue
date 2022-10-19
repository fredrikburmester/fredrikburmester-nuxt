<template>
  <article class="prose">
    <ContentDoc />
  </article>
</template>

<script setup lang="ts">
// useHead({
//   meta: [
//     { hid: 'og:title', property: 'og:title', content: project.value.title },
//     { hid: 'og:image', property: 'og:image', content: `${config.apiBase}assets/${project.value.image}` },
//     {
//       hid: 'og:url',
//       property: 'og:url',
//       content: getFullUrlPath(),
//     },
//   ],
// })
</script>

<style>
article {
  max-width: calc(100vw - 2rem);
  word-wrap: break-word;
}
</style>
