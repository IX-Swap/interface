import { PaletteColor, Theme } from '@mui/material'
import { ThemeOptions } from '@mui/material/styles'
import { avatar } from 'themes/app/overrides/avatar'
import { breadcrumbs } from 'themes/app/overrides/breadcrumbs'
import { button } from 'themes/app/overrides/button'
import { buttonGroup } from 'themes/app/overrides/buttonGroup'
import { checkbox } from 'themes/app/overrides/checkbox'
import { chip } from 'themes/app/overrides/chip'
import { fab } from 'themes/app/overrides/fab'
import { iconButton } from 'themes/app/overrides/iconButton'
import { input } from 'themes/app/overrides/input'
import { inputBase } from 'themes/app/overrides/inputBase'
import { menu } from 'themes/app/overrides/menu'
import { menuItem } from 'themes/app/overrides/menuItem'
import { paper } from 'themes/app/overrides/paper'
import { radio } from 'themes/app/overrides/radio'
import { svgIcon } from 'themes/app/overrides/sgvIcon'
import { skeleton } from 'themes/app/overrides/skeleton'
import { slider } from 'themes/app/overrides/slider'
import { step } from 'themes/app/overrides/step'
import { stepLabel } from 'themes/app/overrides/stepLabel'
import { switcher } from 'themes/app/overrides/switcher'
import { tooltip } from 'themes/app/overrides/tooltip'
import { typography } from 'themes/app/overrides/typography'
import { rte } from 'themes/app/rte'
import { inputLabel } from './overrides/inputLabel'
import { outlined } from './overrides/outlined'

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
  MuiButtonBase: {},
  MuiTextField: input(theme),
  MuiOutlinedInput: outlined(theme),
  MuiInputLabel: inputLabel(theme)
})
