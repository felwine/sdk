import markdownToLexer from '../../../lib/remark/markdownToLexer.js'
import mdastToHTML from '../../../lib/remark/mdastToHTML.js'
import mdastToMarkdown from '../../../lib/remark/mdastToMarkdown.js'
import reset from './reset.js'
import updatePost from './updatePost.js'

export default async (props) => {

  const { entry } = props
  const { path, } = entry
  const data = props.source ? props.source : (entry.post.consolidated
    ? entry.post.consolidated
    : entry.post.source)

  await reset({ path })

  const child = markdownToLexer({
    data
  })

  const mdast = await perform({
    child,
    path
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
    entry: mdast
  }
}

const perform = async (props) => {
  const { child, path } = props
  let _child = { ...child }
  // switch (_child.type) {
  //   case 'code': {
  //     switch (_child.lang) {
  //       case 'mermaid': {
  //         _child = await buildMermaid({
  //           child: _child,
  //           path
  //         })
  //       } break
  //       default:
  //         break
  //     }
  //   } break
  //   default:
  //     break
  // }

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
