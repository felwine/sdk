

describe.skip('project', () => {
  it('ensures a folder is a project', async () => {
    const fsPath = (await import('path')).default
    let path = fsPath.resolve(process.env.TEST_MOCK_FOLDER_ROOT)
    const operation = (await import('./index.js')).default
    const result = await operation({
      path,
    })
    expect(result).toBeTruthy()
  })
})
