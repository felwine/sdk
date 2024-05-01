

test.skip('version posts', async () => {
  const fsPath = (await import('path')).default
  let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
  const operation = (await import('./path.js')).default

  const result = await operation({
    settings: {
    },
    path,
  })
  expect(result).toBeTruthy()
})


