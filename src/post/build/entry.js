import perform from './lib/perform.js'

export default async ({
  entry,
  settings,
  source
}) => {


  return perform({ entry, settings, source })
}
