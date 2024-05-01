import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../../lib/fs/checkFileExists'

export default async ({
  path, }) => {

  const buildPath = fsPath.join(path, "build")
  if (!(await checkFileExists(buildPath))) {
    return
  }

  let success = await fs.promises.rmdir(buildPath, { recursive: true })
  success = true
  return success
}
