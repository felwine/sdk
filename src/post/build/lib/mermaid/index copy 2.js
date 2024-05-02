// import { convertMarkdownMermaidToImage } from 'markdown-mermaid-exporter'
import ensureDirectoryExists from '../../../../lib/fs/ensureDirectoryExists.js'
import { sha256 } from 'js-sha256'

import { remark } from 'remark'
import remarkMermaid from 'remark-mermaidjs'
import { webkit } from 'playwright'

export default async ({ child,
  path, }) => {
  try {

    let markdown = "```mermaid\n"
    markdown += child.value
    markdown += "\n```"

    const dataSHA = sha256(JSON.stringify(markdown))

    const filenameRaw = `${dataSHA}.png`
    const extension = `png`
    const filename = `${filenameRaw}.${extension}`
    const newUrl = `.build/${filename}`
    const destination = `${path}/${newUrl}`
    await ensureDirectoryExists(destination)

    const { value } = await remark()
      .use(remarkMermaid, {
        browser: webkit
      })
      .process(markdown)


    // await convertMarkdownMermaidToImage(
    //   markdown,
    //   destination)

    return {
      ...child,
      type: 'image',
      // url: newUrl,
      url: `.build/${filenameRaw}-1.${extension}`
    }
  } catch (e) {
    console.error(e)
  }

  return child
}
