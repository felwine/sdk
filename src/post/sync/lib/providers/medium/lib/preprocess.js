import markdownToLexer from "../../../../../../lib/remark/markdownToLexer.js"
import mdastToMarkdown from "../../../../../../lib/remark/mdastToMarkdown.js"
import transformImages from "./transformImages.js"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkFigureCaption from "@microflash/remark-figure-caption"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

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
