import fsPath from 'path'
import downloadImage from 'image-downloader'
import isLocal from 'is-local'
import isRelative from 'is-relative'

import upload from '../uploaders/upload.js'

export default async ({ child,
  path,
  settings }) => {
  const { url } = child

  let result
  const destination = `${path}/assets`
  if (isLocal(url)) {
    result = await treatLocalFile({ url, path, destination })
  }
  else {
    result = await treatRemoteFile({ url, destination })
  }
  let { sourceUrl, filename } = result


  const { clouds } = settings
  let uploadResult = null
  for (var i in clouds) {
    const cloud = clouds[i]
    switch (cloud.id) {
      case 'minio': {
        uploadResult = await upload({
          id: cloud.id,
          sourceUrl,
          filename,
          auth: cloud.auth
        })
      } break
      default:
        break
    }
  }


  if (!uploadResult || !uploadResult.url) {
    return child
  }

  return {
    ...child,
    url: uploadResult.url
  }
}

const treatLocalFile = async ({
  url, path, }) => {
  const sourceUrl = isRelative(url) ? fsPath.resolve(path, url) : url
  const filename = fsPath.basename(sourceUrl)

  return {
    filename,
    sourceUrl
  }
}

const treatRemoteFile = async ({ url,
  destination
}) => {
  try {
    const options = {
      url,
      dest: destination,         // will be saved to /path/to/dest/photo
      extractFilename: true,
    }

    const item = await downloadImage.image(options)
    // const { filename } = item
    const filename = fsPath.basename(item.filename)

    return {
      filename,
      sourceUrl: destination
    }
  }
  catch (e) {
    console.error(e)
  }
}
