import read from './read.js'
import updateToFile from './updateToFile.js'

export default async ({
  path,
  manifest,
  post,
  force = false
}) => {
  let _post = post
  let _manifest = manifest
  try {
    const existing = await read({ path })
    if (!_post && !force) {
      _post = existing.post
    }

    if (!_manifest && !force) {
      _manifest = existing.manifest
    }

    return updateToFile({
      path,
      post: _post,
      manifest: _manifest
    })
  } catch (e) {
    console.error(e)
  }
  return false
}
