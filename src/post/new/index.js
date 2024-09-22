import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../lib/fs/checkFileExists.js'
import createStatusIfNeeded from '../lib/activity/createActivityFileIfNeeded.js'
import createManifestIfNeeded from '../lib/postfile/createFileIfNeeded.js'

export default async ({
  path,
  title = "My new post",
  platforms = [],
  status = "draft",
  tags,
  force = false
}) => {
  try {
    const folderPath = fsPath.join(path, title)

    if ((await checkFileExists(folderPath))) {
      if (!force) {
        return false
      }
      await fs.promises.rmdir(folderPath, { recursive: true })
    }

    await fs.promises.mkdir(folderPath)
    await fs.promises.mkdir(`${folderPath}/assets`)
    await fs.promises.mkdir(`${folderPath}/.build`)


    await createStatusIfNeeded({
      path: folderPath
    })

    await createManifestIfNeeded({
      path: folderPath,
      manifest: {
        name: title,
        platforms,
        status,
        tags
      },
      post: `# ${title}`
    })

    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
