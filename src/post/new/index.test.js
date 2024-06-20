
test.skip('creates a new post', async () => {
  const fsPath = (await import('path')).default
  let path = fsPath.resolve(".mock/adoucoure/Development")
  const operation = (await import('./new.js')).default

  const result = await operation({
    platforms: [{
      id: 'medium',
    }],
    path,
    title: "Sample test post",
    force: true
  })

  expect(result).toBeTruthy()
})


