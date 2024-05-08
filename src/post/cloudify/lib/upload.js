export default async (props) => {

  const { id, settings } = props

  const cloudLibrary = settings.cloudLibrary({ id })
  if (!cloudLibrary) {
    return {
      isValid: false,
      error: new Error('Cloud not supported.')
    }
  }

  return cloudLibrary.upload(props)
}
