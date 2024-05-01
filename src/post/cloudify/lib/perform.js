import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import mdastToHTML from '../../../lib/remark/mdastToHTML.js'
import mdastToMarkdown from '../../../lib/remark/mdastToMarkdown.js'
import consolidateImage from './image/index.js'
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
    settings
  })

  let md = await mdastToMarkdown({ mdast })
  let html = await mdastToHTML({ mdast })

  await updatePost({
    path,
    md,
    html
  })

  return {
    md,
    html,
    mdast,
    entry: {
      ...entry,
      post: {
        ...entry.post,
        cloud: md,
        cloudHTML: html
      }
    }
  }
}

const perform = async (props) => {
  const { child, path, settings } = props
  let _child = { ...child }
  switch (_child.type) {
    case 'image': {
      _child = await consolidateImage({
        child: _child,
        path,
        settings
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
