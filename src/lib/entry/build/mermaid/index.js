import { convertMarkdownMermaidToImage } from 'markdown-mermaid-exporter'
import { nanoid } from 'nanoid'
import ensureDirectoryExists from '../../../fs/ensureDirectoryExists.js'

export default async ({ child,
  path, }) => {
  try {
    const filenameRaw = `${nanoid()}.png`
    const extension = `png`
    const filename = `${filenameRaw}.${extension}`
    const newUrl = `.build/${filename}`
    const destination = `${path}/${newUrl}`
    await ensureDirectoryExists(destination)

    let markdown = "```mermaid\n"
    markdown += child.value
    markdown += "\n```"

    await convertMarkdownMermaidToImage(
      markdown,
      destination)

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
