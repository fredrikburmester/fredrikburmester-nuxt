<template>
    <div v-html="Marked.parse(props.text)"></div>
</template>

<script setup lang="ts">
import { Marked, Renderer } from '@ts-stack/markdown';
import { compile } from "vue"

const print = () => {
  console.log("Hej")
}

const props = defineProps<{
  text: string
}>()

class MyRenderer extends Renderer
{
  // Overriding parent method.
  heading(text: string, level: number, raw: string)
  {
    if (level > 1) {
      const slug = raw.toLowerCase().replace(/[^\w]+/g, '-');
      return h(compile(`<a id="${slug}" onclick="$lenis.scrollTo('#hej')">
                <h1>
                  ${text}
                </h1>
              </a>`));
    }
    return `<h${level}>${text}</h${level}>`;
  }
}

Marked.setOptions({renderer: new MyRenderer});

</script>
