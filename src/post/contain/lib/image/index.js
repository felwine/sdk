import isLocal from 'is-local'
import imageToBase64 from 'image-to-base64'
import isRelative from 'is-relative'
import fsPath from 'path'
import { getImageMime } from 'base64-image-mime'

export default async ({ child,
  path, }) => {
  const { url } = child

  let sourceUrl = url
  if (isLocal(sourceUrl)) {
    sourceUrl = isRelative(url) ? fsPath.resolve(path, url) : url
  }

  const base64 = await imageToBase64(sourceUrl)
  const mimeType = getImageMime(base64)
  const newUrl = `data:${mimeType};base64, ${base64}`
  return {
    ...child,
    url: newUrl
  }
}
