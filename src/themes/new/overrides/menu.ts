import { Theme } from '@mui/material'

export const menu = (theme: Theme) => {
  // eslint-disable-next-line
  const menuPalette = theme.palette.menu!

  return {
    styleOverrides: {
      root: {
        '.MuiMenu-paper': {
          marginTop: 8,
          padding: 20,
          border: `1px solid ${menuPalette.border}`,
          boxShadow: `0px 80px 80px ${menuPalette.boxShadow}`,
          borderRadius: 8
        }
      }
    }
  }
}
