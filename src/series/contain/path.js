import perform from './lib/perform.js'
import getEntries from '../lib/entries/index.js'

export default async ({
  path,
  settings
}) => {
  let entries = await getEntries({
    path,
  })

  for (var i in entries) {
    const entry = entries[i]
    await perform({ entry, settings })
  }

  return true
}
