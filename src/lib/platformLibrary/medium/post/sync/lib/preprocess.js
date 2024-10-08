import markdownToLexer from "../../../../../remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../../remark/mdastToMarkdown.js"
import transformImages from "./transformImages.js"
import formatPosteps from "./formatPosteps.js"


export default async (props) => {
  const { content } = props

  let entry = markdownToLexer({
    data: content
  })

  entry = await transformImages({
    child: entry,
  })

  entry = await formatPosteps({
    child: entry,
  })

  return mdastToMarkdown({ mdast: entry })
}
