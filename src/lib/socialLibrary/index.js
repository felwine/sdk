import * as instagram from './instagram/index.js'
import * as twitter from './twitter/index.js'

export default ({
  id,
} = {}) => {

  switch (id) {
    case 'instagram': {
      return instagram
    }
    case 'twitter': {
      return twitter
    }
    default:
      break
  }

  return null
}
