import update from '../lib/manifest/update.js'

export default async ({
  path,
  platforms
}) => {
  try {
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

    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
