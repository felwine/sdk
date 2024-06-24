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
    publishStatus = "draft",
    license = "all-rights-reserved",
    canonicalUrl,
    tags = [],
    notifyFollowers = true,
    thumbnailUrl,
    rubric,
    excerpt,
    disciplines,
    targets,
    recap,
    category,
    subCategory,
    locale,
    blocks,
    bits,
    attachments
  } = payload

  try {
    let _content = await preprocess({ content })
    const { auth, endPoint } = platform
    const {
      accessKey,
      secretKey
    } = auth

    const url = `${endPoint}/draft`

    const post = await axios({
      method: 'POST',
      url,
      headers: {
        'content-type': 'application/json',
        AccessKey: accessKey,
        SecretKey: secretKey,
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
        id,
        thumbnailUrl,
        rubric,
        excerpt,
        disciplines,
        targets,
        recap,
        category,
        subCategory,
        locale,
        blocks,
        bits,
      }
    })

    return {
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

