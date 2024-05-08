import BunnyCDNStorage from 'node-bunny-storage';

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

    await bunny.listFiles({
      remoteDirectory: '/',
      recursive: true,
      excludedFileTypes: ['.md'], // exclude .md files
      fileFilter: (filepath) => {
        return !filepath.includes(fileName)
      }
    })

    return {
      isValid: exists,
    }
  } catch (e) {
    return {
      isValid: false,
      error: e
    }
  }
}
