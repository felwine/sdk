import checkFileExists from '../../../lib/fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'
import _ from 'underscore'
import isPathSeries from './isPathSeries.js'
import getSeries from './getSeries.js'

const perform = async (props) => {
  const {
    path,
  } = props

  try {
    if (!(await checkFileExists(path))) {
      return null
    }

    const items = await fs.promises.readdir(path)

    if (!items || !items.length) {
      return null
    }

    let results = (await Promise.all(items.map(async item => {

      const folderPath = fsPath.join(path, item)

      const folderPathStat = await fs.promises.stat(folderPath)
      if (!folderPathStat) {
        return null
      }

      const isDir = folderPathStat.isDirectory()
      if (!isDir) {
        return null
      }

      if (!(await isPathSeries({ path: folderPath }))) {
        return perform({
          ...props,
          path: folderPath
        })
      }

      const series = await getSeries({ folderPath })
      return series
    }))).filter(a => a)

    results = _.flatten(results)
    return results
  }
  catch (e) {
    console.error(e)
    return null
  }
}

export default perform

