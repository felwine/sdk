import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import mdastToHTML from '../../../lib/remark/mdastToHTML.js'
import mdastToMarkdown from '../../../lib/remark/mdastToMarkdown.js'
import consolidateImage from './image/index.js'
import reset from './reset.js'
import updatePost from './updatePost.js'
import updateTitle from './updateTitle.js'

export default async (props) => {
  const { entry, settings } = props
  const { path, manifest } = entry
  const data = props.source ? props.source : entry.post.source

  await reset({ path })

  const child = markdownToLexer({
    data
  })

  const mdast = await perform({
    child,
    path,
    settings
  })

  await updateTitle({
    child,
    path,
    manifest
  })

  let md = await mdastToMarkdown({ mdast })
  let html = mdastToHTML({ mdast })



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
        consolidated: md,
        consolidatedMdast: mdast
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
        path
      })
    } break
    // case 'paragraph': {
    //   if (settings.platforms[0].id === 'custom') {
    //     return _child
    //   }

    //   if (_child.children &&
    //     _child.children[0]
    //     && _child.children[0].value
    //     && _child.children[0].value.indexOf('::') === 0) {
    //     return null
    //   }

    //   return _child
    // } break
    // case 'leafDirective': {
    //   if (settings.platforms[0].id !== 'custom') {
    //     return null
    //   }
    //   const __child = {
    //     ..._child,
    //     type: 'paragraph',
    //     children: [
    //       ..._child.children,
    //     ]
    //   }
    //   __child.children[0] = {
    //     ...__child.children[0],
    //     type: 'text',
    //     value: `::${_child.name}[${__child.children[0].value}]`
    //   }
    //   return __child


    // } break
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
