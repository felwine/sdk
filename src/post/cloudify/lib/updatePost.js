import fsPath from 'path'
import fs from 'fs'

export default async ({
  path,
  md,
  html }) => {

  const mdPath = fsPath.join(path, ".post.cloud.md")
  const htmlPath = fsPath.join(path, ".post.cloud.html")

  await fs.promises.writeFile(mdPath, md, 'utf8')
  await fs.promises.writeFile(htmlPath, html, 'utf8')

  return true
}
