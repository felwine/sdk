import {
  MediumClient,
} from '@felwine/medium-api'

export default async ({
  auth
} = {}) => {
  try {
    const { token } = auth
    const client = new MediumClient(token)
    const user = await client.getUser()
    return {
      isValid: true,
      data: {
        user
      }
    }
  }
  catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}
