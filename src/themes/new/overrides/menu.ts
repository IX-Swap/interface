import { Theme } from '@mui/material'

export const menu = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        '.MuiMenu-paper': {
          marginTop: 8,
          padding: 20,
          border: `1px solid ${theme.palette.menu.border}`,
          boxShadow: `0px 80px 80px ${theme.palette.menu.boxShadow}`,
          borderRadius: 8
        }
      }
    }
  }
}
