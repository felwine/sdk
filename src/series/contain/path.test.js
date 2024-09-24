
test.skip('contain posts', async () => {
  const fsPath = (await import('path')).default
  let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
  const operation = (await import('./path.js')).default

  const result = await operation({
    settings: {
      assets: {
        optimize: true
      }
    },
    path,
  })

  expect(result).toBeTruthy()
})
