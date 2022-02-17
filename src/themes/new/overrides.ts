import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/new/rte'

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
        paddingRight: 24
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
        WebkitBoxShadow: '0 0 0 100px #1a397c40 inset!important',
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #1a397c40 inset!important',
          WebkitTextFillColor: '#ffffff',
          transition: 'background-color 5000s ease-in-out 0s'
        },
        '&:-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0 100px #ffffff inset',
          WebkitTextFillColor: '#334466',
          transition: 'none'
        },
        '&:-internal-autofill-selected': {
          WebkitBoxShadow: '0 0 0 100px #1a397c40 inset!important',
          backgroundColor: '#1a397c40!important'
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
          backgroundColor: '#1a397c40'
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
        backgroundColor: '#0055FF',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#4080ff!important'
        },
        '&.Mui-disabled': {
          backgroundColor: '#0055FF20'
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
        fill: '#102756',
        borderRadius: 4,
        backgroundColor: 'transparent',
        '.Mui-checked &': {
          fill: '#0055FF'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {}
  },
  MuiBreadcrumbs: {
    defaultProps: {
      separator: ''
    },
    styleOverrides: {
      root: {},
      li: {
        '> a': {
          color: '#3B4251',
          fontWeight: 500,
          textDecoration: 'none'
        },
        '> p': {
          color: '#778194',
          fontWeight: 500
        }
      },
      separator: {
        color: 'transparent',
        width: 4,
        height: 4,
        backgroundColor: '#778194',
        borderRadius: 2
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
        '&.MuiPaper-outlined': {
          boxShadow: '0px 80px 80px rgba(162, 172, 191, 0.16)',
          border: '1px solid #EDF2FA'
        }
      }
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
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        '& .MuiSlider-rail': {
          background: '#DBE2EC',
          opacity: 1,
          height: '2px'
        },
        '& .MuiSlider-track': {
          height: '2px',
          border: 'none'
        },
        '& .MuiSlider-thumb': {
          border: '2px solid #FFFFFF',
          '&:before': {
            boxShadow: 'none'
          },
          '&.Mui-focusVisible, &:hover': {
            boxShadow: '0px 16px 16px rgba(76, 136, 255, 0.2)'
          },
          '&.Mui-disabled': {
            background: '#DBE2EC'
          }
        },
        '&.Mui-disabled .MuiSlider-markLabel': {
          color: '#DBE2EC'
        },
        '& .MuiSlider-thumbSizeMedium': {
          width: '24px',
          height: '24px'
        },
        '& .MuiSlider-thumbSizeSmall': {
          width: '16px',
          height: '16px'
        },
        '& .MuiSlider-mark': {
          width: '5px',
          height: '5px',
          borderRadius: '100%',
          background: '#DBE2EC',
          '&.MuiSlider-markActive': {
            background: '#4C88FF'
          }
        }
      }
    }
  }
})
