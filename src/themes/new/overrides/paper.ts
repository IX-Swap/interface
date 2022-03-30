import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const paper = (theme: Theme) => {
  return {
    defaultProps: {
      elevation: 0
    },
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: 'none',
        border: `1px solid transparent`
      },
      outlined: {
        boxShadow: `0px 80px 80px ${alpha('#a2acbf', 0.16)}`,
        border: `1px solid ${
          theme.palette.mode === 'light' ? '#EDF2FA' : 'transparent'
        }`
      }
    }
  }
}
