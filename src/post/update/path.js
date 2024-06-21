import consolidate from '../consolidate/entry.js'
import getEntries from '../../lib/entries/getAtPath.js'
import build from '../build/entry.js'
import sync from '../sync/entry.js'
import optimize from '../optimize/entry.js'
import version from '../version/entry.js'
import cloudify from '../cloudify/entry.js'
import adaptSettings from '../../lib/adaptSettings.js'
// import contain from '../contain/entry.js'

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

    entry = (await consolidate({ entry, settings })).entry
    entry = (await build({ entry, source: entry.post.consolidated, settings })).entry
    entry = (await optimize({ entry, source: entry.post.built, settings })).entry
    entry = (await cloudify({ entry, source: entry.post.optimized, settings })).entry

    await sync({
      entry,
      source: entry.post.cloud,
      sourceHTML: entry.post.cloudHTML,
      // data: entry.post.cloud,
      // dataHTML: entry.post.cloudHTML,
      settings
    })

    // entry = (await contain({ entry, source: entry.post.optimized, settings })).entry
    await version({})
  }

  return true
}

// for (const platform of settings.platforms) {
//   let _settings = {
//     ...settings,
//     platforms: [platform]
//   }

//   for (var i in entries) {
//     let entry = entries[i]

//     entry = (await consolidate({ entry, settings: _settings })).entry
//     entry = (await build({ entry, source: entry.post.consolidated, settings: _settings })).entry
//     entry = (await optimize({ entry, source: entry.post.built, settings: _settings })).entry
//     entry = (await cloudify({ entry, source: entry.post.optimized, settings: _settings })).entry

//     await sync({
//       entry,
//       source: entry.post.cloud,
//       sourceHTML: entry.post.cloudHTML,
//       // data: entry.post.cloud,
//       // dataHTML: entry.post.cloudHTML,
//       settings: _settings
//     })

//     // entry = (await contain({ entry, source: entry.post.optimized, settings })).entry
//     await version({})
//   }
// }
