import { unified } from 'unified'
import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'

export default async ({
  mdast,
} = {}) => {

  const hast = toHast(mdast)
  const html = toHtml(hast)

  const file = await unified()
    .use(rehypeParse)
    .use(rehypeRemark, {
      handlers: {
        definition: (state, node) => {
          console.log(state)
        },
        svg: (state, node) => {
          /** @type {Html} */
          const result = { type: 'html', value: toHtml(node) }
          state.patch(node, result)
          return result
        }
      }
    })
    .use(remarkStringify)
    .process(html)

  const data = String(file)

  return data
}
