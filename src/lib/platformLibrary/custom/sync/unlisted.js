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
    auth,
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
    const {
      endPoint,
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
      post,
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
