import * as medium from './medium/index.js'
import * as devto from './devto/index.js'
import * as custom from './custom/index.js'

export default ({
  id,
  type
} = {}) => {

  switch (type) {
    case 'medium': {
      return medium
    }
    case 'devto': {
      return devto
    }
    case 'custom': {
      return custom
    }
    default:
      break
  }

  return null
}
