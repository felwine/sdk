import thumbnail from './image/thumbnail.js'
import reset from './reset.js'

export default async (props) => {
  const { entry, settings } = props
  const { path, } = entry

  await reset({ path })

  const thumbnailUrl = await thumbnail({
    thumbnailPath: entry.thumbnailPath,
    path,
    entry,
    settings
  })

  return {
    entry: {
      ...entry,
      thumbnailUrl,
    }
  }
}
