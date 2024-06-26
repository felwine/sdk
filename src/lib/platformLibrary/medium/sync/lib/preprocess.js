import markdownToLexer from "../../../../../lib/remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../../lib/remark/mdastToMarkdown.js"
import transformImages from "./transformImages.js"


export default async (props) => {
  const { content } = props

  let entry = markdownToLexer({
    data: content
  })

  entry = await transformImages({
    child: entry,
  })

  return mdastToMarkdown({ mdast: entry })
}
