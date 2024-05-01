import htmlToMarkdown from "./htmlToMarkdown.js"
import markdownToLexer from "./markdownToLexer.js"

export default async ({ data } = {}) => {
  const file = await htmlToMarkdown({ data })
  if (!file) {
    return null
  }

  const md = String(file)
  const lexer = markdownToLexer({ data: md })
  return lexer
}
