import medium from './providers/medium.js'

export default async ({
  id,
  auth } = {}) => {

  switch (id) {
    case 'medium': {
      return medium({
        auth
      })
    }
    default:
      break
  }

  return {
    isValid: false,
    error: new Error('Platform not supported.')
  }
}
