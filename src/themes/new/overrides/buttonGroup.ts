import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const buttonGroup = (theme: Theme) => {
  return {
    styleOverrides: {
      outlined: {
        button: {
          borderColor: alpha('#4c88ff', 0.3),
          backgroundColor: theme.palette.buttonGroup.bg,

          ':hover': {
            backgroundColor: theme.palette.buttonGroup.bgHover,
            color: theme.palette.buttonGroup.colorHover
          }
        }
      }
    }
  }
}
