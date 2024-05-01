import operation from "./"

test.skip('add a medium platform', async () => {
  const result = await operation({
    id: 'medium',
    params: {
      token: process.env.TEST_MEDIUM_TOKEN
    }
  })
  expect(result).not.toBeUndefined()
  expect(result.user)
})


