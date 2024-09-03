import fsPath from 'path'
import fs from 'fs'

export default async ({
  path,
  md,
  html }) => {

  const originalPath = fsPath.join(path, "post.md")
  const mdPath = fsPath.join(path, ".build/.post.consolidated.md")
  const htmlPath = fsPath.join(path, ".build/.post.consolidated.html")

  await fs.promises.writeFile(originalPath, md, 'utf8')
  await fs.promises.writeFile(mdPath, md, 'utf8')
  await fs.promises.writeFile(htmlPath, html, 'utf8')

  return true
}
