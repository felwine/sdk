import fsPath from 'path'
import downloadImage from 'image-downloader'
import fs from 'fs'
import isLocal from 'is-local'
import isRelative from 'is-relative'


export default async ({ child,
  path, }) => {
  const { url } = child

  let result
  const destination = `${path}/assets`
  if (isLocal(url)) {
    result = await treatLocalFile({ url, path, destination })
  }
  else {
    result = await treatRemoteFile({ url, destination })
  }

  let filename = result.filename
  const newUrl = `assets/${filename}`
  return {
    ...child,
    url: newUrl
  }
}

const treatLocalFile = async ({
  url, path, destination }) => {
  const sourceUrl = isRelative(url) ? fsPath.resolve(path, url) : url
  const filename = fsPath.basename(sourceUrl)
  const _destination = `${destination}/${filename}`
  await fs.promises.cp(sourceUrl, _destination)
  return {
    filename,
  }
}

const treatRemoteFile = async ({ url,
  destination
}) => {
  try {
    const options = {
      url,
      dest: destination,         // will be saved to /path/to/dest/photo
      extractFilename: true,
    }

    const item = await downloadImage.image(options)
    // const { filename } = item
    const filename = fsPath.basename(item.filename)

    return {
      filename
    }
  }
  catch (e) {
    console.error(e)
  }
}

// const isRelative = path => {
//   var r = new RegExp('^(?:[a-z+]+:)?//', 'i')
//   return r.test(path)
// }

// const isLocal = path => {
//   var r = new RegExp('(^(?:[a-zA-Z]:|(\\\\|\/\/)[\w\.]+(\\|\/)[\w.$]+)((\\|\/)|(\\\\|\/\/))(?:[\w ]+(\\|\/))*\w([\w. ])+[\.][a-zA-Z]+$)')
//   return r.test(path)


// }

