import adaptSettings from '../../lib/adaptSettings.js'
import update from '../../project/lib/manifest/update.js'
import validate from './lib/validate.js'

export default async ({
  path,
  cloud,
  settings = {},

}) => {

  try {
    adaptSettings({ settings })
    const { isValid, error } = await validate({ cloud, settings })
    if (!isValid) {
      return { isValid, error }
    }

    const clouds = [cloud]

    await update({
      path,
      data: {
        clouds: clouds.map(cloud => {
          const a = {
            ...cloud,
          }
          if (settings.dontSaveSensitivePlatform) {
            delete a.auth
          }
          return a
        }),
      }
    })

    return { isValid: true, }
  } catch (e) {
    // console.error(e)
    return { isValid: true, error: e }
  }
}
