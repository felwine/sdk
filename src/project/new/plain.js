import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../lib/fs/checkFileExists.js'
import createStatusIfNeeded from '../lib/activity/createFileIfNeeded.js'
import createManifestIfNeeded from '../lib/manifest/createFileIfNeeded.js'

export default async ({
  path,
  name = "My new project",
  description = "An authoring project for my personal usage.",
  settings = {
  },
  force = false,
  author = {
    id: "",
    name: ""
  },
}) => {
  try {
    const folderPath = fsPath.join(path, name)

    if ((await checkFileExists(folderPath))) {
      if (!force) {
        return false
      }
      await fs.promises.rmdir(folderPath, { recursive: true })
    }

    await fs.promises.mkdir(folderPath)

    await createStatusIfNeeded({
      path: folderPath
    })

    await createManifestIfNeeded({
      path: folderPath,
      data: {
        name,
        // platforms: settings.platforms.map(platform => {
        //   const a = {
        //     ...platform,
        //   }
        //   delete a.auth
        //   return a
        // }),
        author,
        description
      }
    })

    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
