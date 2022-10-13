<template>
  <div>
    <About />
    <Contact />
  </div>
</template>

<script setup lang=ts>
import About from './about.vue'
import Contact from './contact.vue'

definePageMeta({
  middleware: ["pages"]
})
</script>
