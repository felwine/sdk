import markdownToLexer from "../../../../remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../remark/mdastToMarkdown.js"
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
