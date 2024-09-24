
export default async (props) => {
  const { child, } = props

  return perform({
    child: child,
  })
}


const perform = async (props) => {
  const { child, } = props
  let _child = { ...child }
  if (qualify(_child)) {
    _child = {
      ..._child,
    }
  }

  let _children = []
  if (_child.children) {
    _children = await Promise.all(child.children.map(async __child => perform({
      ...props,
      child: __child
    })))
  }

  return {
    ..._child,
    children: _children
  }
}


const qualify = child => {
  if (child.type !== 'image') {
    return false
  }

  return true
}
