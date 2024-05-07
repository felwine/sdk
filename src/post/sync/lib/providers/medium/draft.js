import {
  MediumClient
} from '@felwine/medium-api'
import preprocess from './lib/preprocess.js'

export default async ({
  payload,
  platformInActivity
}) => {
  if (platformInActivity && platformInActivity.post && platformInActivity.post.id) {
    // return {
    //   post: platformInActivity.post
    // }
  }

  const {
    auth,
    title,
    content,
    contentHTML,
    contentFormat = "markdown",
    publishStatus = "draft",
    license = "all-rights-reserved",
    canonicalUrl,
    tags = [],
    notifyFollowers = true
  } = payload

  try {
    const { token } = auth
    const client = new MediumClient(token)
    const user = await client.getUser()

    const { id: userId, username } = user
    let _content = await preprocess({ content })
    const post = await client.createPost({
      title,
      content: _content,
      userId,
      contentFormat: "html",   // Defaults to `markdown`
      publishStatus,  // Defaults to `draft`
      tags,
      canonicalUrl,
      license,
      notifyFollowers
    })

    return {
      post
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
