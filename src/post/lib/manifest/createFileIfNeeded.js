import fsPath from 'path'
import fs from 'fs'
import checkFileExists from '../../../lib/fs/checkFileExists.js'
import YAML from 'yaml'

export default async ({
  path,
  data = {}
}) => {


  try {

    const filePath = fsPath.join(path, "manifest.yaml")

    if ((await checkFileExists(filePath))) {
      return
    }


    let defaultManifest = YAML.parse(`
      title: ""
      status: draft
      skip: false
      canonicalUrl: ""
      createdAt: ""
      updatedAt: ""
      nomDePlume: ""
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