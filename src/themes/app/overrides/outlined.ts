import { Theme } from '@mui/material'

export const outlined = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        '&.Mui-focused': {
          backgroundColor: theme.palette.background.paper
        }
      }
    }
  }
}
