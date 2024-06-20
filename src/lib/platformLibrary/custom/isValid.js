import axios from "axios"

export default async ({
  platform
} = {}) => {
  try {
    const { auth, endPoint } = platform
    const {
      token: accessKey,
    } = auth

    const url = `${endPoint}/healthcheck`

    const item = await axios({
      method: 'GET',
      url,
      headers: {
        AccessKey: accessKey,
        'Accept': 'application/json',
      },
    })

    return {
      isValid: item.data.healthy,
    }
  }
  catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}