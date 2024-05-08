import * as minio from './minio/index.js'
import * as bunny from './bunny/index.js'

export default ({
  id,
} = {}) => {

  switch (id) {
    case 'minio': {
      return minio
    }
    case 'bunny': {
      return bunny
    }
    default:
      break
  }

  return null
}
