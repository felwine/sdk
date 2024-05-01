import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../lib/fs/checkFileExists.js'
import createStatusIfNeeded from '../lib/activity/createFileIfNeeded.js'
import createManifestIfNeeded from '../lib/manifest/createFileIfNeeded.js'

export default async ({
  parentPath,
  name = "My new post",
  platforms = [],
  status = "draft",
  canonicalUrl = "",
  tags,
  author = {
    id: "",
    name: ""
  },
}) => {
  try {
    const folderPath = fsPath.join(parentPath, name)

    if ((await checkFileExists(folderPath))) {
      await fs.promises.rmdir(folderPath, { recursive: true })
    }

    await fs.promises.mkdir(folderPath)
    await fs.promises.mkdir(`${folderPath}/assets`)
    await fs.promises.mkdir(`${folderPath}/artefacts`)
    await fs.promises.mkdir(`${folderPath}/.build`)


    await createStatusIfNeeded({
      path: folderPath
    })

    await createManifestIfNeeded({
      path: folderPath,
      data: {
        name,
        platforms,
        canonicalUrl,
        status,
        author,
        tags
      }
    })


    const postPath = fsPath.join(folderPath, "post.md")
    const post = `# ${name}`
    await fs.promises.writeFile(postPath, post, 'utf8')

    const excerptPath = fsPath.join(folderPath, "excerpt.md")
    const excerpt = ``
    await fs.promises.writeFile(excerptPath, excerpt, 'utf8')

    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
