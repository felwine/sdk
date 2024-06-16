import { Client } from 'devto-nodejs-sdk'

export default async ({
  platform
} = {}) => {
  try {
    const { auth, } = platform
    const { token } = auth
    const client = new Client(token)
    const listArticlesQuery = {
      tag: 'none'
    }
    await client.listArticles(listArticlesQuery)
    return {
      isValid: true,
    }
  }
  catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}
