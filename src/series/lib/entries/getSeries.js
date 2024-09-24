import checkFileExists from '../../../lib/fs/checkFileExists.js'
import fs from 'fs'
import fsPath from 'path'
import importJSONAsync from "../../../lib/fs/importJSONAsync.js"
import { nanoid } from 'nanoid'
import createSeriesActivityFileIfNeeded from '../activity/createActivityFileIfNeeded.js'

import importYAMLAsync from '../../../lib/fs/importYAMLAsync.js'
import createBuildIfNeeded from '../build/createBuildIfNeeded.js'
import createAssetsIfNeeded from '../manifest/createAssetsIfNeeded.js'


export default async ({ folderPath }) => {
  const manifestPath = fsPath.join(folderPath, 'series.yaml')
  const activityPath = fsPath.join(folderPath, 'assets/.activity.json')
  let thumbnailPath = fsPath.join(folderPath, 'thumbnail.png')

  await createBuildIfNeeded({ path: folderPath })
  await createAssetsIfNeeded({ path: folderPath })
  await createSeriesActivityFileIfNeeded({ path: folderPath })

  const manifest = await importYAMLAsync(manifestPath)

  let activity = null
  let thumbnail

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

  return {
    id,
    path: folderPath,
    manifest,
    activity,
    thumbnailPath,
    thumbnail,
  }
}
