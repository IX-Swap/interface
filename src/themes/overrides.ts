import { Theme } from '@material-ui/core'
import { Overrides } from '@material-ui/core/styles/overrides'
import { rte } from 'themes/rte'

export const getThemeOverrides = (theme: Theme): Overrides => ({
  ...rte,
  MuiCssBaseline: {
    '@global': {
      html: {
        background: theme.palette?.backgrounds.main
      }
    }
  },
  MuiDialog: {
    paper: {
      borderRadius: 0
    }
  },
  MuiListItem: {
    root: {
      '&$selected': {
        color: theme.palette?.sidebar.activeColor,
        backgroundColor: theme.palette?.sidebar.activeBackground
      }
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
      color: theme.palette.primary.light,
      '&.MuiLink-underlineHover:active, &.MuiLink-underlineHover:visited, &.MuiLink-underlineAlways:active, &.MuiLink-underlineAlways:visited': {
        color: theme.palette.primary.light,
        textDecoration: 'none'
      },

      '&:hover': {
        cursor: 'pointer'
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
      // background: theme.palette?.backgrounds.main
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
      color: 'white'
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
