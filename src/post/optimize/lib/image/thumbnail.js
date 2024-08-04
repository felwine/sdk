import fsPath from 'path'
import isLocal from 'is-local'
import isRelative from 'is-relative'
import sharp from 'sharp'
import checkFileExists from '../../../../lib/fs/checkFileExists.js'

export default async ({
  path, thumbnailPath }) => {

  if (!thumbnailPath ||
    !(await checkFileExists(thumbnailPath))) {
    return
  }

  if (!isLocal(thumbnailPath)) {
    return
  }

  const sourceUrl = isRelative(thumbnailPath) ? fsPath.resolve(path, thumbnailPath) : thumbnailPath
  const extension = fsPath.parse(sourceUrl).ext
  switch (extension) {
    case '.svg': {
      return
    }
    default: break
  }

  const filename = `thumbnail.webp`
  const destination = `${path}/assets/${filename}`

  await sharp(sourceUrl)
    .webp({ quality: 90 })
    .toFile(destination)

  const newUrl = `assets/${filename}`
  return newUrl

}
