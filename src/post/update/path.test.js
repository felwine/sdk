

describe.skip('project', () => {
  it('updates to medium and dev.to platforms', async () => {
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
        {
          id: 'devto',
          auth: {
            token: process.env.TEST_DEVTO_TOKEN,
          }
        }],
        cloud: {
          type: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME
          }
        }
      },
      path,
    })
    expect(result).toBeTruthy()
  })
})
