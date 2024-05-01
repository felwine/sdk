import read from './read.js'
import updateToFile from './updateToFile.js'
import YAML from 'yaml'

export default async ({
  path,
  data,
}) => {
  try {
    const existing = await read({ path })
    let result = {
      ...existing,
      ...data
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
