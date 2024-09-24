import fsPath from 'path'
import checkFileExists from '../../../../lib/fs/checkFileExists.js'
import YAML from 'yaml'
import updateToFile from './updateToFile.js'

export default async ({
  path,
  post = "",
  manifest = {}
}) => {

  try {
    const filePath = fsPath.join(path, "post.md")

    if ((await checkFileExists(filePath))) {
      return
    }

    let defaultManifest = YAML.parse(`
status: draft
sync: true
excerpt:
rubric:
mediaTypes:
  - post
# bits:
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
# canonicalUrl: <progress>
# incorrectness: 0
# license: all-rights-reserved
    `)

    let _manifest = {
      ...defaultManifest,
      createdAt: (new Date()),
      ...manifest
    }

    return updateToFile({ path, manifest: _manifest, post })
  } catch (e) {
    console.error(e)
  }
  return false
}
