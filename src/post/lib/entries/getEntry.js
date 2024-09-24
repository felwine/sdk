import checkFileExists from '../../../lib/fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'
import importJSONAsync from "../../../lib/fs/importJSONAsync.js"
import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import createActivityIfNeeded from '../postfile/activity/createActivityFileIfNeeded.js'
import { nanoid } from 'nanoid'
import frontmatter from 'frontmatter'
import createBuildIfNeeded from '../postfile/build/createBuildIfNeeded.js'

export default async ({
  path,
  series
}) => {
  const postPath = fsPath.join(path, 'post.md')
  const excerptPath = fsPath.join(path, 'excerpt.md')
  const postConsolidatedPath = fsPath.join(path, 'build/.post.consolidated.md')
  const postBuiltPath = fsPath.join(path, 'build/.post.built.md')
  const postOptimizedPath = fsPath.join(path, 'build/.post.optimized.md')
  const postCloudPath = fsPath.join(path, 'build/.post.cloud.md')
  const activityPath = fsPath.join(path, 'assets/.activity.json')
  let thumbnailPath = fsPath.join(path, 'thumbnail.png')

  await createActivityIfNeeded({ path: path })
  await createBuildIfNeeded({ path: path })

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
    thumbnailPath = fsPath.join(path, 'thumbnail.jpg')
    if (await checkFileExists(thumbnailPath)) {
      thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
    }
  }
  if (!thumbnail) {
    thumbnailPath = fsPath.join(path, 'thumbnail.jpeg')
    if (await checkFileExists(thumbnailPath)) {
      thumbnail = await fs.promises.readFile(thumbnailPath, 'utf8')
    }
  }
  if (!thumbnail) {
    thumbnailPath = fsPath.join(path, 'thumbnail.webp')
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
    series,
    path: path,
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
}


