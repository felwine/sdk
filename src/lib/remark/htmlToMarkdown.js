import { unified } from 'unified'
import stringify from 'remark-stringify'
import rehypeParse from 'rehype-parse'
import rehype2remark from 'rehype-remark'

export default async ({ data } = {}) => {
  const processor = unified()
    .use(rehypeParse)
    .use(rehype2remark)
    .use(stringify)
  return processor.process(data)
}
