import { ThemeOptions } from '@material-ui/core'
import { Overrides } from '@material-ui/core/styles/overrides'
import { themeColors } from 'themes/light'

export const getThemeOverrides = (theme: ThemeOptions): Overrides => ({
  MuiPaper: {
    root: {
      backgroundColor: theme.palette?.backgrounds.main
    }
  },
  MuiBackdrop: {
    root: {
      backgroundColor: '#4A4A4A1A'
    }
  },
  MuiDialog: {
    paper: {
      borderRadius: 0
    }
  },
  MuiMenu: {
    paper: {
      boxShadow:
        '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A'
    }
  },
  MuiListItem: {
    root: {
      '&$selected': {
        color: themeColors.primary,
        backgroundColor: '#e7ecf5 !important'
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
  },
  MuiGrid: {
    item: {
      maxWidth: '100%'
    }
  },
  MuiContainer: {
    root: {
      background: theme.palette?.backgrounds.main
    }
  },
  MuiInput: {
    root: {
      minHeight: 38
    },
    input: {
      height: 22
    }
  },
  MuiInputLabel: {
    formControl: {
      transform: 'translate(0, 29px) scale(1)'
    }
  },
  MuiOutlinedInput: {
    root: {
      padding: 0,
      minHeight: 40
    },
    inputMarginDense: {
      paddingTop: 12,
      paddingBottom: 12
    }
  },
  MuiSelect: {
    icon: {
      color: '#B9B9B9'
    },
    root: {
      height: 38
    },
    selectMenu: {
      paddingTop: 11,
      paddingBottom: 11
    }
  },
  MuiToggleButton: {
    root: {
      height: 40,
      color: 'inherit',
      borderColor: 'rgba(0, 0, 0, 0.23)',

      '&.Mui-selected': {
        boxShadow: 'inset 0 2px 5px 0 rgba(54, 54, 54, 0.2)',
        backgroundColor: 'transparent'
      }
    },
    label: {
      textTransform: 'none'
    }
  }
})
