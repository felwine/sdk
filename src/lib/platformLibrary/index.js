import * as medium from './medium/index.js'
import * as devto from './devto/index.js'

export default ({
  id,
} = {}) => {

  switch (id) {
    case 'medium': {
      return medium
    }
    case 'devto': {
      return devto
    }
    default:
      break
  }

  return null
}
