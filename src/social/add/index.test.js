describe.skip('social', () => {
  it('adds twitter', async () => {
    const fsPath = (await import('path')).default
    let path = `${fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)}/${process.env.TEST_MOCK_FOLDER_NEW_NAME}`
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
      social: {
        id: 'twitter',
        auth: {
          consumerKey: process.env.TEST_TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TEST_TWITTER_CONSUMER_SECRET,
          accessTokenKey: process.env.TEST_TWITTER_ACCESS_TOKEN_KEY,
          accessTokenSecret: process.env.TEST_TWITTER_ACCESS_TOKEN_SECRET
        }
      }
    })
    expect(result).toBeTruthy()
  })
})
