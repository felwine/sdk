import fsPath from 'path'
import checkFileExists from '../../../lib/fs/checkFileExists'
import importYAMLAsync from '../../../lib/fs/importYAMLAsync'

export default async ({
  path,
}) => {
  try {
    const filePath = fsPath.join(path, "manifest.yaml")

    if (!(await checkFileExists(filePath))) {
      return null
    }

    const content = await importYAMLAsync(filePath)
    return content
  } catch (e) {
    console.error(e)
  }
  return null
}
