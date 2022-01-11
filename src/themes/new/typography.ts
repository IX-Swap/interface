import MonumentExtendedBold from '../../fonts/monument-extended/MonumentExtended-Bold.ttf'
import MonumentGroteskRegular from '../../fonts/monument-grotesk/MonumentGrotesk-Regular.otf'

export const monumentExtendedBold = {
  fontFamily: 'MonumentExtended',
  fontStyle: 'normal',
  fontWeight: '700',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  src: `url(${MonumentExtendedBold})`
}

export const monumentGroteskRegular = {
  fontFamily: 'MonumentGrotesk',
  fontStyle: 'normal',
  fontWeight: '500',
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  src: `url(${MonumentGroteskRegular})`
}

export const typography = {
  fontFamily: ['MonumentExtended', 'MonumentGrotesk'].join(','),
  h1: {
    fontFamily: '"MonumentExtended", Open Sans'
  },
  h2: {
    fontFamily: '"MonumentExtended", Open Sans'
  },
  h3: {
    fontFamily: '"MonumentExtended", Open Sans'
  },
  subtitle1: {
    fontFamily: '"MonumentGrotesk", Open Sans'
  },
  subtitle2: {
    fontFamily: '"MonumentGrotesk", Open Sans'
  }
}
