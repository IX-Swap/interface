import { Theme } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/old/rte'
import tinycolor from 'tinycolor2'

// interface LabOverrides {
//   MuiSkeleton: {
//     root: CSSProperties
//   }
// }

export const getThemeOverrides = (
  theme: Theme
): ThemeOptions['components'] => ({
  ...rte(theme),
  MuiCssBaseline: {
    styleOverrides: {
      '@global': {
        html: {
          background: theme.palette?.backgrounds.default
        }
      }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 10
      },
      paperWidthMd: {
        maxWidth: 800
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        paddingLeft: 40,
        paddingRight: 40
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        paddingBottom: 40
      }
    }
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          color: theme.palette?.sidebar.activeColor,
          backgroundColor: theme.palette?.sidebar.activeBackground
        }
      }
    }
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: 6
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8
      }
    }
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 32,
        '&:last-child': {
          paddingBottom: 32
        }
      }
    }
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 32
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
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
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-child:not(.MuiTableRow-head)': {
          borderBottom: 'none'
        }
      }
    }
  },
  MuiLink: {
    styleOverrides: {
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
    }
  },
  MuiGrid: {
    styleOverrides: {
      item: {
        maxWidth: '100%'
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        background: theme.palette?.backgrounds.default,
        [theme.breakpoints.up('lg')]: {
          maxWidth: 1280
        }
      }
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        minHeight: 38
      },
      input: {
        height: 22
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      // formControl: {
      //   transform: 'translate(0, 29px) scale(1)'
      // },
      outlined: {
        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 11px) scale(1)'
        }
      }
      // shrink: {
      //   paddingRight: 5,
      //   paddingLeft: 5,
      //   backgroundColor: theme.palette?.backgrounds.default
      // }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        minHeight: 40,
        height: 40
      },
      input: {
        paddingTop: 0,
        paddingBottom: 0,
        height: '100%'
      },
      inputSizeSmall: {
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
    }
  },
  MuiSelect: {
    styleOverrides: {
      outlined: {
        root: {
          height: 38
        },
        selectMenu: {
          paddingTop: 11,
          paddingBottom: 11
        }
      }
    }
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: 'transparent'
      }
    }
  },
  MuiStepConnector: {
    styleOverrides: {
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
    }
  },
  MuiStepContent: {
    styleOverrides: {
      root: {
        borderLeftStyle: 'dashed',
        color:
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : grey[600]
      }
    }
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: '#DDDDDD',
        '&.Mui-completed': {
          color: green[400]
        },
        '&.Mui-active': {
          color: tinycolor(theme.palette.primary.main).toHex8String(),
          '& .MuiStepIcon-text': {
            fill: '#ffffff'
          }
        }
      },
      text: {
        fill: theme.palette.getContrastText(theme.palette.primary.main)
      }
    }
  },
  MuiSvgIcon: {
    styleOverrides: {
      colorDisabled: {
        fill: '#DADADA'
      }
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        height: 40,
        color: 'inherit',
        borderColor: 'rgba(0, 0, 0, 0.23)',

        '&.Mui-selected': {
          boxShadow: 'inset 0 2px 5px 0 rgba(54, 54, 54, 0.2)',
          backgroundColor: 'transparent'
        }
      }
    }
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        minHeight: 38
      }
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        padding: '0 14px'
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        paddingTop: 18,
        paddingBottom: 18,
        textTransform: 'none',
        fontSize: 16,
        fontWeight: 500
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      flexContainer: {
        display: 'inline-flex',
        width: '100%',
        borderBottom: `1px solid ${theme.palette.divider}`
      },
      indicator: {
        height: 5
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: tinycolor(theme.palette.backgrounds.light)
          .darken(4)
          .toHex8String()
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: tinycolor(theme.palette.backgrounds.light)
          .darken(3)
          .toHex8String(),
        color: theme.palette.text.primary
      }
    }
  },
  MuiSlider: {
    styleOverrides: {
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
    }
  },
  MuiTypography: {
    styleOverrides: {
      h6: {
        textTransform: 'capitalize'
      }
    }
  }
})
