import minio from './providers/minio.js'

export default async ({
  id,
  auth } = {}) => {

  switch (id) {
    case 'minio': {
      return minio({
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
