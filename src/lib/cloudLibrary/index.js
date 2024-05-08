import * as minio from './minio/index.js'

export default ({
  id,
} = {}) => {

  switch (id) {
    case 'minio': {
      return minio
    }
    default:
      break
  }

  return null
}
