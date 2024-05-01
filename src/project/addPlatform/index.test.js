

describe('project', () => {
  it('creates new to medium and dev.to platforms', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
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
      }]
    })
    expect(result).toBeTruthy()
  })
})
