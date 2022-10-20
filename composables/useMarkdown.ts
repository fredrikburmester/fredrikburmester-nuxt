// Parse markdown to html
import { Marked, Renderer } from '@ts-stack/markdown';

// class MyRenderer extends Renderer
// {
//   // Overriding parent method.
//   heading(text: string, level: number, raw: string)
//   {
//     if (level > 1) {
//       const headingSlug = raw.toLowerCase().replace(/[^\w]+/g, '-');
//       return `<a href="#${headingSlug}"><h${level} id="${headingSlug}">${text}</h${level}></a>`;
//     }
//     return `<h${level}>${text}</h${level}>`;
//   }
// }

// Marked.setOptions({renderer: new MyRenderer});

export const parse = (text: string | undefined) => {

  if (text)
    return Marked.parse(text)

  return `<div>Empty</<div>`
}
