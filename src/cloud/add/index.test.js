

describe('project', () => {
  it.skip('adds a minio platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      cloud: {
        id: "minio",
        auth: {
          endPoint: process.env.TEST_MINIO_ENDPOINT,
          accessKey: process.env.TEST_MINIO_ACCESS_KEY,
          secretKey: process.env.TEST_MINIO_SECRET,
          bucketName: process.env.TEST_MINIO_BUCKET_NAME
        }
      }
    })
    expect(result.isValid).toBeTruthy()
  })
  it.skip('adds a bunny platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      cloud: {
        id: "bunny",
        auth: {
          accessKey: process.env.TEST_BUNNY_ACCESS_KEY,
          storageZoneName: process.env.TEST_BUNNY_STORAGE_ZONE_NAME,
        }
      }
    })
    expect(result.isValid).toBeTruthy()
  })
})
