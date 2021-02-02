import { Theme } from '@material-ui/core'
import { grey, green } from '@material-ui/core/colors'
import { Overrides } from '@material-ui/core/styles/overrides'
import { rte } from 'themes/rte'

export const getThemeOverrides = (theme: Theme): Overrides => ({
  ...rte(theme),
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
  MuiCard: {
    root: {
      borderRadius: 8
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
    },
    outlined: {
      transform: 'translate(14px, 13px) scale(1)',
      color: '#AAA'
    },
    shrink: {
      paddingRight: 5,
      paddingLeft: 5,
      backgroundColor: theme.palette?.backgrounds.main
    }
  },
  MuiOutlinedInput: {
    root: {
      padding: 0,
      minHeight: 40,
      height: 40
    },
    input: {
      paddingTop: 0,
      paddingBottom: 0,
      height: '100%'
    },
    inputMarginDense: {
      paddingTop: 12,
      paddingBottom: 12
    },
    adornedEnd: {
      paddingRight: 0
    }
  },
  MuiSelect: {
    root: {
      height: 38
    },
    selectMenu: {
      paddingTop: 11,
      paddingBottom: 11
    }
  },
  MuiStepper: {
    root: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  MuiStepConnector: {
    line: {
      borderTopStyle: 'dashed'
    },
    lineHorizontal: {
      borderTopStyle: 'dashed'
    },
    lineVertical: {
      borderTopStyle: 'dashed'
    }
  },
  MuiStepIcon: {
    root: {
      color: grey[300],
      '&$completed': {
        color: green[400]
      },
      '&$active': {
        color: grey[500]
      }
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
  },
  MuiTextField: {
    root: {
      height: 38
    }
  },
  MuiFormHelperText: {
    root: {
      padding: '0 14px'
    }
  },
  MuiTab: {
    root: {
      paddingTop: 18,
      paddingBottom: 18
    },
    wrapper: {
      textTransform: 'none',
      fontSize: 16,
      fontWeight: 500
    }
  },
  MuiTabs: {
    flexContainer: {
      display: 'inline-flex',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    indicator: {
      height: 5
    }
  }
})
