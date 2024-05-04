import * as uploaders from './index.js'

export default async (props) => {
  const { id } = props
  switch (id) {
    case 'picgo': {
      return uploaders.picgo(props)
    }
    case 'minio': {
      return uploaders.minio(props)
    }
    default: break
  }

  return null
}
