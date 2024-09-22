import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../../lib/fs/checkFileExists.js'

export default async ({
  path,
  content,
}) => {

  try {
    const filePath = fsPath.join(path, "project.yaml")
    if (!(await checkFileExists(filePath))) {
      return
    }

    await fs.promises.writeFile(filePath, content)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
