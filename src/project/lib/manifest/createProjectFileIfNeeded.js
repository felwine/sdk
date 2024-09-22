import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../../lib/fs/checkFileExists.js'
import YAML from 'yaml'
import { nanoid } from 'nanoid'

export default async ({
  path,
  data = {}
}) => {


  try {

    const filePath = fsPath.join(path, "project.yaml")

    if ((await checkFileExists(filePath))) {
      return
    }

    let defaultManifest = YAML.parse(`
      id: ${nanoid()}
      createdAt: ""
      updatedAt: ""
      nomDePlume: ""
      description: ""
      license: all-rights-reserved
    `)

    let manifest = {
      ...defaultManifest,
      createdAt: (new Date()),
      ...data
    }

    manifest = YAML.stringify(manifest)

    await fs.promises.writeFile(filePath, manifest)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
