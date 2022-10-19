<template>
  <div id="c" class="flex flex-col text-left leading-0 justify-center -translate-y-3 hover:text-gray-500 w-36 translate-x-2 transition-all ">
    <span ref="textSpan1" class="transition-all"></span>
    <span ref="textSpan2" class=" translate-y-5 transition-all"></span>
    <div id="d" ref="d"></div>
  </div>
</template>

<script setup lang="ts">
import { listenerCount } from 'process'
import { transform } from 'typescript'

const text1 = 'fredrik'
// const text1 = 'FB'
const text2 = 'burmester'
const textSpan1 = ref(null)
const textSpan2 = ref(null)
const d = ref(null)

let i = 0
let j = 0

const letterWidth = {
  'f': 0.52,
  'r': 0.38,
  'e': 0.54,
  'd': 0.6,
  'i': 0.2,
  'k': 0.52,
  'b': 0.8,
  'u': 0.58,
  'm': 0.85,
  's': 0.51,
  't': 0.40,
}

let blink = 3

const animate = () => {
  if (i < text1.length) {
    if(textSpan1.value && d.value) {
      d.value
      const line = d.value as HTMLElement
      const span = textSpan1.value as HTMLElement

      let translateWidth = 0
      for(let k = 0; k < i; k++) {
        translateWidth += letterWidth[text1.charAt(k + 1)] * 20
      }
      line.style = `transform: translateX(${ 8 + translateWidth}px)`
      span.innerHTML += text1.charAt(i);
      i++;
      if(i == text1.length) {
        line.style = `transform: translateY(20px)`
        setTimeout(animate, 500);
      } else {
        setTimeout(animate, 130);
      }
    }
  } else if (j < text2.length) {

    if(textSpan2.value && d.value) {
      const line = d.value as HTMLElement
      const span = textSpan2.value as HTMLElement

      let translateWidth = 0
      for(let k = 0; k < j; k++) {
        translateWidth += letterWidth[text2.charAt(k + 1)] * 20
      }
      line.style = `transform: translateY(20px) translateX(${13 + translateWidth}px)`
      span.innerHTML += text2.charAt(j);
      j++;
      setTimeout(animate, 130);
    }
  } else if (blink > 0) {
    if(!d.value) return
    const line = d.value as HTMLElement
    if(line.classList.contains('opacity-0')) {
      line.classList.remove('opacity-0')
    } else {
      line.classList.add('opacity-0')
    }
    blink -= 1
    setTimeout(animate, 500);
  } else {
    textSpan2.value.classList.add('opacity-0')
    const span = textSpan1.value as HTMLElement
    span.style = `transform: translateY(12px)`
  }
}

onMounted(() => {
  animate()
})
</script>

<style scoped>
span {
  position: absolute;
  line-height: 18px;
  margin: 0;
  padding: 0;
}
#c {
  height :100px;
  position: absolute;
}
#d {
  z-index: 55;
  position: relative;
  top: 0;
  left: 0px;
  height: 20px;
  width: 2px;
  background-color: rgb(73, 73, 73);
  transition: all 0.1s ease;
}
</style>
