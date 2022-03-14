import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { rte } from 'themes/new/rte'
import { checkbox } from 'themes/new/overrides/checkbox'
import { radio } from 'themes/new/overrides/radio'
import { switcher } from 'themes/new/overrides/switcher'
import { breadcrumbs } from 'themes/new/overrides/breadcrumbs'
import { avatar } from 'themes/new/overrides/avatar'
import { paper } from 'themes/new/overrides/paper'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    alternate: true
  }
}

export const getThemeOverrides = (
  theme: Theme
): ThemeOptions['components'] => ({
  ...rte(theme),
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
        backgroundColor: 'transparent',
        '.Mui-checked &': {
          fill: '#0055FF'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary
      }
    }
  },
  MuiBreadcrumbs: breadcrumbs(theme),
  MuiPaper: paper(theme),
  MuiAvatar: avatar(theme),
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
        }
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
  MuiSwitch: switcher(theme),
  MuiRadio: radio(theme),
  MuiCheckbox: checkbox(theme)
})
