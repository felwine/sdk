import update from '../../project/lib/manifest/update.js'
import validate from './lib/validate.js'

export default async ({
  path,
  platform
}) => {

  try {
    // const { id, auth: { token } } = platform

    const { isValid, error } = await validate(platform)
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
