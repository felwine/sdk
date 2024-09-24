import adaptSettings from '../../lib/adaptSettings.js'
import perform from './lib/perform.js'

export default async ({
  entry,
  settings,
  source
}) => {
  adaptSettings({ settings })
  return perform({
    entry,
    source,
    settings
  })
}
