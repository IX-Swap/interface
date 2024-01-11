import { generateImgSrc } from 'helpers/generateImgSrc'

describe('generateImgSrc', () => {
  it('returns a correct url', () => {
    expect(generateImgSrc('http://www.myimage.com/png.jpeg')).toEqual(
      'http://www.myimage.com/png.jpeg'
    )
    expect(
      generateImgSrc(
        'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
      )
    ).toEqual('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
    expect(generateImgSrc('/path-to-image')).toEqual(
      `${process.env.IXSP_REACT_APP_API_URL ?? ''}/path-to-image`
    )
  })
})
