import markdownToLexer from "../../../../remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../remark/mdastToMarkdown.js"
import formatPosteps from "./formatPosteps.js"
import removeTitle from "./removeTitle.js"

export default async (props) => {
  const { content } = props
  let entry = markdownToLexer({
    data: content,
    // useDirectives: false
  })

  entry = await removeTitle({
    child: entry,
  })

  entry = await formatPosteps({
    child: entry,
  })

  return mdastToMarkdown({ mdast: entry })
}
