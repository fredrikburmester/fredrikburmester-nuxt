<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="avatar mb-12 h-48 w-48">
    <img class="rounded-full p-0 m-0" :src="src" />
  </div>
</template>

