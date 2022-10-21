<template>
  <div>
    <div id="main-content" class="flex flex-col" >
      <NavBar class="z-20" />
      <div class="flex flex-col z-10 bg-white min-h-screen pointer-events-auto" >
        <div id="hero-teleport" />
        <div class="ml-auto mr-auto px-0">
          <slot />
        </div>
      </div>
    </div>
    <ContactFooter />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const el = document.getElementsByTagName('footer')
  let h = 0
  if(el) {
    h = el[0].clientHeight
    const mainEl = document.getElementById('main-content')
    if(mainEl) {
      mainEl.setAttribute("style", `padding-bottom: ${h}px; min-height: calc(100vh + ${h}px);`)
    }
  }
})
</script>
