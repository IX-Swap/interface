import { Theme, PaletteColor } from '@mui/material'
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
import { tooltip } from 'themes/new/overrides/tooltip'
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

declare module '@mui/material/styles' {
  interface Palette {
    'special-red': PaletteColor
    'special-green': PaletteColor
  }
  interface PaletteOptions {
    'special-red': PaletteColor
    'special-green': PaletteColor
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    'special-red': true
    'special-green': true
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
  MuiTooltip: tooltip(theme),
  MuiChip: chip(theme),
  MuiSkeleton: skeleton(theme),
  MuiInputBase: inputBase(theme),
  MuiStep: step(theme),
  MuiStepLabel: stepLabel(theme),
  MuiButtonBase: {}
})
