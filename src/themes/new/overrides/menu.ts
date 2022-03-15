import { Theme } from '@mui/material'

export const menu = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        '.MuiMenu-paper': {
          marginTop: 8,
          padding: 20,
          border: '1px solid #DBE2EC',
          boxShadow: '0px 80px 80px rgba(162, 172, 191, 0.16)',
          borderRadius: 8
        }
      }
    }
  }
}
