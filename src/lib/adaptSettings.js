import platformLibrary from './platformLibrary/index.js'
import cloudLibrary from './cloudLibrary/index.js'
import socialLibrary from './socialLibrary/index.js'

export default ({ settings }) => {

  if (!settings.platformLibrary) {
    settings.platformLibrary = platformLibrary
  }

  if (!settings.cloudLibrary) {
    settings.cloudLibrary = cloudLibrary
  }

  if (!settings.socialLibrary) {
    settings.socialLibrary = socialLibrary
  }
}
