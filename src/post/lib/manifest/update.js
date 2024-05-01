import updateToFile from './updateToFile.js'
import YAML from 'yaml'

export default async ({
  path,
  manifest,
}) => {
  try {
    const content = YAML.stringify(manifest)
    return updateToFile({
      path,
      content
    })
  } catch (e) {
    console.error(e)
  }
  return false
}
