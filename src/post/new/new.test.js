
test.skip('creates a new post', async () => {
  const fsPath = (await import('path')).default
  let parentPath = fsPath.resolve("__mock__/adoucoure/Development")
  const operation = (await import('./new.js')).default

  const result = await operation({
    platforms: [{
      id: 'medium',
    }],
    parentPath,
    name: "Sample test post"
  })

  expect(result).toBeTruthy()
})


