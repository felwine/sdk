
export default async (props) => {
  const { child, } = props

  return perform({
    child: child,
  })
}

const perform = async (props) => {
  const { child, } = props
  if (!qualify(child)) {
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

  const firstChild = child.children[0]
  const parts = firstChild.value.split('#felwine-step')

  return {
    ...child,
    type: 'heading',
    depth: 2,
    value: null,
    children: [
      {
        type: 'text',
        value: parts[0]
      }
    ]
  }
}


const qualify = child => {
  if (child.type !== 'heading') {
    return false
  }

  if (child.depth !== 2) {
    return false
  }

  if (!child.children || !child.children.length) {
    return false
  }

  const firstChild = child.children[0]
  if (firstChild.value.split('#felwine-step').length < 2) {
    return false
  }

  return true
}
