

describe('project', () => {
  it.skip('updates to medium via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'medium',
          type: 'medium',
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
            bucketName: process.env.TEST_MINIO_BUCKET_NAME,
            port: process.env.TEST_MINIO_PORT,
            isLocal: true
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
            type: 'devto',
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
            bucketName: process.env.TEST_MINIO_BUCKET_NAME,
            port: process.env.TEST_MINIO_PORT,
            isLocal: true
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
  it.skip('updates to medium via bunny', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'medium',
          type: 'medium',
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
  it.skip('updates to devto via bunny', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'devto',
          type: 'devto',
          auth: {
            token: process.env.TEST_DEVTO_TOKEN,
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
  it.skip('updates to custom via bunny', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'adoucoure.local',
          type: 'custom',
          endPoint: process.env.TEST_CUSTOM_ENDPOINT,
          auth: {
            token: process.env.TEST_CUSTOM_ACCESS_KEY,
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
  it.skip('updates to custom via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'adoucoure.local',
          type: 'custom',
          endPoint: process.env.TEST_CUSTOM_ENDPOINT,
          auth: {
            accessKey: process.env.TEST_CUSTOM_ACCESS_KEY,
            secretKey: process.env.TEST_CUSTOM_SECRET_KEY,
          }
        },],
        clouds: [{
          id: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME,
            port: process.env.TEST_MINIO_PORT,
            isLocal: true
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
  it('updates to adoucoure.local via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        forceSync: false,
        platforms: [{
          id: 'adoucoure.local',
          type: 'custom',
          endPoint: process.env.TEST_CUSTOM_ENDPOINT,
          auth: {
            accessKey: process.env.TEST_CUSTOM_ACCESS_KEY,
            secretKey: process.env.TEST_CUSTOM_SECRET_KEY,
          }
        },
        {
          id: 'devto',
          type: 'devto',
          auth: {
            token: process.env.TEST_DEVTO_TOKEN,
          }
        },],
        clouds: [{
          id: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME,
            port: process.env.TEST_MINIO_PORT,
            isLocal: true
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
  it.skip('updates to adoucoure.app via minio', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_ADOUCOURE_REMOTE_FOLDER)
    const operation = (await import('./path.js')).default
    const result = await operation({
      settings: {
        forceSync: false,
        platforms: [{
          id: 'adoucoure.remote',
          type: 'custom',
          endPoint: process.env.TEST_ADOUCOURE_REMOTE_ENDPOINT,
          auth: {
            accessKey: process.env.TEST_ADOUCOURE_REMOTE_ACCESS_KEY,
            secretKey: process.env.TEST_ADOUCOURE_REMOTE_SECRET_KEY,
          }
        }],
        clouds: [{
          id: "minio",
          auth: {
            endPoint: process.env.TEST_ADOUCOURE_REMOTE_MINIO_ENDPOINT,
            accessKey: process.env.TEST_ADOUCOURE_REMOTE_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_ADOUCOURE_REMOTE_MINIO_SECRET,
            bucketName: process.env.TEST_ADOUCOURE_REMOTE_MINIO_BUCKET_NAME
          }
        },],
        notifyFollowers: false
      },
      path,
    })
    expect(result).toBeTruthy()
  })
})



