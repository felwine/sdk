import platformLibrary from './platformLibrary/index.js'
import cloudLibrary from './cloudLibrary/index.js'

export default ({ settings }) => {

  if (!settings.platformLibrary) {
    settings.platformLibrary = platformLibrary
  }

  if (!settings.cloudLibrary) {
    settings.cloudLibrary = cloudLibrary
  }
}
