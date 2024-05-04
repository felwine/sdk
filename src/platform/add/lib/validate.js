import medium from './providers/medium.js'
import devto from './providers/devto.js'

export default async ({
  id,
  auth } = {}) => {

  switch (id) {
    case 'medium': {
      return medium({
        auth
      })
    }
    case 'devto': {
      return devto({
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
