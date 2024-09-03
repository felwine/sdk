import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'

export default ({ data, useDirectives = false } = {}) => {
  const tokens = unified()
    .use(remarkParse, { gfm: true })
    .use(useDirectives ? remarkDirective : null)
    .parse(data)



  // const _tokens = unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .parse(data)

  // const a = mdastToHTML({ mdast: _tokens })

  return tokens
}


export const useDirectives = ({ data, useDirectives = false } = {}) => {
  const tokens = unified()
    .use(remarkParse, { gfm: true })
    .use(remarkDirective)
    .parse(data)
  return tokens
}
