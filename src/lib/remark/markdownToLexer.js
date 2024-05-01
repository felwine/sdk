import { unified } from 'unified'
import remarkParse from 'remark-parse'

export default ({ data } = {}) => {
  const tokens = unified()
    .use(remarkParse, { gfm: true })
    .parse(data)



  // const _tokens = unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .parse(data)

  // const a = mdastToHTML({ mdast: _tokens })

  return tokens
}
