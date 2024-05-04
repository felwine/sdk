import { Client } from 'devto-nodejs-sdk'
import preprocess from './lib/preprocess.js'
// https://developers.forem.com/api/
export default async ({ payload, platformInActivity }) => {
  const { auth,
    title,
    content,
    license = 'all-rights-reserved',
    canonicalUrl,
    tags = [],
  } = payload
  try {
    let id = null
    if (platformInActivity && platformInActivity.post && platformInActivity.post.id) {
      id = platformInActivity.post.id
    }

    let _content = await preprocess({ content })
    const { token } = auth
    const client = new Client(token)
    const article = {
      title,
      bodyMarkdown: _content,
      published: false,
      tags: tags.join(',')
    }

    const post = id
      ? await client.updateArticle(id, { article })
      : await client.createArticle({ article })

    return {
      status: 'draft',
      post: post.data
    }
  }
  catch (e) {
    console.error(e)
    return {
      status: 'failed',
      error: e
    }
  }
}
