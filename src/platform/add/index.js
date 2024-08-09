import adaptSettings from '../../lib/adaptSettings.js'
import update from '../../project/lib/manifest/update.js'
import validate from './lib/validate.js'

export default async ({
  path,
  platform,
  settings = {}
}) => {

  try {
    // const { id, auth: { token } } = platform

    adaptSettings({ settings })
    const { isValid, error } = await validate({ platform, settings })

    if (!isValid) {
      return { isValid, error }
    }

    const platforms = [platform]

    await update({
      path,
      data: {
        platforms: platforms.map(platform => {
          const a = {
            ...platform,
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
