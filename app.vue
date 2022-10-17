<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

if(process.client) {
  console.log("Client:", runtimeConfig.public.apiBase, runtimeConfig.public.hostName)
  console.log(runtimeConfig.public.env)
} else {
  console.log("Not client")
}

definePageMeta({
  middleware: ["pages"],
})

useHead({
  meta: [
    { hid: 'og:title', property: 'og:title', content: 'Fredrik Burmester' },
    { hid: 'description', property: 'description', content: "Welcome to my portfolio website. Check out what I'm up to!" },
    { hid: 'og:description', property: 'og:description', content: "Welcome to my portfolio website. Check out what I'm up to!" },
    { hid: 'og:image', property: 'og:image', content: 'https://cms.fredrikburmester.com/assets/71ccab0f-0c4d-4064-b757-367304550660?width=200' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://fredrikburmester.com',
    },

  ],
})
</script>
