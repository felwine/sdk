import fsPath from 'path'
import fs from 'fs'
import YAML from 'yaml'

export default async ({
  path,
  manifest = {},
  post = ''
}) => {

  try {
    const filePath = fsPath.join(path, "post.md")

    const file = `
---
${YAML.stringify(manifest).trim()}
---

${post.trim()}
`.trim()
    await fs.promises.writeFile(filePath, file)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
