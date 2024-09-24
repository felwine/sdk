import checkFileExists from '../../../lib/fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'
import _ from 'underscore'
import isPathEntry from './isPathEntry.js'
import isPathSeries from '../../../series/lib/entries/isPathSeries.js'
import getEntry from './getEntry.js'
import getSeries from '../../../series/lib/entries/getSeries.js'

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

      if ((await isPathSeries({ path: folderPath }))) {
        const series = await getSeries({ folderPath })
        return perform({
          ...props,
          series,
          path: folderPath
        })
      }


      if (!(await isPathEntry({ path: folderPath }))) {
        return perform({
          ...props,
          path: folderPath
        })
      }


      return getEntry({
        path: folderPath,
        series: props.series
      })
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

