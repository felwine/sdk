import consolidate from '../consolidate/entry.js'
import getEntries from '../../lib/entries/getAtPath.js'
import build from '../build/entry.js'
import sync from '../sync/entry.js'
import optimize from '../optimize/entry.js'
import version from '../version/entry.js'
import cloudify from '../cloudify/entry.js'
// import contain from '../contain/entry.js'

export default async ({
  path,
  settings
}) => {
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

    await sync({
      entry,
      source: entry.post.cloud,
      // data: entry.post.cloud,
      // dataHTML: entry.post.cloudHTML,
      settings
    })

    // entry = (await contain({ entry, source: entry.post.optimized, settings })).entry
    await version({})
  }

  return true
}
