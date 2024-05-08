import BunnyCDNStorage from 'node-bunny-storage'

export default async ({
  auth,
}) => {

  try {
    const {
      accessKey,
      storageZoneName
    } = auth

    const bunny = new BunnyCDNStorage({
      accessKey: accessKey,
      storageZoneName: storageZoneName
    })

    const items = await bunny.listFiles({
      remoteDirectory: '/',
      recursive: false
    })

    return {
      isValid: true,
    }
  } catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}
