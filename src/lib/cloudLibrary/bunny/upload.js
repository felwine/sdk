import BunnyCDNStorage from 'node-bunny-storage'

export default async ({
  sourceUrl,
  filename,
  auth,
  // contentType = 'image/png'
}) => {

  try {
    const {
      accessKey,
      storageZoneName,
      pullZone
    } = auth

    const bunny = new BunnyCDNStorage({
      accessKey: accessKey,
      storageZoneName: storageZoneName
    })

    const result = await bunny.uploadFile({
      localFilePath: sourceUrl,
      // remoteDirectory: 'default'
    })


    const url = `https://${pullZone}.b-cdn.net/${filename}`
    return { url }

  } catch (e) {
    console.error(e)
  }
  return null
}
