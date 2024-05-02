// import {
//   MediumClient,
//   PostContentFormat,
//   PostPublishStatus,
//   PostLicense
// } from 'medium-sdk-ts'

export default async ({
  auth,
  title,
  content,
  contentFormat = PostContentFormat.MARKDOWN,
  publishStatus = PostPublishStatus.DRAFT,
  license = PostLicense.ALL_RIGHTS_RESERVED,
  canonicalUrl,
  tags = [],
} = {}) => {
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
