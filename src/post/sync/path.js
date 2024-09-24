import perform from './lib/perform.js'
import getEntries from '../lib/entries/index.js'
import adaptSettings from '../../lib/adaptSettings.js'

export default async ({
  path,
  settings
}) => {
  adaptSettings({ settings })
  let entries = await getEntries({
    path,
  })

  for (var i in entries) {
    const entry = entries[i]
    await perform({ entry, settings })
  }

  return true
}
