import checkFileExists from "../../../lib/fs/checkFileExists.js"
import fs from 'fs'

export default async ({
  path, }) => {

  const buildPath = `${path}/.build`
  if (!(await checkFileExists(buildPath))) {
    return
  }

  const assetsPath = `${path}/assets`
  const assetsPathTarget = `${path}/.build/assets`
  if ((await checkFileExists(assetsPath))) {
    if ((await checkFileExists(assetsPathTarget))) {
      await fs.promises.rmdir(
        assetsPathTarget,
        { recursive: true }
      )
    }
    await fs.promises.mkdir(assetsPathTarget)
    await fs.promises.cp(assetsPath, assetsPathTarget, { recursive: true })
  }
}
