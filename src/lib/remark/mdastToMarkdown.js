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
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(html)

  const data = String(file)

  return data
}
