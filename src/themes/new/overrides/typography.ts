import { Theme } from '@mui/material'

export const typography = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary
      }
    }
  }
}
