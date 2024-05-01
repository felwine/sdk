import {
  MediumClient,
  PostContentFormat,
  PostPublishStatus,
  PostLicense
} from 'medium-sdk-ts'

export default async ({
  payload,
  platformInActivity
}) => {
  if (platformInActivity && platformInActivity.post && platformInActivity.post.id) {
    return {
      post: platformInActivity.post
    }
  }

  const {
    auth,
    title,
    content,
    contentFormat = PostContentFormat.MARKDOWN,
    publishStatus = PostPublishStatus.UNLISTED,
    license = PostLicense.ALL_RIGHTS_RESERVED,
    canonicalUrl,
    tags = [],
  } = payload

  try {
    const { token } = auth
    const client = new MediumClient(token)
    const user = await client.getUser()

    const { id: userId, username } = user

    const post = await client.createPost({
      title,
      content,
      userId,
      contentFormat,   // Defaults to `markdown`
      publishStatus,  // Defaults to `draft`
      tags,
      canonicalUrl,
      license,
    })

    return {
      status: "published",
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
