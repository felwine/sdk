import checkFileExists from '../fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'
import _ from 'underscore'
import importJSONAsync from "../fs/importJSONAsync.js"
import markdownToLexer from '../remark/markdownToLexer.js'
import createActivityIfNeeded from '../../post/lib/activity/createActivityFileIfNeeded.js'
import isPathEntry from './isPathEntry.js'
import { nanoid } from 'nanoid'
import frontmatter from 'frontmatter'

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

      const postPath = fsPath.join(folderPath, 'post.md')
      const excerptPath = fsPath.join(folderPath, 'excerpt.md')
      const postConsolidatedPath = fsPath.join(folderPath, 'build/.post.consolidated.md')
      const postBuiltPath = fsPath.join(folderPath, 'build/.post.built.md')
      const postOptimizedPath = fsPath.join(folderPath, 'build/.post.optimized.md')
      const postCloudPath = fsPath.join(folderPath, 'build/.post.cloud.md')
      const activityPath = fsPath.join(folderPath, 'assets/.activity.json')
      let thumbnailPath = fsPath.join(folderPath, 'thumbnail.png')

      if (!(await isPathEntry({ path: folderPath }))) {
        return perform({
          ...props,
          path: folderPath
        })
      }

      await createActivityIfNeeded({ path: folderPath })

      let post = await fs.promises.readFile(postPath, 'utf8')
      const _m = frontmatter(post)
      post = _m.content.trim()

      const postMdast = markdownToLexer({
        data: post
      })

      const manifest = _m.data
      if (!manifest.sync) {
        return null
      }

      let postConsolidated = null
      let postConsolidatedMdast = null
      let postBuilt = null
      let postOptimized = null
      let postCloud = null
      let postBuiltMdast = null
      let excerpt = null
      let activity = null
      let thumbnail

      if (await checkFileExists(postConsolidatedPath)) {
        postConsolidated = await fs.promises.readFile(postConsolidatedPath, 'utf8')
        postConsolidatedMdast = markdownToLexer({
          data: postConsolidated
        })
      }

      if (await checkFileExists(postBuiltPath)) {
        postBuilt = await fs.promises.readFile(postBuiltPath, 'utf8')
        postBuiltMdast = markdownToLexer({
          data: postBuilt
        })
      }

      if (await checkFileExists(excerptPath)) {
        excerpt = await fs.promises.readFile(excerptPath, 'utf8')
      }

      if (await checkFileExists(postOptimizedPath)) {
        postOptimized = await fs.promises.readFile(postOptimizedPath, 'utf8')
      }

      if (await checkFileExists(postCloudPath)) {
        postCloud = await fs.promises.readFile(postCloudPath, 'utf8')
      }

      if (await checkFileExists(activityPath)) {
        activity = await importJSONAsync(activityPath)
      }

      if (await checkFileExists(thumbnailPath)) {
        thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
      }
      if (!thumbnail) {
        thumbnailPath = fsPath.join(folderPath, 'thumbnail.jpg')
        if (await checkFileExists(thumbnailPath)) {
          thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
        }
      }
      if (!thumbnail) {
        thumbnailPath = fsPath.join(folderPath, 'thumbnail.jpeg')
        if (await checkFileExists(thumbnailPath)) {
          thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
        }
      }
      if (!thumbnail) {
        thumbnailPath = fsPath.join(folderPath, 'thumbnail.webp')
        if (await checkFileExists(thumbnailPath)) {
          thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
        }
      }
      if (!thumbnail) {
        thumbnailPath = null
      }

      let id
      if (manifest) {
        id = manifest.id
      }

      if (!id) {
        id = nanoid()
        if (manifest) {
          manifest.id = id
        }
      }



      return [{
        id,
        path: folderPath,
        excerpt,
        post,
        postMdast,
        postBuilt,
        postBuiltMdast,
        postConsolidated,
        postConsolidatedMdast,
        postCloud,
        postOptimized,
        manifest,
        activity,
        thumbnailPath,
        thumbnail,
        post: {
          source: post,
          mdast: postMdast,
          built: postBuilt,
          consolidated: postConsolidated,
          consolidatedMdast: postConsolidatedMdast,
          cloud: postCloud,
          optimized: postOptimized
        }
      }]
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
