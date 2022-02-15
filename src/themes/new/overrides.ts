import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/new/rte'

// interface LabOverrides {
//   MuiSkeleton: {
//     root: CSSProperties
//   }
//   MUIRichTextEditor: {
//     root: any
//     container: any
//     editor: any
//     toolbar: any
//     placeHolder: any
//   }
//   PrivateSwitchBase: {
//     root: any
//     checked: any
//   }
// }

export const getThemeOverrides = (
  theme: Theme
): ThemeOptions['components'] => ({
  ...rte(theme),
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        '&.Mui-error': {
          color: '#FF8080',
          textAlign: 'right',
          paddingTop: 6
        }
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        transform: 'translate(0, -11px) !important',
        transformOrigin: 'top left',
        fontSize: 16,

        '&.Mui-focused': {
          color: '#ffffff'
        },
        '&.Mui-error': {
          color: '#ffffff'
        }
      }
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        minHeight: 38,
        backgroundColor: '#1a397c40',
        borderRadius: 8,
        '&.Mui-focused': {
          backgroundColor: '#ffffff'
        },
        '&.Mui-error': {
          paddingRight: 20,
          border: '2px solid #FF8080'
        }
      },
      input: {},
      underline: {
        '&::after': {
          content: 'none'
        },
        '&::before': {
          content: 'none'
        }
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        padding: 0,
        minHeight: 60,
        height: 60
      },
      input: {
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%',
        boxShadow: 'none',
        borderRadius: 8,
        boxSizing: 'border-box',
        color: '#ffffff',
        fontSize: 16,
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #1a397c inset',
          WebkitTextFillColor: '#ffffff',
          transition: 'background-color 5000s ease-in-out 0s'
        },
        '&:-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0 100px #ffffff inset',
          WebkitTextFillColor: '#334466',
          transition: 'none'
        },
        '.Mui-focused &': {
          backgroundColor: '#ffffff',
          color: '#000000',
          border: 'none'
        }
      },
      // inputMarginDense: {
      //   paddingTop: 12,
      //   paddingBottom: 12
      // },
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
  MuiButtonBase: {
    styleOverrides: {
      root: {
        height: 60
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      // label: {
      //   fontSize: 12
      // },
      contained: {
        borderRadius: 8,
        '&:hover': {
          backgroundColor: '#4080ff!important'
        },
        '&.Mui-disabled': {
          backgroundColor: '#0055FF20'
        }
      }
    }
  },
  MuiIconButton: {
    // label: {
    //   width: 20,
    //   height: 20,
    //   color: '#0055FF',
    //   background: '#102756',
    //   borderRadius: 4,
    //   zIndex: 3,
    //   border: '1px solid #102756',
    //
    //   '.Mui-checked &': {
    //     color: '#ffffff',
    //     background: '#0055FF',
    //     border: '2px solid #0055FF'
    //   },
    //   '.Mui-error &': {
    //     border: '2px solid #FF8080'
    //   }
    // }
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fill: '#102756',
        '.Mui-checked &': {
          fill: '#0055FF'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      // colorError: {
      //   '& span': {
      //     color: '#FF8080'
      //   }
      // }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: 'rgba(76, 136, 255, 0.1);',
        color: '#4C88FF',
        border: '1px solid #4C88FF'
      }
    }
  }
})
