
test.skip('build posts', async () => {
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
      }],
      storage: {
        type: "cdn",
        auth: {
          key: '',
          secret: '',
          bucketName: ''
        }
      }
    },
    path,
  })
  expect(result).toBeTruthy()
})


