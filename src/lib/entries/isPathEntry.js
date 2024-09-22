import checkFileExists from '../fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'

export default async (props) => {
  const {
    path,
  } = props

  if (!(await checkFileExists(path))) {
    return false
  }

  const pathStat = await fs.promises.stat(path)
  if (!pathStat) {
    return false
  }

  const isDir = pathStat.isDirectory()
  if (!isDir) {
    return false
  }

  const postPath = fsPath.join(path, 'post.md')


  return (await checkFileExists(postPath))
}
