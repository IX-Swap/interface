import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const fab = (theme: Theme) => {
  const fabPalette = theme.palette.fab

  return {
    styleOverrides: {
      root: {
        backgroundColor: fabPalette.bg,
        svg: {
          fill: fabPalette.fill
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
          backgroundColor: fabPalette.bgDisabled,
          svg: {
            fill: fabPalette.fillDisabled
          }
        }
      }
    }
  }
}
