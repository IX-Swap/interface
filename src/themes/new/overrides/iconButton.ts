import { Theme } from '@mui/material'

export const iconButton = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        height: 'auto',
        svg: { fill: theme.palette.iconButton.fill, width: 14, height: 14 },
        ':hover': {
          backgroundColor: theme.palette.iconButton.bgHover,
          svg: { fill: '#4C88FF' }
        },
        ':disabled': {
          svg: {
            fill: theme.palette.iconButton.fillDisabled
          }
        },
        '&.MuiIconButton-sizeLarge': {
          svg: {
            width: 18,
            height: 18
          }
        },
        '&.MuiIconButton-sizeSmall': {
          svg: {
            width: 12,
            height: 12
          }
        }
      }
    }
  }
}
