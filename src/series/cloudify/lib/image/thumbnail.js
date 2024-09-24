import fsPath from 'path'
import isLocal from 'is-local'
import isRelative from 'is-relative'
import checkFileExists from '../../../../lib/fs/checkFileExists.js'
import upload from '../upload.js'

export default async ({
  path, thumbnailPath, settings, entry }) => {

  if (!thumbnailPath ||
    !(await checkFileExists(thumbnailPath))) {
    return
  }

  if (!isLocal(thumbnailPath)) {
    return
  }

  const sourceUrl = isRelative(thumbnailPath) ? fsPath.resolve(path, thumbnailPath) : thumbnailPath
  const filename = `thumbnail.webp`

  const { clouds } = settings
  let uploadResult = null
  for (var i in clouds) {
    const cloud = clouds[i]
    uploadResult = await upload({
      id: cloud.id,
      sourceUrl,
      filename: `${entry.id}/${filename}`,
      auth: cloud.auth,
      settings
    })
  }

  return uploadResult.url
}
