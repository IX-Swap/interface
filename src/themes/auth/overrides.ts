import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/app/rte'

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
          paddingTop: 6,
          marginRight: 0
        }
      }
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        transform: 'translate(0, -30px) !important',
        transformOrigin: 'top left',
        fontSize: 16,
        color: '#ffffff',
        '&.Mui-disabled': {
          color: '#ffffff'
        },
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
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover': {
          'fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          }
        }
      },
      notchedOutline: {
        borderColor: 'transparent',
        '& span': {
          display: 'none!important'
        },
        '.Mui-error &': {
          paddingRight: 20,
          border: '2px solid #FF8080!important',
          WebkitBoxShadow: 'none'
        }
      },
      input: {
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 24,
        paddingRight: 24,
        '&:-webkit-autofill, &:-webkit-autofill:focus': {
          WebkitBoxShadow: theme.palette.input.boxShadowOutline,
          borderRadius: 4,
          backgroundClip: 'padding-box',
          WebkitTextFillColor: `#ffffff`
        },
        '&, &:disabled, &:hover': {
          '~ fieldset.MuiOutlinedInput-notchedOutline': {
            borderRadius: 3,
            borderColor: 'transparent'
          }
        },
        '&:disabled': {
          WebkitTextFillColor: `#ffffff`
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
        WebkitBoxShadow: theme.palette.input.boxShadowBase,
        '&:-webkit-autofill': {
          WebkitBoxShadow: theme.palette.input.boxShadowBase,
          WebkitTextFillColor: '#ffffff',
          transition: 'background-color 5000s ease-in-out 0s'
        },

        '&:-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0 100px #ffffff inset',
          WebkitTextFillColor: '#334466',
          transition: 'none'
        },
        '&:-internal-autofill-selected': {
          WebkitBoxShadow: theme.palette.input.boxShadowBase,
          backgroundColor: `${theme.palette.input.bgBase ?? ''}!important`
        },
        '.Mui-focused &': {
          backgroundColor: '#ffffff',
          WebkitBoxShadow: 'none!important',
          color: '#000000',
          border: 'none',
          transition: 'none!important'
        },
        '.Mui-error &': {
          WebkitBoxShadow: 'none!important'
        }
      },
      adornedEnd: {
        paddingRight: 8,
        '&.Mui-error': {
          backgroundColor: theme.palette.input.bgBase
        },
        '&.Mui-focused': {
          backgroundColor: '#ffffff',
          WebkitBoxShadow: 'none!important'
        }
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
      contained: {
        fontSize: 14,
        borderRadius: 8,
        backgroundColor: theme.palette.button.bgContained,
        color: '#ffffff',
        '&:hover': {
          backgroundColor: theme.palette.button.bgContainedHover
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.button.bgContainedDisabled
        }
      }
    }
  },
  MuiIconButton: {},
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        width: 20,
        height: 20,
        // fill: '#102756',
        fill: theme.palette.backgrounds.default,
        borderRadius: 4,
        // backgroundColor: '#102756',
        backgroundColor: theme.palette.backgrounds.default,
        '.Mui-checked &': {
          fill: '#0055FF'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: '#ffffff'
      }
    }
  }
})