import ensureDirectoryExists from '../../../../lib/fs/ensureDirectoryExists.js'
import { sha256 } from 'js-sha256'

import { generateMermaidSVG } from 'mermaid-svg'
import fs from 'fs'

export default async ({ child,
  path, }) => {
  try {

    let markdown = child.value
    const dataSHA = sha256(JSON.stringify(markdown))

    const filenameRaw = `${dataSHA}`
    const extension = `svg`
    const filename = `${filenameRaw}.${extension}`
    const newUrl = `.build/assets/${filename}`
    const destination = `${path}/${newUrl}`
    await ensureDirectoryExists(destination)

    const value = await generateMermaidSVG(markdown)


    await fs.promises.writeFile(destination, value)

    return {
      ...child,
      type: 'image',
      url: `.build/assets/${filename}`,
    }
  } catch (e) {
    console.error(e)
  }

  return child
}
