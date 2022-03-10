import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/new/rte'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    alternate: true
  }
}

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
      root: {
        height: 'auto',
        fontSize: 14,
        borderRadius: 8,
        padding: '12px 30px',
        fontWeight: 500,
        textTransform: 'none',
        svg: {
          backgroundColor: 'transparent',
          fill: '#4C88FF'
        },
        '&.MuiButton-sizeLarge': {
          padding: '16px 40px'
        },
        '&.MuiButton-sizeSmall': {
          padding: '7px 34px',
          fontSize: 12
        },
        ':disabled': {
          color: '#778194',
          svg: {
            fill: '#778194'
          }
        },
        ':hover': {
          backgroundColor: '#78A5FF',
          color: '#FFFFFF',
          svg: {
            fill: '#FFF'
          }
        }
      },
      contained: {
        backgroundColor: '#4C88FF',
        ':disabled': {
          backgroundColor: '#EDF2FA'
        },
        svg: {
          backgroundColor: 'transparent',
          fill: '#FFFFFF'
        }
      },
      outlined: {
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(76, 136, 255, 0.3)',
        color: '#4C88FF',
        ':disabled': {
          backgroundColor: '#F0F2F7',
          border: '1px solid #F0F2F7'
        }
      },
      text: {
        ':hover': {
          backgroundColor: '#EDF2FA',
          color: '#4C88FF',
          svg: {
            fill: '#4C88FF'
          }
        },
        ':disabled': {
          color: '#89A1CE',
          svg: {
            fill: '#89A1CE'
          }
        }
      }
    },
    variants: [
      {
        props: { variant: 'alternate' },
        style: {
          border: '1px solid rgba(76, 136, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#778194',
          ':disabled': {
            backgroundColor: '#EDF2FA',
            border: '1px solid #EDF2FA'
          }
        }
      }
    ]
  },
  MuiButtonGroup: {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: 'rgba(76, 136, 255, 0.3)',
          ':hover': {
            backgroundColor: '#EDF2FA',
            color: '#4C88FF',
            borderColor: 'rgba(76, 136, 255, 0.3)'
          }
        }
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        height: 'auto',
        svg: { fill: '#778194', width: 14, height: 14 },
        ':hover': {
          backgroundColor: '#EDF2FA',
          svg: { fill: '#4C88FF' }
        },
        ':disabled': {
          svg: {
            fill: '#DBE2EC'
          }
        },
        '&.MuiIconButton-sizeLarge': {
          svg: {
            width: 18,
            height: 18
          }
        },
        '&.MuiIconButton-sizeSmall': {
          svg: {
            width: 12,
            height: 12
          }
        }
      }
    }
  },
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
        backgroundColor: theme.palette.background.paper,
        backgroundImage: 'none',
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
      },
      root: {
        ':hover': {
          backgroundColor: '#4C88FF',
          color: '#FFFFFF',
          cursor: 'pointer'
        }
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
  },
  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        svg: {
          fill: '#778194'
        },
        ':hover': {
          backgroundColor: '#78A5FF',
          svg: {
            fill: '#FFFFFF'
          },
          boxShadow: 'none'
        },
        ':disabled': {
          backgroundColor: '#EDF2FA',
          svg: {
            fill: '#DBE2EC'
          }
        }
      }
    }
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        '.MuiMenu-paper': {
          marginTop: 8,
          padding: 20,
          border: '1px solid #DBE2EC',
          boxShadow: '0px 80px 80px rgba(162, 172, 191, 0.16)',
          borderRadius: 8
        },
        ul: {}
      }
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: 'initial',
          '&:hover': {
            backgroundColor: 'initial'
          }
        },
        '&:hover': {
          background: 'initial'
        }
      }
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 40,
        height: 32,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          '&.MuiButtonBase-root': {
            width: 40,
            height: 32,
            '&:hover': {
              backgroundColor: 'inherit',
              content: '""'
            },

            '& + .MuiSwitch-track': {
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.text.secondary
                  : '#89A1CE',
              width: 24,
              height: 16,
              borderRadius: 100,
              opacity: 1,
              position: 'absolute',
              top: 8,
              left: 10
            },

            '&.Mui-checked': {
              transform: 'translateX(8px)',
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.background.paper
                  : theme.palette.background.default,
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor:
                  theme.palette.mode === 'light' ? '#D3D9E5' : '#1D3667'
              }
            },
            '& .MuiSwitch-thumb': {
              width: 12,
              height: 12,
              background: '#ffffff',
              position: 'absolute',
              top: 10,
              left: 12,
              boxShadow: 'none'
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              background: theme.palette.background.default
            }
          }
        }
      }
    }
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit'
          },

          '& .MuiSvgIcon-root': {
            background: theme.palette.background.paper,
            fill: theme.palette.background.paper,
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? theme.palette.secondary.main
                : theme.palette.primary.main
            }`,
            boxSizing: 'border-box',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 4px 4px rgba(162, 172, 191, 0.08)'
                : 'none',
            borderRadius: 10
          },

          '&.Mui-checked .MuiSvgIcon-root': {
            background: '#4C88FF',
            borderRadius: 10,
            border: 'none',
            fill: '#ffffff'
          },
          '&.Mui-disabled .MuiSvgIcon-root': {
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? theme.palette.secondary.main
                : '#89A1CE'
            }`,
            boxSizing: 'border-box',
            borderRadius: 10
          },
          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
              background: '#4C88FF',
              borderRadius: 10
            },
            '&.Mui-disabled .MuiSvgIcon-root': {
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.divider
                  : '#1D3667',
              fill: theme.palette.background.default,
              border: 'none'
            }
          }
        }
      }
    }
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          height: 'auto',
          background: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit'
          },

          '& .MuiSvgIcon-root': {
            fill: theme.palette.background.paper,
            background: theme.palette.background.paper,
            border: '1px solid #78A5FF',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)',
            borderRadius: 2
          },

          '&.Mui-checked .MuiSvgIcon-root': {
            border: 'none'
          },
          '&.Mui-disabled .MuiSvgIcon-root': {
            border: `1px solid ${
              theme.palette.mode === 'light' ? theme.palette.divider : '#89A1CE'
            }`,
            background: theme.palette.background.paper,
            fill: theme.palette.background.paper
          }
        }
      }
    }
  }
})
