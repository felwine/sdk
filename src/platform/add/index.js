import * as dotenv from 'dotenv'
import medium from './medium.js'

dotenv.config()

export default async ({
  id,
  params } = {}) => {
  //console.assert(id)

  let platform = null
  switch (id) {
    case 'medium': {
      const user = await medium({
        ...params
      })

      platform = { user }
    } break
    default:
      break
  }

  return platform
}
