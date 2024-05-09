
export default async ({ social, settings }) => {
  const {
    id,
    auth } = social

  const library = settings.socialLibrary({ id })
  if (!library) {
    return {
      isValid: false,
      error: new Error('Platform not supported.')
    }
  }

  return library.isValid({ auth })
}
