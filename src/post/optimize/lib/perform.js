import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import mdastToHTML from '../../../lib/remark/mdastToHTML.js'
import mdastToMarkdown from '../../../lib/remark/mdastToMarkdown.js'
import performImage from './image/index.js'
import optimizeThumbnail from './image/thumbnail.js'
import reset from './reset.js'
import updatePost from './updatePost.js'


export default async (props) => {
  const { entry } = props
  const { path, } = entry

  const data = props.source
    ? props.source
    : entry.post.consolidated ? entry.post.consolidated : entry.post.source

  await reset({ path })

  const child = markdownToLexer({
    data
  })

  const mdast = await perform({
    child,
    path
  })

  let md = await mdastToMarkdown({ mdast })
  let html = mdastToHTML({ mdast })

  await updatePost({
    path,
    md,
    html
  })

  await optimizeThumbnail({
    thumbnailPath: entry.thumbnailPath,
    path
  })

  return {
    md,
    html,
    mdast,
    entry: {
      ...entry,
      post: {
        ...entry.post,
        optimized: md,
      }
    }
  }
}

const perform = async (props) => {
  const { child, path } = props
  let _child = { ...child }
  switch (_child.type) {
    case 'image': {
      _child = await performImage({
        child: _child,
        path
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
