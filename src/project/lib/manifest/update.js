import read from './read.js'
import updateToFile from './updateToFile.js'
import YAML from 'yaml'

export default async ({
  path,
  data,
}) => {
  try {
    let existing = await read({ path })
    if (!existing) {
      existing = {}
    }
    const _data = data ? data : {}
    let result = {
      ...existing,
      platforms: [
        ...(existing.platforms ? existing.platforms : []),
        ...(data.platforms ? data.platforms : []),
      ],
      clouds: [
        ...(existing.clouds ? existing.clouds : []),
        ...(data.clouds ? data.clouds : []),
      ]
    }

    const content = YAML.stringify(result)
    return updateToFile({
      path,
      content
    })
  } catch (e) {
    console.error(e)
  }
  return false
}
