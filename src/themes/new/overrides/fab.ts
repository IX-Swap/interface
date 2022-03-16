import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const fab = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.fab.bg,
        svg: {
          fill: theme.palette.fab.fill
        },
        boxShadow: `0px 2px 10px ${alpha('#3b4251', 0.15)}`,
        ':hover': {
          backgroundColor: '#78A5FF',
          svg: {
            fill: '#FFFFFF'
          },
          boxShadow: 'none'
        },
        ':disabled': {
          backgroundColor: theme.palette.fab.bgDisabled,
          svg: {
            fill: theme.palette.fab.fillDisabled
          }
        }
      }
    }
  }
}
