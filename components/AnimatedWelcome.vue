<template>
  <div id="c" class="flex flex-col text-left leading-0 justify-center hover:text-gray-500 w-48 translate-x-6 transition-all">
    <span ref="textSpan1" class="transition-all"></span>
    <div id="d" ref="d" class=" transition-all"></div>
  </div>
</template>

<script setup lang="ts">
import { listenerCount } from 'process'
import { text } from 'stream/consumers'
import { transform } from 'typescript'

const text1 = 'Fredrik Burmester'
const text2 = 'FB'
const textSpan1 = ref(null)
const textSpan2 = ref(null)
const d = ref(null)

let i = 0
let j = 0
let l = 0

const letterWidth = {
  'f': 0.52,
  'r': 0.38,
  'e': 0.53,
  'd': 0.6,
  'i': 0.2,
  'k': 0.52,
  'b': 0.8,
  'u': 0.58,
  'm': 0.85,
  's': 0.51,
  't': 0.40,
  'w': 0.85,
  'l': 0.2,
  'o': 0.6,
  'c': 0.55,
  '!': 0.3,
  'W': 0.85,
  'F': 0.6,
  'B': 0.65,
  ' ': 0.3,
}

let blink = 3

const writingSpeed = 130
const blinkSpeed = 500
const waitSpeed = 500

const animate = () => {
  if (i < text1.length) {
    if(textSpan1.value && d.value) {
      d.value
      const line = d.value as HTMLElement
      const span = textSpan1.value as HTMLElement

      span.innerHTML += text1.charAt(i);
      let translateWidth = 0
      for(let k = 0; k < span.innerHTML.length; k++) {
        translateWidth += letterWidth[text1.charAt(k)] * 20
      }
      line.style = `transform: translateX(${ translateWidth}px)`
      i++;
      if(i == text1.length) {
        setTimeout(animate, waitSpeed);
      } else {
        setTimeout(animate, writingSpeed);
      }
    }
  } else if (j < text1.length) {
    const span = textSpan1.value as HTMLElement
    const line = d.value as HTMLElement
    // remove last element of string
    span.innerHTML = span.innerHTML.substring(0, span.innerHTML.length - 1);

    let translateWidth = 0
    for(let k = 0; k < span.innerHTML.length; k++) {
      translateWidth += letterWidth[span.innerHTML.charAt(k)] * 20
    }
    line.style = `transform: translateX(${ translateWidth}px)`

    j++
    setTimeout(animate, writingSpeed);
  } else if (l < text2.length) {
    if(textSpan1.value && d.value) {
      d.value
      const line = d.value as HTMLElement
      const span = textSpan1.value as HTMLElement

      let translateWidth = 0
      span.innerHTML += text2.charAt(l);
      for(let k = 0; k < span.innerHTML.length; k++) {
        translateWidth += letterWidth[span.innerHTML.charAt(k)] * 20
      }
      line.style = `transform: translateX(${ translateWidth}px)`
      l++;
      setTimeout(animate, waitSpeed);
    }
  } else {
    if(blink > 0) {
      const line = d.value as HTMLElement
      if(line.classList.contains('opacity-0')) {
        line.classList.remove('opacity-0')
      } else {
        line.classList.add('opacity-0')
      }
      blink--
      setTimeout(animate, blinkSpeed);
    }
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
  transition: all 0.105s ease;
}
</style>
