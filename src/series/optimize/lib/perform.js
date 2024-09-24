import thumbnail from './image/thumbnail.js'
import reset from './reset.js'

export default async (props) => {
  const { entry } = props
  const { path, } = entry

  await reset({ path })

  await thumbnail({
    thumbnailPath: entry.thumbnailPath,
    path
  })

  return {
    entry
  }
}
