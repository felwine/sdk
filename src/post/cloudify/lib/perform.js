import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import mdastToHTML from '../../../lib/remark/mdastToHTML.js'
import mdastToMarkdown from '../../../lib/remark/mdastToMarkdown.js'
import performImage from './image/index.js'
import thumbnail from './image/thumbnail.js'
import reset from './reset.js'
import updatePost from './updatePost.js'

export default async (props) => {
  const { entry, settings } = props
  const { path, } = entry

  const data = props.source
    ? props.source
    : (entry.post.built
      ? entry.post.built
      : (entry.post.consolidated ? entry.post.consolidated : entry.post.source))

  await reset({ path })

  const child = markdownToLexer({
    data
  })

  const mdast = await perform({
    child,
    path,
    settings,
    entry
  })

  let md = await mdastToMarkdown({ mdast })
  let html = mdastToHTML({ mdast })

  await updatePost({
    path,
    md,
    html
  })

  const thumbnailUrl = await thumbnail({
    thumbnailPath: entry.thumbnailPath,
    path,
    entry,
    settings
  })

  return {
    md,
    html,
    mdast,
    entry: {
      ...entry,
      thumbnailUrl,
      post: {
        ...entry.post,
        cloud: md,
        cloudHTML: html
      }
    }
  }
}

const perform = async (props) => {
  const { child, path, settings, entry } = props
  let _child = { ...child }
  switch (_child.type) {
    case 'image': {
      _child = await performImage({
        child: _child,
        path,
        settings,
        entry
      })
    } break
    default:
      break
  }

  let _children = []
  if (_child.children) {
    _children = await Promise.all(_child.children.map(async child => perform({
      ...props,
      child
    })))
  }

  return {
    ..._child,
    children: _children
  }
}
