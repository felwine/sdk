import reset from './reset.js'
import { sha256 } from 'js-sha256'
import updateActivity from '../../lib/activity/updateToFile.js'

export default async (props) => {

  const { entry, settings } = props
  const { path, activity, manifest } = entry

  let content = props.source
    ? props.source
    : (entry.post.cloud ? entry.post.cloud : entry.post.optimized)

  // if (settings.platforms[0].id === 'custom') {
  //   content = content.replaceAll('\\[', '[')
  // }

  const contentHTML = props.sourceHTML
    ? props.sourceHTML
    : (entry.post.cloudHTML ? entry.post.cloudHTML : entry.post.optimized)

  if (!content) {
    return { child }
  }

  await reset({ path })

  const dataSHA = sha256(JSON.stringify({
    content,
    excerpt: entry.excerpt,
    status: manifest.status,
    series: manifest.series,
    thumbnail: manifest.thumbnail,
    tags: manifest.tags,
    disciplines: manifest.disciplines,
    category: manifest.category,
    bits: manifest.bits,
    locale: manifest.locale,
    mediaTypes: manifest.mediaTypes,
    recap: manifest.recap,
    sync: manifest.sync,
    thumbnail: entry.thumbnail,
    thumbnailUrl: entry.thumbnailUrl,
  }))

  const {
    license,
    tags,
    title,
    rubric,
    thumbnail,
    series,
    mediaTypes,
    layout,
    incorrectness,
    disciplines,
    targets,
    recap,
    category,
    subCategory,
    locale,
    blocks,
    bits,
    attachments,
    status: targetStatus } = entry.manifest


  let platforms = applicablePlatforms({ settings, manifest })
  if (!platforms || !platforms.length) {
    return activity
  }

  const platformsInActivity = []

  const results = []
  for (var i in platforms) {
    const platform = platforms[i]
    let platformInActivity = null
    if (activity.platforms) {
      platformInActivity = activity.platforms.find(
        a => (a && (a.id === platform.id)))
    }

    if (!platformInActivity || !platformInActivity.id) {
      platformInActivity = {
        id: platform.id,
      }
    }

    if (platformInActivity.status === targetStatus
      && platformInActivity.sha === dataSHA) {
      platformsInActivity.push(platformInActivity)
      if (!settings.forceSync) {
        continue
      }
    }

    platformInActivity = {
      ...platformInActivity,
      sha: dataSHA
    }

    let result = null
    const payload = {
      auth: platform.auth,
      platform,
      license,
      tags,
      content,
      contentHTML,
      // contentFormat: 'html',
      // publishStatus: 'public',
      title,
      notifyFollowers: settings.notifyFollowers,
      thumbnailUrl: entry.thumbnailUrl,
      rubric,
      thumbnail,
      series,
      mediaTypes,
      layout,
      incorrectness,
      locale,
      disciplines,
      targets,
      recap,
      category,
      subCategory,
      blocks,
      bits,
      attachments,
      excerpt: entry.excerpt ? entry.excerpt : entry.manifest.excerpt,
    }

    try {
      const platformLibrary = settings.platformLibrary({ ...platform })
      const operation = platformLibrary.sync[targetStatus]
      result = await operation({ payload, platformInActivity })
      results.push(result)
    } catch (e) {
      console.error(e)
      result = {
        status: 'failed',
        error: e
      }
      results.push(result)
    }

    platformInActivity = {
      ...platformInActivity,
      ...result,
      updatedAt: (new Date())
    }

    platformsInActivity.push(platformInActivity)
  }

  if (results.length) {
    const _activity = {
      ...activity,
      platforms: platformsInActivity,
      status: "published"
    }

    await updateActivity({
      path,
      content: _activity,
    })

    return _activity
  }

  return activity
}

const applicablePlatforms = (props) => {
  const { manifest, settings } = props

  let platforms = settings.platforms
  if (manifest.platforms && manifest.platforms.length) {
    platforms = platforms.filter(a =>
      (a && manifest.platforms.filter(b => b.id === a.id).length)
    )
  }

  return platforms
}

