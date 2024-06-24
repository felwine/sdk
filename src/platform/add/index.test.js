describe.skip('project', () => {
  it.skip('adds medium platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      platform: {
        id: 'medium',
        auth: {
          token: process.env.TEST_MEDIUM_TOKEN,
        }
      }
    })
    expect(result.isValid).toBeTruthy()
  })
  it.skip('adds devto platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      platform: {
        id: 'medium',
        auth: {
          token: process.env.TEST_MEDIUM_TOKEN,
        }
      }
    })
    expect(result.isValid).toBeTruthy()
  })
  it('adds a custom platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      platform: {
        id: 'custom',
        auth: {
          accessKey: process.env.TEST_CUSTOM_ACCESS_KEY,
          secretKey: process.env.TEST_CUSTOM_SECRET_KEY,
          endPoint: process.env.TEST_CUSTOM_ENDPOINT,
        }
      }
    })
    expect(result.isValid).toBeTruthy()
  })
})
