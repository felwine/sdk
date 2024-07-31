

describe.skip('project', () => {
  it('creates new to medium and dev.to platforms', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)
    const operation = (await import('./plain.js')).default
    const result = await operation({
      settings: {
        platforms: [{
          id: 'medium',
          type: 'medium',
          auth: {
            token: process.env.TEST_MEDIUM_TOKEN,
          }
        },
        {
          id: 'devto',
          type: 'devto',
          auth: {
            token: process.env.TEST_DEVTO_TOKEN,
          }
        }],
        clouds: {
          id: "minio",
          auth: {
            endPoint: process.env.TEST_MINIO_ENDPOINT,
            accessKey: process.env.TEST_MINIO_ACCESS_KEY,
            secretKey: process.env.TEST_MINIO_SECRET,
            bucketName: process.env.TEST_MINIO_BUCKET_NAME
          }
        }
      },
      name: process.env.TEST_MOCK_FOLDER_NEW_NAME,
      path,
      force: true
    })
    expect(result).toBeTruthy()
  })
})
