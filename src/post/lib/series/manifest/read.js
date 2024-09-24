import fsPath from 'path'
import checkFileExists from '../../../../lib/fs/checkFileExists.js'
import frontmatter from 'frontmatter'
import fs from 'fs'
export default async ({
  path,
}) => {
  try {
    const filePath = fsPath.join(path, "series.yaml")

    if (!(await checkFileExists(filePath))) {
      return null
    }

    let post = await fs.promises.readFile(filePath, 'utf8')
    const _m = frontmatter(post)
    post = _m.content.trim()

    const manifest = _m.data

    return {
      post,
      manifest
    }

  } catch (e) {
    console.error(e)
  }
  return null
}
