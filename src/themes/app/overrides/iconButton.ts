import { Theme } from '@mui/material'

export const iconButton = (theme: Theme) => {
  const iconButtonPalette = theme.palette.iconButton

  return {
    styleOverrides: {
      root: {
        height: 'auto',
        svg: { fill: iconButtonPalette.fill, minWidth: 14, minHeight: 14 },
        ':hover': {
          backgroundColor: iconButtonPalette.bgHover,
          svg: { fill: '#4C88FF' }
        },
        ':disabled': {
          svg: {
            fill: iconButtonPalette.fillDisabled
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
