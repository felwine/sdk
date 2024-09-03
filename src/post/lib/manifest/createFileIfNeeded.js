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
      status: draft
      sync: true
      license: all-rights-reserved
      excerpt:
      rubric:
      mediaTypes:
        - post
      incorrectness: 0
    `)

    let manifest = {
      ...defaultManifest,
      createdAt: (new Date()),
      ...data
    }

    manifest = YAML.stringify(manifest)
    manifest +=
      `# bits:
#   - item 1
#   - item 2
# recap:
#   - item 1
#   - item 2
# thumbnail:
#   credits:
#     author: <Author name>
#     name: <Thumbnail name>
#     date: <Thumbnail date>
#     link: <Thumbnail link>
# tags:
#   - item 1
#   - item 2
# disciplines:
#   - item 1
#   - item 2
# locale:
# category:
# layout:
# series:
#   id: my_series_id
#   description: my_series_description
#   name: my_series_name
#   postPosition: 1 # prefered position in series
# targets:
#   - type: book
#     params:
#       isbn10: <ISBN10 number>
#       isbn13: <ISBN13 number>
#       name: <Book name>
#       publishedAt: <Date>
#       pagesCount: <number>
#       category: <string>
#       authors:
#         - <Author 1 name>
#       rating: <number>
#       progress: <progress>
    `

    await fs.promises.writeFile(filePath, manifest)
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
