import { Theme } from '@mui/material'

export const fab = (theme: Theme) => {
  return {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        svg: {
          fill: '#778194'
        },
        ':hover': {
          backgroundColor: '#78A5FF',
          svg: {
            fill: '#FFFFFF'
          },
          boxShadow: 'none'
        },
        ':disabled': {
          backgroundColor: '#EDF2FA',
          svg: {
            fill: '#DBE2EC'
          }
        }
      }
    }
  }
}
