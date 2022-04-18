import { Theme } from '@mui/material'

export const menuItem = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          background: 'initial',
          '&:hover': {
            backgroundColor: 'initial'
          }
        },
        '&:hover': {
          background: 'initial'
        }
      }
    }
  }
}
