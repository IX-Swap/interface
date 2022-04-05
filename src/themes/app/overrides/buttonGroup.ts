import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const buttonGroup = (theme: Theme) => {
  // eslint-disable-next-line
  const buttonGroupPalette = theme.palette.buttonGroup!

  return {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: alpha('#4c88ff', 0.3),
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
