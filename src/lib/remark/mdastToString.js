import { toString } from 'mdast-util-to-string'


export default async ({
  mdast,
} = {}) => {

  const v = toString(mdast, {

  })
  return v
}
