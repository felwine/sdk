
export default async (props) => {
  const { child, } = props

  let removedH1s = []
  return perform({
    child: child,
    removedH1s
  })
}


const perform = async (props) => {
  const { child, removedH1s } = props
  if (qualify(child) && !removedH1s.length) {
    removedH1s.push(child)
    return { type: 'paragraph' }
  }

  let _children = []
  if (child.children) {
    _children = await Promise.all(child.children.map(async child => perform({
      ...props,
      child
    })))
  }

  return {
    ...child,
    children: _children
  }
}


const qualify = child => {
  if (child.type !== 'heading') {
    return false
  }

  if (child.depth !== 1) {
    return false
  }

  if (!child.children || !child.children.length) {
    return false
  }

  return true
}
