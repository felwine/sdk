import consolidate from '../consolidate/entry.js'
import getEntries from '../lib/entries/index.js'
import build from '../build/entry.js'
import sync from '../sync/entry.js'
import optimize from '../optimize/entry.js'
import version from '../version/entry.js'
import cloudify from '../cloudify/entry.js'
import adaptSettings from '../../lib/adaptSettings.js'
import updateSeries from '../../series/update/path.js'

export default async ({
  path,
  settings
}) => {

  adaptSettings({ settings })
  await updateSeries({ settings, path })

  let entries = await getEntries({
    path,
    settings
  })

  for (var i in entries) {
    let entry = entries[i]

    entry = (await consolidate({ entry, settings })).entry
    entry = (await build({ entry, source: entry.post.consolidated, settings })).entry
    entry = (await optimize({ entry, source: entry.post.built, settings })).entry
    entry = (await cloudify({ entry, source: entry.post.optimized, settings })).entry

    if (settings.dryRun) {
      continue
    }

    await sync({
      entry,
      source: entry.post.cloud,
      sourceHTML: entry.post.cloudHTML,
      settings
    })

    await version({})
  }

  return true
}
