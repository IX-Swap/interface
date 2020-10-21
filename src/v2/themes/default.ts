import tinycolor from 'tinycolor2'

const primary = '#0c469c'
// const secondary = '#DD0F0F'
const secondary = '#1C4F79'
const warning = '#a31037'
const success = '#348633'
const info = '#9013FE'
const error = '#D20000'

const lightenRate = 7.5
const darkenRate = 15

export default {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString()
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString()
    },
    error: {
      main: error
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString()
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString()
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6E6E6E',
      hint: '#B9B9B9'
    },
    background: {
      default: '#F6F7FF',
      light: '#F3F5FF'
    }
  },
  customShadows: {
    widget:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetDark:
      '0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    widgetWide:
      '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: '#4A4A4A1A'
      }
    },
    MuiMenu: {
      paper: {
        boxShadow:
          '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
      }
    },
    MuiSelect: {
      icon: {
        color: '#B9B9B9'
      }
    },
    MuiListItem: {
      root: {
        '&$selected': {
          color: primary,
          backgroundColor: '#e7ecf5 !important',
          '&:focus': {
            backgroundColor: '#F3F5FF'
          }
        }
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#F3F5FF'
        }
      }
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white'
      }
    },
    MuiTableCell: {
      root: {
        paddingTop: 12,
        paddingBottom: 12
      },
      head: {
        fontSize: '0.85rem'
      },
      body: {
        fontSize: '0.85rem'
      }
    },
    MuiLink: {
      root: {
        fontWeight: 400,
        '&.MuiLink-underlineHover:active, &.MuiLink-underlineHover:visited, &.MuiLink-underlineAlways:active, &.MuiLink-underlineAlways:visited': {
          color: primary,
          textDecoration: 'none'
        }
      }
    }
  }
}
