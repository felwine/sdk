import checkFileExists from "../../../lib/fs/checkFileExists.js"
import fs from 'fs'

export default async ({
  path, }) => {

  const buildPath = `${path}/.build`
  if ((await checkFileExists(buildPath))) {
    await fs.promises.rmdir(
      buildPath,
      { recursive: true }
    )
  }
  await fs.promises.mkdir(buildPath)

}
