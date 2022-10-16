<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["pages"],
})

useHead({
  meta: [
    { hid: 'og:title', property: 'og:title', content: 'Fredrik Burmester' },
    { hid: 'og:description', property: 'og:description', content: 'Welcome to my portfolio website!' },
    { hid: 'og:image', property: 'og:image', content: 'https://cms.fredrikburmester.com/assets/71ccab0f-0c4d-4064-b757-367304550660?width=200' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://fredrikburmester.com',
    },

  ],
})
</script>
