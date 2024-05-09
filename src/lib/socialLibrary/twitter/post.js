import client from "./lib/client.js"

export default async ({
  content,
  auth,
}) => {

  try {
    const {

    } = auth
    const _client = client({ auth })
    const result = await _client.post('statuses/update',
      { status: content })

    return { url }

  } catch (e) {
    console.error(e)
  }
  return null
}
