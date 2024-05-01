import { toHast } from 'mdast-util-to-hast'
import { toHtml } from 'hast-util-to-html'

export default ({
  mdast,
} = {}) => {
  return toHtml(toHast(mdast))
}
