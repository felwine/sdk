import update from '../../project/lib/manifest/update.js'
import validate from './lib/validate/index.js'

export default async ({
  path,
  cloud
}) => {

  try {
    const { isValid, error } = await validate(cloud)
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
