import preprocess from './lib/preprocess.js'
import axios from "axios"


export default async ({
  payload,
  platformInActivity
}) => {
  let id = null
  if (platformInActivity && platformInActivity.post && platformInActivity.post.id) {
    id = platformInActivity.post.id
  }


  const {
    platform,
    title,
    content,
    contentHTML,
    contentFormat = "markdown",
    publishStatus = "public",
    license = "all-rights-reserved",
    canonicalUrl,
    tags = [],
    notifyFollowers = true
  } = payload

  try {
    const { auth, endPoint } = platform
    const {
      token: accessKey,
    } = auth

    const url = `${endPoint}/unlist`

    let _content = await preprocess({ content })
    const post = await axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        AccessKey: accessKey,
        'Accept': 'application/json',
      },
      data: {
        title,
        content: _content,
        // userId,
        contentFormat,   // Defaults to `markdown`
        publishStatus,  // Defaults to `draft`
        tags,
        canonicalUrl,
        license,
        notifyFollowers,
        id
      }
    })

    return {
      post: post.data,
      status: "published",
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
