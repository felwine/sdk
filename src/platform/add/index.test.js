describe.skip('project', () => {
  it('adds medium platform', async () => {
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
    expect(result).toBeTruthy()
  })
  it('adds devto platform', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      platforms: {
        id: 'medium',
        auth: {
          token: process.env.TEST_MEDIUM_TOKEN,
        }
      }
    })
    expect(result).toBeTruthy()
  })
})
