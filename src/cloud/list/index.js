import read from '../../project/lib/manifest/read.js'

export default async ({
  path,
}) => {
  try {
    const existing = await read({ path })
    if (!existing) {
      return null
    }

    const { clouds } = existing
    return clouds
  } catch (e) {
    console.error(e)
  }
  return false
}
