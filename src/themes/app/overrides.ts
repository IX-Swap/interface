import { Theme } from '@mui/material'
import { rte } from 'themes/app/rte'
import { checkbox } from 'themes/app/overrides/checkbox'
import { radio } from 'themes/app/overrides/radio'
import { switcher } from 'themes/app/overrides/switcher'
import { slider } from 'themes/app/overrides/slider'
import { breadcrumbs } from 'themes/app/overrides/breadcrumbs'
import { avatar } from 'themes/app/overrides/avatar'
import { paper } from 'themes/app/overrides/paper'
import { iconButton } from 'themes/app/overrides/iconButton'
import { buttonGroup } from 'themes/app/overrides/buttonGroup'
import { button } from 'themes/app/overrides/button'
import { svgIcon } from 'themes/app/overrides/sgvIcon'
import { typography } from 'themes/app/overrides/typography'
import { fab } from 'themes/app/overrides/fab'
import { menu } from 'themes/app/overrides/menu'
import { menuItem } from 'themes/app/overrides/menuItem'
import { tooltip } from 'themes/app/overrides/tooltip'
import { chip } from 'themes/app/overrides/chip'
import { skeleton } from 'themes/app/overrides/skeleton'
import { inputBase } from 'themes/app/overrides/inputBase'
import { step } from 'themes/app/overrides/step'
import { stepLabel } from 'themes/app/overrides/stepLabel'
import { ThemeOptions } from '@mui/material/styles'

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
  MuiTooltip: tooltip(theme),
  MuiChip: chip(theme),
  MuiSkeleton: skeleton(theme),
  MuiInputBase: inputBase(theme),
  MuiStep: step(theme),
  MuiStepLabel: stepLabel(theme),
  MuiButtonBase: {}
})
