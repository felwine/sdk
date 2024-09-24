import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../../lib/fs/checkFileExists'

export default async ({
  path,
}) => {
  try {
    const filePath = fsPath.join(path, "assets")
    if ((await checkFileExists(filePath))) {
      return
    }

    await fs.promises.mkdir(filePath)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
