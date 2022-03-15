import { Theme } from '@mui/material'

export const iconButton = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        height: 'auto',
        svg: { fill: '#778194', width: 14, height: 14 },
        ':hover': {
          backgroundColor: '#EDF2FA',
          svg: { fill: '#4C88FF' }
        },
        ':disabled': {
          svg: {
            fill: '#DBE2EC'
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
