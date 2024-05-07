import reset from './reset.js'
import { sha256 } from 'js-sha256'
import updateActivity from '../../lib/activity/updateToFile.js'

export default async (props) => {

  const { entry, settings } = props
  const { path, activity, manifest } = entry

  const content = props.source
    ? props.source
    : (entry.post.cloud ? entry.post.cloud : entry.post.optimized)

  const contentHTML = props.sourceHTML
    ? props.sourceHTML
    : (entry.post.cloudHTML ? entry.post.cloudHTML : entry.post.optimized)

  if (!content) {
    return { child }
  }

  await reset({ path })

  const dataSHA = sha256(JSON.stringify(content))

  const { license, tags, title, status: targetStatus } = entry.manifest


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
      continue
    }

    platformInActivity = {
      ...platformInActivity,
      sha: dataSHA
    }

    let result = null
    const payload = {
      auth: platform.auth,
      license,
      tags,
      content,
      contentHTML,
      // contentFormat: 'html',
      // publishStatus: 'public',
      title,
      notifyFollowers: settings.notifyFollowers
    }

    try {
      const operationPath = `./providers/${platform.id}/${targetStatus}.js`
      const operation = (await import(operationPath)).default
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
