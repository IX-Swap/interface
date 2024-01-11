export const generateImgSrc = (src: string) => {
  const url = new RegExp('^(?:[a-z]+:)?//', 'i')
  if (url.test(src)) return src

  const relativePath = new RegExp('^/', 'i')
  if (relativePath.test(src))
    return `${process.env.IXSP_REACT_APP_API_URL ?? ''}${src}`

  return src
}
