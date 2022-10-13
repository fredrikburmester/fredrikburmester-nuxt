<template>
   <div class="tooltip text-primary" :data-tip="copyInfoText" @click="copy($event)">
    {{props.text}}
  </div>
</template>

<script setup lang="ts">

// get props
const props = defineProps<{
  copyInfoText: string,
  copyInfoTextAfterClick: string,
  text: string
}>()

const copyInfoText = ref('Click to copy email to clipboard')
const copy = (e: Event) => {
  navigator.clipboard.writeText(e.target.innerText)
  copyInfoText.value = props.copyInfoTextAfterClick
}

</script>
