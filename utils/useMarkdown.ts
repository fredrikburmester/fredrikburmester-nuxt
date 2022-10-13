// Parse markdown to html
import { Marked } from '@ts-stack/markdown';

export const parse = (text: string | undefined) => {
  if (text)
    return Marked.parse(text)

  return `<div>Empty</<div>`
}
