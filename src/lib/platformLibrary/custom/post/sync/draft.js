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

  let series = null
  if (payload.series && payload.series.activity && payload.series.activity.platforms) {
    const p = payload.series.activity.platforms.find(a => a.id === payload.platform.id)
    if (p) {
      series = {
        index: payload.series.index,
        id: p.post.id
      }
    }
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
    thumbnail,
    mediaTypes,
    layout,
    incorrectness,
    excerpt,
    disciplines,
    targets,
    recap,
    category,
    subCategory,
    locale,
    blocks,
    bits,
    attachments,
    projects,
  } = payload

  try {
    let _content = await preprocess({ content })
    const { auth, endPoint } = platform
    const {
      accessKey,
      secretKey
    } = auth

    const url = `${endPoint}/post/draft`

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
        thumbnail,
        series,
        mediaTypes,
        layout,
        incorrectness,
        excerpt,
        disciplines,
        targets,
        recap,
        category,
        subCategory,
        locale,
        blocks,
        bits,
        projects,
      }
    })

    return {
      post: post.data,
      status: "draft",
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

