<template>
  <div id="c" class="flex flex-col text-left leading-0 justify-center -translate-y-3 text-gray-700">
    <span ref="textSpan1"></span>
    <span ref="textSpan2" class=" translate-y-5"></span>
    <div id="d" ref="d"></div>
  </div>
</template>

<script setup lang="ts">
import { listenerCount } from 'process'
import { transform } from 'typescript'

const text1 = 'fredrik'
const text2 = 'burmester'
const textSpan1 = ref(null)
const textSpan2 = ref(null)
const d = ref(null)

let i = 0
let j = 0

const letterWidth = {
  'f': 0.52,
  'r': 0.40,
  'e': 0.50,
  'd': 0.6,
  'i': 0.2,
  'k': 0.52,
  'b': 0.8,
  'u': 0.6,
  'm': 0.85,
  's': 0.45,
  't': 0.40,
}

let blink = 7

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

      console.log(text1.charAt(i), translateWidth)

      line.style = `transform: translateX(${ 8 + translateWidth}px)`

      span.innerHTML += text1.charAt(i);
      i++;
      setTimeout(animate, 140);
    }
  } else if (j < text2.length) {
    if(textSpan2.value && d.value) {
      const line = d.value as HTMLElement
      const span = textSpan2.value as HTMLElement

      let translateWidth = 0
      for(let k = 0; k < j; k++) {
        translateWidth += letterWidth[text2.charAt(k + 1)] * 20
      }
      console.log(text2.charAt(j), translateWidth)

      line.style = `transform: translateY(20px) translateX(${13 + translateWidth}px)`


      span.innerHTML += text2.charAt(j);
      j++;
      setTimeout(animate, 140);
    }
  } else {
    if(!d.value) return
    const line = d.value as HTMLElement
    if(line.classList.contains('opacity-0')) {
      line.classList.remove('opacity-0')
    } else {
      line.classList.add('opacity-0')
    }
    blink -= 1
    if ( blink > 0 ) {
      setTimeout(animate, 500);
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
  transition: all 0.1s ease;
}
</style>
