import markdownToLexer from "../../../../../../lib/remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../../../lib/remark/mdastToMarkdown.js"
import removeTitle from "./removeTitle.js"

export default async (props) => {
  const { content } = props
  let entry = markdownToLexer({
    data: content
  })

  entry = await removeTitle({
    child: entry,
  })

  return mdastToMarkdown({ mdast: entry })
}
