import { Theme } from '@mui/material'

export const inputLabel = (theme: Theme) => {
  return {
    defaultProps: {
      shrink: true
    },
    styleOverrides: {
      root: {
        '&.Miu-disabled': {
          color: 'rgb(119, 129, 148)',
          opacity: 0.7
        }
      }
    }
  }
}
