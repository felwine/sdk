import client from "./lib/client.js"

export default async ({
  auth,
}) => {
  try {
    const _client = client({ auth })
    var params = { screen_name: 'nodejs' }
    const list = await _client.get('statuses/home_timeline', params)
    return {
      isValid: true
    }
  } catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}
