<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Default title'
  },
  description: {
    type: String,
    default: 'Default description'
  },
  tags: {
    type: String,
    default: []
  },
  publishedAt: {
    type: String,
    default: ''
  },
})

const tagsArray = props.tags.split(',').map((tag:string) => tag.trim())
</script>
<template>
  <h1 class="p-0 m-0">{{ title }}</h1>
  <p class="mt-0 mb-2">{{ description }}</p>
  <p class="m-0">{{ publishedAt }}</p>
  <div class="flex flex-row flex-wrap my-2">
    <span class="badge badge-ghost p-2 mr-1 mb-1 capitalize" v-for="t in tagsArray">{{t}}</span>
  </div>
</template>
