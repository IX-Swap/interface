import { Theme } from '@mui/material'
import { rte } from 'themes/new/rte'
import { checkbox } from 'themes/new/overrides/checkbox'
import { radio } from 'themes/new/overrides/radio'
import { switcher } from 'themes/new/overrides/switcher'
import { slider } from 'themes/new/overrides/slider'
import { breadcrumbs } from 'themes/new/overrides/breadcrumbs'
import { avatar } from 'themes/new/overrides/avatar'
import { paper } from 'themes/new/overrides/paper'
import { iconButton } from 'themes/new/overrides/iconButton'
import { buttonGroup } from 'themes/new/overrides/buttonGroup'
import { button } from 'themes/new/overrides/button'
import { svgIcon } from 'themes/new/overrides/sgvIcon'
import { typography } from 'themes/new/overrides/typography'
import { fab } from 'themes/new/overrides/fab'
import { menu } from 'themes/new/overrides/menu'
import { menuItem } from 'themes/new/overrides/menuItem'
import { chip } from 'themes/new/overrides/chip'
import { skeleton } from 'themes/new/overrides/skeleton'
import { inputBase } from 'themes/new/overrides/inputBase'
import { step } from 'themes/new/overrides/step'
import { stepLabel } from 'themes/new/overrides/stepLabel'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    alternate: true
  }
}

