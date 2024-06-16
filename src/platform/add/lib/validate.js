
export default async ({ platform, settings }) => {
  const {
    id,
  } = platform

  const platformLibrary = settings.platformLibrary({ id })
  if (!platformLibrary) {
    return {
      isValid: false,
      error: new Error('Platform not supported.')
    }
  }

  return platformLibrary.isValid({ platform })
}
