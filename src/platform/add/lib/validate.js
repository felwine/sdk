
export default async ({ platform, settings }) => {
  const {
    type,
  } = platform

  const platformLibrary = settings.platformLibrary({ type })
  if (!platformLibrary) {
    return {
      isValid: false,
      error: new Error('Platform not supported.')
    }
  }

  return platformLibrary.isValid({ platform })
}
