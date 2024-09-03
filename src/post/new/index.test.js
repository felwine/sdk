
test('creates a new post', async () => {
  const fsPath = (await import('path')).default
  let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER)
  const operation = (await import('./index.js')).default

  const result = await operation({
    platforms: [{
      id: 'medium',
      type: 'medium',
    }],
    path,
    title: "Sample test post 3",
    force: true
  })

  expect(result).toBeTruthy()
})


