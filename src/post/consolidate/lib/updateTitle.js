import updatePostFile from "../../lib/postfile/update.js"

export default async (props) => {
  const { child, path, manifest } = props

  const h1 = await perform({
    child,
  })

  if (!h1) {
    return
  }

  manifest.title = h1.children[0].value
  await updatePostFile({ path, manifest })
}

const perform = async (props) => {
  const { child, } = props

  if (qualify(child)) {
    return child
  }

  return child.children.find(qualify)
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
