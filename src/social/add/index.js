import adaptSettings from '../../lib/adaptSettings.js'
import update from '../../project/lib/manifest/update.js'
import validate from './lib/validate.js'

export default async ({
  path,
  social,
  settings = {}
}) => {

  try {
    adaptSettings({ settings })
    const { isValid, error } = await validate({ social, settings })

    if (!isValid) {
      return { isValid, error }
    }

    const socials = [social]

    await update({
      path,
      data: {
        socials: socials.map(item => {
          const a = {
            ...item,
          }
          delete a.auth
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
