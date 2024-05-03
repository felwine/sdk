import fs from 'fs'
import fsPath from 'path'
import checkFileExists from '../../lib/fs/checkFileExists.js'

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

  const manifestPath = fsPath.join(path, 'manifest.yaml')
  return checkFileExists(manifestPath)
}
