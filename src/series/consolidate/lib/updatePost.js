import fsPath from 'path'
import fs from 'fs'

import updatePostFile from "../../lib/postfile/post/update.js"


export default async ({
  path,
  md,
  html }) => {

  const mdPath = fsPath.join(path, ".build/.post.consolidated.md")
  const htmlPath = fsPath.join(path, ".build/.post.consolidated.html")

  await updatePostFile({ path, post: md })

  await fs.promises.writeFile(mdPath, md, 'utf8')
  await fs.promises.writeFile(htmlPath, html, 'utf8')

  return true
}
