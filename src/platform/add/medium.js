import {
  MediumClient,
} from 'medium-sdk-ts'

export default async ({
  token
} = {}) => {
  //console.assert(token)

  try {
    const client = new MediumClient(token)

    const user = await client.getUser()
    console.log(`User: ${JSON.stringify(user, null, 2)}`)

    return client
  }
  catch (e) {
    console.error(e)
  }
  return null
}
