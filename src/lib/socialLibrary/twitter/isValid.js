
export default async ({
  auth,
}) => {

  try {
    const {
    } = auth
    return {
      isValid: false
    }
  } catch (e) {

    return {
      isValid: false,
      error: e
    }
  }
  return false
}
