import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const buttonGroup = (theme: Theme) => {
  const buttonGroupPalette = theme.palette.buttonGroup

  return {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          backgroundColor: buttonGroupPalette.bg,

          ':hover': {
            backgroundColor: buttonGroupPalette.bgHover,
            color: buttonGroupPalette.colorHover
          }
        }
      }
    }
  }
}