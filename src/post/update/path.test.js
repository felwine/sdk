

describe('project', () => {
  it.skip('updates to medium via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'medium',
          auth: {
            token: process.env.TEST_MEDIUM_TOKEN,
          }
        },
        ],
        clouds: [{
          id: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
  it.skip('updates to dev.to via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [
          {
            id: 'devto',
            auth: {
              token: process.env.TEST_DEVTO_TOKEN,
            }
          }
        ],
        clouds: [{
          id: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
  it('updates to medium via bunny', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'medium',
          auth: {
            token: process.env.TEST_MEDIUM_TOKEN,
          }
        },],
        clouds: [{
          id: "bunny",
          auth: {
            accessKey: process.env.TEST_BUNNY_ACCESS_KEY,
            storageZoneName: process.env.TEST_BUNNY_STORAGE_ZONE_NAME,
            pullZone: process.env.TEST_BUNNY_PULL_ZONE
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
})