export const getThemeOverrides = (
  theme: Theme
): {
  MuiButtonGroup: {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: string
          backgroundColor: any
          ':hover': { backgroundColor: any; color: any }
        }
      }
    }
  }
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: string
        ':disabled': { backgroundColor: any; svg: { fill: any } }
        backgroundColor: any
        ':hover': {
          boxShadow: string
          backgroundColor: string
          svg: { fill: string }
        }
        svg: { fill: any }
      }
    }
  }
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          backgroundColor: string
          '& .MuiTablePagination-select': {
            backgroundColor: string
            borderRadius: number
          }
        }
      }
    }
  }
  MuiBreadcrumbs: {
    defaultProps: { separator: string }
    styleOverrides: {
      root: {}
      li: {
        '&:hover': { '> a': { color: string; textDecoration: string } }
        '> p': { color: any; fontWeight: number }
        '> a': { color: any; textDecoration: string; fontWeight: number }
      }
      separator: {
        backgroundColor: any
        color: string
        borderRadius: number
        width: number
        height: number
      }
    }
  }
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: string
        '& .MuiChip-deleteIcon': { '& rect': { fill: any } }
        background: any
        width: string
        '&.Mui-disabled': { opacity: number }
        '& .MuiChip-label': {
          fontFamily: string
          color: any
          width: string
          letterSpacing: string
          fontSize: string
          lineHeight: string
          fontStyle: string
          opacity: any
          fontWeight: string
          height: string
        }
        '&:hover': {
          borderRadius: string
          '& .MuiChip-deleteIcon': { '& rect': { fill: string } }
          background: any
        }
        height: string
      }
    }
  }
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          background: string
          '&.Mui-disabled': { '& .MuiSvgIcon-root': { opacity: any } }
          '&:hover': {
            '& .MuiSvgIcon-root': { border: string; boxShadow: string }
          }
          '& .MuiSvgIcon-root': {
            border: string
            borderRadius: number
            background: any
            width: number
            boxSizing: string
            fill: any
            height: number
          }
          '&.Mui-checked': { '&:hover': { '& svg': { opacity: number } } }
          height: string
        }
      }
    }
  }
  MuiButton: {
    variants: Array<{
      style: {
        border: string
        backgroundColor: any
        alignItems: string
        color: any
        ':hover': {
          border: string
          backgroundColor: any
          color: any
          svg: { fill: any }
        }
        display: string
        justifyContent: string
      }
      props: any
    }>
    styleOverrides: {
      contained: {
        backgroundColor: string
        svg: { backgroundColor: string; fill: string }
      }
      outlined: {
        border: string
        backgroundColor: any
        color: string
        '&:hover': { border: string }
      }
      root: {
        padding: string
        '&.MuiButton-sizeSmall': { padding: string; fontSize: number }
        ':disabled': {
          border: string
          backgroundColor: any
          color: any
          svg: { fill: any }
        }
        borderRadius: number
        ':hover': {
          backgroundColor: string
          color: string
          svg: { fill: string }
        }
        svg: { backgroundColor: string; fill: string }
        '&.MuiButton-sizeLarge': { padding: string }
        fontSize: number
        fontWeight: number
        height: string
        textTransform: any
      }
      text: {
        ':disabled': { color: any; svg: { fill: any } }
        ':hover': { backgroundColor: any; color: string; svg: { fill: string } }
      }
    }
  }
  MuiIconButton: {
    styleOverrides: {
      root: {
        ':disabled': { svg: { fill: any } }
        ':hover': { backgroundColor: any; svg: { fill: string } }
        svg: { width: number; fill: any; height: number }
        '&.MuiIconButton-sizeSmall': { svg: { width: number; height: number } }
        height: string
        '&.MuiIconButton-sizeLarge': { svg: { width: number; height: number } }
      }
    }
  }
  MuiRadio: {
    styleOverrides: {
      root: {
        '&.MuiButtonBase-root': {
          background: string
          '&.Mui-disabled': { '& .MuiSvgIcon-root': { opacity: any } }
          '&:hover': {
            '& .MuiSvgIcon-root': { border: string; boxShadow: string }
          }
          '& .MuiSvgIcon-root': {
            border: string
            borderRadius: number
            background: any
            width: number
            boxSizing: string
            fill: any
            height: number
          }
          '&.Mui-checked': { '&:hover': { '& svg': { opacity: number } } }
          height: string
        }
      }
    }
  }
  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: string
        background: any
        '&.MuiSkeleton-text': {}
        '&.MuiSkeleton-circular': { borderRadius: string }
      }
    }
  }
  MuiSlider: {
    styleOverrides: {
      root: {
        '& .MuiSlider-thumbSizeSmall': { width: number; height: number }
        '& .MuiSlider-markLabel': { color: any }
        '& .MuiSlider-rail': {
          background: any
          opacity: number
          height: number
        }
        '& .MuiSlider-thumb': {
          border: string
          '&:before': { boxShadow: string }
          '&.Mui-disabled': { background: any }
          '&.Mui-focusVisible, &:hover': { boxShadow: string }
        }
        '& .MuiSlider-thumbSizeMedium': { width: number; height: number }
        '& .MuiSlider-mark': {
          borderRadius: string
          background: any
          width: number
          '&.MuiSlider-markActive': { background: any }
          height: number
        }
        '& .MuiSlider-track': { border: string; height: number }
        '&.Mui-disabled .MuiSlider-markLabel': { color: any }
      }
    }
  }
  MUIRichTextEditor: {
    container: { flexDirection: string; display: string; height: string }
    toolbar: { borderBottom: string }
    editor: {
      padding: string
      backgroundColor: any
      overflow: string
      height: string
    }
    root: {
      minHeight: string
      backgroundColor: any
      overflow: string
      borderRadius: number
      height: string
    }
    placeHolder: {
      bottom: string
      width: string
      position: string
      paddingLeft: number
      height: string
    }
  }
  MuiMenu: {
    styleOverrides: {
      root: {
        '.MuiMenu-paper': {
          border: string
          padding: number
          boxShadow: string
          borderRadius: number
          marginTop: number
        }
      }
    }
  }
  MuiSvgIcon: {
    styleOverrides: {
      root: { '.Mui-checked &': { fill: string }; backgroundColor: string }
    }
  }
  MuiTypography: { styleOverrides: { root: { color: any } } }
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: string
          '&:hover': { backgroundColor: string }
        }
        '&:hover': { background: string }
      }
    }
  }
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: number
        width: number
        '& .MuiSwitch-switchBase': {
          '&.MuiButtonBase-root': {
            '& + .MuiSwitch-track': {
              borderRadius: number
              top: number
              left: number
              background: any
              width: number
              position: string
              opacity: number
              height: number
            }
            '&.Mui-disabled .MuiSwitch-thumb': { background: any }
            width: number
            '&.Mui-disabled + .MuiSwitch-track': {
              backgroundColor: any
              opacity: number
            }
            '&:hover': {
              backgroundColor: string
              '& + .MuiSwitch-track': { opacity: number }
            }
            '& .MuiSwitch-thumb': {
              boxShadow: string
              top: number
              left: number
              background: any
              width: number
              position: string
              height: number
            }
            '&.Mui-checked': {
              transform: string
              '& + .MuiSwitch-track': {
                border: number
                backgroundColor: any
                opacity: number
              }
              '&.Mui-disabled + .MuiSwitch-track': {
                backgroundColor: any
                opacity: number
              }
              '&:hover': { '& + .MuiSwitch-track': { opacity: number } }
            }
            height: number
          }
        }
        height: number
      }
    }
  }
  MuiStep: {
    styleOverrides: {
      horizontal: {
        '& .MuiStepLabel-label': {
          paddingBottom: any
          paddingRight: any
          paddingLeft: any
          '&.Mui-active': { borderBottom: string }
        }
      }
      root: { padding: number; flex: string }
      vertical: {
        '& .MuiStepButton-root': { paddingRight: number; paddingLeft: number }
        '& .MuiStepLabel-label': {
          padding: any
          position: string
          '&.Mui-active': {
            '&::before': {
              top: number
              left: number
              background: string
              width: number
              position: string
              content: string
              height: string
            }
          }
        }
      }
    }
  }
  MuiStepLabel: {
    styleOverrides: {
      iconContainer: { paddingRight: number }
      vertical: {
        padding: number
        maxHeight: number
        flexDirection: string
        width: string
        justifyContent: string
      }
      label: { '&.Mui-error': { color: string }; fontSize: number }
    }
  }
  MuiPaper: {
    defaultProps: { elevation: number }
    styleOverrides: {
      outlined: { border: string; boxShadow: string }
      root: { border: string; backgroundColor: any; backgroundImage: string }
    }
  }
  MuiAvatar: {
    styleOverrides: {
      root: {
        ':hover': { cursor: string; backgroundColor: string; color: string }
      }
      colorDefault: { border: string; backgroundColor: string; color: string }
    }
  }
} => ({
  ...rte(theme),
  MuiButton: button(theme),
  MuiButtonGroup: buttonGroup(theme),
  MuiIconButton: iconButton(theme),
  MuiSvgIcon: svgIcon(theme),
  MuiTypography: typography(theme),
  MuiSlider: slider(theme),
  MuiBreadcrumbs: breadcrumbs(theme),
  MuiPaper: paper(theme),
  MuiAvatar: avatar(theme),
  MuiFab: fab(theme),
  MuiMenu: menu(theme),
  MuiMenuItem: menuItem(theme),
  MuiSwitch: switcher(theme),
  MuiRadio: radio(theme),
  MuiCheckbox: checkbox(theme),
  MuiChip: chip(theme),
  MuiSkeleton: skeleton(theme),
  MuiInputBase: inputBase(theme),
  MuiStep: step(theme),
  MuiStepLabel: stepLabel(theme)
})
