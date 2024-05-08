
export default async ({ cloud, settings }) => {
  const {
    id,
    auth } = cloud

  const cloudLibrary = settings.cloudLibrary({ id })
  if (!cloudLibrary) {
    return {
      isValid: false,
      error: new Error('Cloud not supported.')
    }
  }

  return cloudLibrary.isValid({ auth })
}
