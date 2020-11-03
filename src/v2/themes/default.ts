import tinycolor from 'tinycolor2'

export const themeColors = {
  primary: '#0c469c',
  secondary: '#1C4F79',
  warning: '#a31037',
  success: '#34A87B',
  info: '#4A62D9',
  error: '#D20000'
}

const lightenRate = 7.5
const darkenRate = 15

export default {
  palette: {
    primary: {
      main: themeColors.primary,
      light: tinycolor(themeColors.primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(themeColors.primary).darken(darkenRate).toHexString()
    },
    secondary: {
      main: themeColors.secondary,
      light: tinycolor(themeColors.secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(themeColors.secondary).darken(darkenRate).toHexString(),
      contrastText: '#FFFFFF'
    },
    warning: {
      main: themeColors.warning,
      light: tinycolor(themeColors.warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(themeColors.warning).darken(darkenRate).toHexString()
    },
    error: {
      main: themeColors.error
    },
    success: {
      main: themeColors.success,
      light: tinycolor(themeColors.success).lighten(lightenRate).toHexString(),
      dark: tinycolor(themeColors.success).darken(darkenRate).toHexString()
    },
    info: {
      main: themeColors.info,
      light: tinycolor(themeColors.info).lighten(lightenRate).toHexString(),
      dark: tinycolor(themeColors.info).darken(darkenRate).toHexString()
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
          color: themeColors.primary,
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
          color: themeColors.primary,
          textDecoration: 'none'
        }
      }
    }
  }
}
