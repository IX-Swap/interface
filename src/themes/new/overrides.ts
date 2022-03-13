import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/new/rte'
import { slider } from 'themes/new/overrides/slider'

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
  MuiSlider: slider(theme),
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
      // TODO Needs to update after discussion with designer
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
        '& .MuiSwitch-switchBase': {
          '&.MuiButtonBase-root': {
            padding: 2,
            width: '24px',
            height: '16px',
            '&:hover': {
              backgroundColor: 'inherit',
              content: '""'
            },

            '& + .MuiSwitch-track': {
              background: '#778194',
              width: '24px',
              height: '16px',
              borderRadius: '100px',
              opacity: 1,
              position: 'absolute',
              top: 0,
              left: 0
            },
            '& + .MuiTouchRipple-root': {
              width: '24px',
              height: '16px',
              borderRadius: '100px',
              opacity: 1,
              position: 'absolute',
              top: 0,
              left: 0
            },

            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#4C88FF',
                opacity: 1,
                border: 0
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: '#D3D9E5'
              }
            },

            '& .MuiSwitch-thumb': {
              width: '12px',
              height: '12px',
              background: '#FFFFFF',
              position: 'absolute',
              top: '12%',
              left: '10%'
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#33cf4d',
              border: '6px solid #fff'
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[600]
            },
            '&.Mui-checked .MuiSwitch-thumb': {
              color: 'red',
              position: 'absolute',
              top: '12%',
              left: '-30%'
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
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
          background: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit'
          },

          '& .MuiSvgIcon-root': {
            background: '#FFFFFF',
            fill: '#FFFFFF',
            border: '1px solid #78A5FF',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)',
            borderRadius: '10px'
          },

          '&.Mui-checked .MuiSvgIcon-root': {
            background: '#4C88FF',
            borderRadius: '10px',
            border: 'none'
          },
          '&.Mui-disabled .MuiSvgIcon-root': {
            border: '1px solid',
            boxSizing: 'border-box',
            borderRadius: '10px'
          },
          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
              background: '#4C88FF',
              borderRadius: '10px'
            },
            '&.Mui-disabled .MuiSvgIcon-root': {
              background: '#DBE2EC',
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
          background: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit'
          },

          '& .MuiSvgIcon-root': {
            fill: '#FFFFFF',
            background: '#FFFFFF',
            border: '1px solid #78A5FF',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 4px rgba(162, 172, 191, 0.08)',
            borderRadius: '2px'
          },

          '&.Mui-checked .MuiSvgIcon-root': {
            fill: '#4C88FF',
            background: '#4C88FF',
            borderRadius: '2px',
            border: 'none',
            backgroundImage:
              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
              " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
              "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""'
          },
          '&.Mui-disabled .MuiSvgIcon-root': {
            border: '1px solid',
            boxSizing: 'border-box',
            borderRadius: '2px'
          },
          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {},
            '&.Mui-disabled .MuiSvgIcon-root': {
              background: '#EDF2FA',
              fill: '#EDF2FA',
              fillOpacity: 2,
              border: '1px solid rgba(76, 136, 255, 0.3)',
              boxSizing: 'border-box',
              backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23778194'/%3E%3C/svg%3E\")",
              content: '""'
            }
          }
        }
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 1
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        '&.Mui-selected': {
          color: theme.palette.text.primary
        }
      }
    }
  }
})
