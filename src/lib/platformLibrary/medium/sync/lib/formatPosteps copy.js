
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

  const text = child.value.split('::postep[')[1].split(']')[0]
  return {
    ...child,
    type: 'heading',
    depth: 2,
    value: null,
    children: [
      {
        type: 'text',
        value: text
      }
    ]
  }
}


const qualify = child => {
  if (child.type !== 'text'
    || !child.value
    || child.value.indexOf('::postep[') !== 0) {
    return false
  }

  return true
}
