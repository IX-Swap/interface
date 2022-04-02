import { Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
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

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    alternate: true
  }
}

export const getThemeOverrides = (
  theme: Theme
): ThemeOptions['components'] => ({
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
  MuiStep: {
    styleOverrides: {
      root: {
        flex: 'initial',
        padding: 0
      },
      horizontal: {
        '& .MuiStepLabel-label': {
          paddingLeft: 22,
          paddingRight: 22,
          paddingBottom: 20,

          '&.Mui-active': {
            borderBottom: '1px solid #4C88FF'
          }
        }
      },
      vertical: {
        '& .MuiStepButton-root': {
          paddingLeft: 0,
          paddingRight: 0
        },

        '& .MuiStepLabel-label': {
          position: 'relative',
          paddingLeft: 41,
          paddingRight: 40,
          paddingTop: 16,
          paddingBottom: 16,

          '&.Mui-active': {
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1,
              height: '100%',
              background: '#4C88FF'
            }
          }
        }
      }
    }
  },
  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontSize: 14,

        '&.Mui-error': {
          color: '#F56283'
        }
      },
      vertical: {
        flexDirection: 'row-reverse',
        padding: 0,
        justifyContent: 'space-between',
        width: '100%',
        maxHeight: 48
      },
      iconContainer: {
        paddingRight: 0
      }
    }
  }
})
