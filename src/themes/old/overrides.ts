import { Theme } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { Overrides } from '@material-ui/core/styles/overrides'
import { rte } from 'themes/old/rte'
import tinycolor from 'tinycolor2'
import { CSSProperties } from 'react'

interface LabOverrides {
  MuiSkeleton: {
    root: CSSProperties
  }
}

export const getThemeOverrides = (theme: Theme): Overrides & LabOverrides => ({
  ...rte(theme),
  MuiCssBaseline: {
    '@global': {
      html: {
        background: theme.palette?.backgrounds.default
      }
    }
  },
  MuiDialog: {
    paper: {
      borderRadius: 10
    },
    paperWidthMd: {
      maxWidth: 800
    }
  },
  MuiDialogContent: {
    root: {
      paddingLeft: 40,
      paddingRight: 40
    }
  },
  MuiDialogActions: {
    root: {
      paddingBottom: 40
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
  MuiSkeleton: {
    root: {
      borderRadius: 6
    }
  },
  MuiCard: {
    root: {
      borderRadius: 8
    }
  },
  MuiCardContent: {
    root: {
      padding: 32,
      '&:last-child': {
        paddingBottom: 32
      }
    }
  },
  MuiCardActions: {
    root: {
      padding: 32
    }
  },
  MuiTableCell: {
    root: {
      paddingTop: 12,
      paddingBottom: 12,
      borderBottom: 'none'
    },
    head: {
      fontSize: '0.85rem'
    },
    body: {
      fontSize: '0.85rem'
    }
  },
  MuiTableRow: {
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:last-child:not(.MuiTableRow-head)': {
        borderBottom: 'none'
      }
    }
  },
  MuiLink: {
    root: {
      fontWeight: 400,
      color: theme.palette.primary.light,
      '&.MuiLink-underlineHover:active, &.MuiLink-underlineHover:visited, &.MuiLink-underlineAlways:active, &.MuiLink-underlineAlways:visited':
        {
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
      backgroundColor: theme.palette?.backgrounds.default
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
      paddingRight: 8
    },
    multiline: {
      height: 'auto',
      minHeight: 74
    },
    inputMultiline: {
      minHeight: 38
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
      paddingRight: 0,
      backgroundColor: 'transparent'
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
      borderTop: 'none',
      borderLeftStyle: 'dashed'
    }
  },
  MuiStepContent: {
    root: {
      borderLeftStyle: 'dashed',
      color:
        theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.6)' : grey[600]
    }
  },
  MuiStepIcon: {
    root: {
      color: '#DDDDDD',
      '&$completed': {
        color: green[400]
      },
      '&$active': {
        color: tinycolor(theme.palette.primary.main).toHex8String(),
        '& .MuiStepIcon-text': {
          fill: '#ffffff'
        }
      }
    },
    text: {
      fill: '#444444'
    }
  },
  MuiSvgIcon: {
    colorDisabled: {
      fill: '#DADADA'
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
      minHeight: 38
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
      width: '100%',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    indicator: {
      height: 5
    }
  },
  MuiChip: {
    root: {
      backgroundColor: tinycolor(theme.palette.backgrounds.light)
        .darken(4)
        .toHex8String()
    }
  },
  MuiAvatar: {
    colorDefault: {
      backgroundColor: tinycolor(theme.palette.backgrounds.light)
        .darken(3)
        .toHex8String(),
      color: theme.palette.text.primary
    }
  },
  MuiSlider: {
    root: {
      padding: '18px 0'
    },
    rail: {
      height: 5,
      borderRadius: 5
    },
    track: {
      height: 5,
      borderRadius: 5
    },
    thumb: {
      height: 14,
      width: 14,
      '&.Mui-disabled': {
        marginTop: -2
      }
    }
  },
  MuiTypography: {
    h6: {
      textTransform: 'capitalize'
    }
  }
})
