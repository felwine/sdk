import getEntries from '../lib/entries/index.js'
import sync from '../sync/entry.js'
import optimize from '../optimize/entry.js'
import cloudify from '../cloudify/entry.js'
import adaptSettings from '../../lib/adaptSettings.js'

export default async ({
  path,
  settings
}) => {
  adaptSettings({ settings })
  let entries = await getEntries({
    path,
    settings
  })

  for (var i in entries) {
    let entry = entries[i]

    // entry = (await consolidate({ entry, settings })).entry
    // entry = (await build({ entry, source: entry.post.consolidated, settings })).entry
    entry = (await optimize({ entry, settings })).entry
    entry = (await cloudify({ entry, settings })).entry

    if (settings.dryRun) {
      continue
    }

    await sync({
      entry,
      settings
    })
  }

  return true
}
