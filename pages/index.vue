<template>
  <div>
    <!-- <About /> -->
    <article class="prose">
      <ContentDoc path="/about" />
    </article>
    <Contact />
  </div>
</template>

<script setup lang=ts>
import About from './about.vue'
import Contact from './contact.vue'

// definePageMeta({
//   middleware: ["pages"]
// })
</script>
