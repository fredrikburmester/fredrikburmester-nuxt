<template>
  <div class="w-screen h-screen grid place-content-center text-center m-0 p-0">
    <h1 class="font-bold text-3xl">Server Error - {{props.error.statusCode}}</h1>
    <p>Please come back  at a later time</p>
    <div class="mockup-code text-start mt-8">
      <pre data-prefix="$"><code>{{props.error.message}}</code></pre>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  error: Object
})

onMounted(() => {
  console.log(props.error)
})
</script>
